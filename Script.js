let bankBalance = 10000000;

// Función para formatear el dinero
function formatMoney(amount) {
    return '$' + amount.toLocaleString('en-US');
}

// Función para actualizar el display del banco
function updateBankDisplay() {
    const bankAmountElement = document.getElementById('bankAmount');
    if (bankAmountElement) {
        bankAmountElement.textContent = formatMoney(bankBalance);
        
        // Efecto de animación al actualizar
        bankAmountElement.style.transition = 'transform 0.2s';
        bankAmountElement.style.transform = 'scale(1.1)';
        setTimeout(() => {
            bankAmountElement.style.transform = 'scale(1)';
        }, 200);
    }
}

// Función para verificar y mostrar el banner de descuento
function checkDiscountStatus() {
    const hasDiscount = localStorage.getItem('lifeInvaderDiscount');
    const promoBanner = document.querySelector('.promo-banner');
    
    if (hasDiscount === 'true' && promoBanner) {
        // Cambiar el banner para mostrar que el descuento está activo
        const promoContent = promoBanner.querySelector('.promo-content');
        promoContent.innerHTML = `
            <h2>✓ DESCUENTO ACTIVADO</h2>
            <p>¡Felicidades! Tienes un 10% de descuento en todos tus vehículos</p>
            <div style="background: #48bb78; color: white; padding: 10px 20px; border-radius: 5px; display: inline-block; margin-top: 10px; font-weight: bold;">
                CÓDIGO: LIFE10 ACTIVO
            </div>
            <br>
            <a href="index2.html" class="promo-btn" style="margin-top: 15px; display: inline-block;">GESTIONAR SUSCRIPCIÓN</a>
        `;
        promoBanner.style.background = 'linear-gradient(135deg, #48bb78, #38a169)';
    }
}

// Función para calcular el precio con descuento
function calculateFinalPrice(originalPrice) {
    const hasDiscount = localStorage.getItem('lifeInvaderDiscount');
    
    if (hasDiscount === 'true') {
        // Aplicar 10% de descuento
        return Math.floor(originalPrice * 0.9);
    }
    
    return originalPrice;
}

// Función para mostrar el modal de selección de color
function showColorModal(vehicleName, originalPrice, button) {
    const finalPrice = calculateFinalPrice(originalPrice);
    const hasDiscount = localStorage.getItem('lifeInvaderDiscount') === 'true';
    const discountAmount = originalPrice - finalPrice;
    
    const colors = {
        'azul': '#0066ff',
        'verde': '#00cc44',
        'amarillo': '#ffcc00',
        'rojo': '#ff0000',
        'blanco': '#ffffff',
        'negro': '#000000'
    };
    
    // Crear el modal
    const modal = document.createElement('div');
    modal.className = 'color-modal';
    modal.innerHTML = `
        <div class="color-modal-content">
            <h3>SELECCIONA EL COLOR</h3>
            <p class="modal-vehicle-name">${vehicleName}</p>
            ${hasDiscount ? `
                <p style="color: #48bb78; font-weight: bold; margin: 10px 0;">
                    ✓ DESCUENTO LIFEINVADER APLICADO (-10%)
                </p>
                <p style="text-decoration: line-through; color: #666;">${formatMoney(originalPrice)}</p>
                <p class="modal-price" style="color: #48bb78; font-size: 1.3em;">${formatMoney(finalPrice)}</p>
                <p style="color: #48bb78; font-size: 0.9em;">Ahorras: ${formatMoney(discountAmount)}</p>
            ` : `
                <p class="modal-price">${formatMoney(finalPrice)}</p>
            `}
            <div class="color-options">
                ${Object.entries(colors).map(([name, hex]) => `
                    <div class="color-option" data-color="${name}" style="background-color: ${hex}; ${name === 'blanco' ? 'border: 2px solid #333;' : ''}">
                        <span class="color-name">${name.toUpperCase()}</span>
                    </div>
                `).join('')}
            </div>
            <div class="modal-buttons">
                <button class="modal-cancel">CANCELAR</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Mostrar el modal con animación
    setTimeout(() => modal.classList.add('show'), 10);
    
    // Agregar eventos a las opciones de color
    const colorOptions = modal.querySelectorAll('.color-option');
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            const selectedColor = this.getAttribute('data-color');
            confirmPurchase(vehicleName, originalPrice, finalPrice, selectedColor, button);
            closeModal(modal);
        });
    });
    
    // Evento para el botón cancelar
    modal.querySelector('.modal-cancel').addEventListener('click', () => closeModal(modal));
    
    // Cerrar modal al hacer clic fuera de él
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal(modal);
        }
    });
}

// Función para cerrar el modal
function closeModal(modal) {
    modal.classList.remove('show');
    setTimeout(() => modal.remove(), 300);
}

// Función para confirmar la compra
function confirmPurchase(vehicleName, originalPrice, finalPrice, color, button) {
    const hasDiscount = localStorage.getItem('lifeInvaderDiscount') === 'true';
    const savings = originalPrice - finalPrice;
    
    // Restar el dinero (precio con descuento)
    bankBalance -= finalPrice;
    
    // Actualizar el display del banco
    updateBankDisplay();
    
    // Cambiar el botón a estado "comprado"
    button.textContent = 'COMPRADO';
    button.style.background = '#00ff00';
    button.style.color = '#000';
    button.disabled = true;
    
    // Mostrar mensaje de confirmación
    let message = `¡Felicidades! Has comprado el ${vehicleName} en color ${color.toUpperCase()}`;
    
    if (hasDiscount) {
        message += `\n\nPrecio original: ${formatMoney(originalPrice)}`;
        message += `\nDescuento LifeInvader: -${formatMoney(savings)}`;
        message += `\nPrecio final: ${formatMoney(finalPrice)}`;
        message += `\n\n¡Ahorraste ${formatMoney(savings)}!`;
    } else {
        message += `\nPrecio: ${formatMoney(finalPrice)}`;
    }
    
    message += `\n\nSaldo restante: ${formatMoney(bankBalance)}`;
    
    alert(message);
}

// Función principal de compra
function buyVehicle(button) {
    const originalPrice = parseInt(button.getAttribute('data-price'));
    const finalPrice = calculateFinalPrice(originalPrice);
    const vehicleName = button.closest('.vehicle-card').querySelector('h3').textContent;
    
    // Verificar si hay fondos suficientes (con el precio con descuento)
    if (bankBalance >= finalPrice) {
        // Mostrar modal de selección de color
        showColorModal(vehicleName, originalPrice, button);
    } else {
        // Mostrar mensaje de fondos insuficientes
        const deficit = finalPrice - bankBalance;
        const hasDiscount = localStorage.getItem('lifeInvaderDiscount') === 'true';
        
        let message = `Fondos insuficientes.\n\nNecesitas ${formatMoney(deficit)} más para comprar este vehículo.`;
        message += `\n\nSaldo actual: ${formatMoney(bankBalance)}`;
        
        if (hasDiscount) {
            message += `\nPrecio original: ${formatMoney(originalPrice)}`;
            message += `\nPrecio con descuento: ${formatMoney(finalPrice)}`;
        } else {
            message += `\nPrecio del vehículo: ${formatMoney(finalPrice)}`;
        }
        
        alert(message);
    }
}

// Función para filtrar vehículos
function filterVehicles(filterType) {
    const vehicleCards = document.querySelectorAll('.vehicle-card');
    const promoBanner = document.querySelector('.promo-banner');
    const supercarsSection = document.getElementById('supercars');
    const classicsSection = document.getElementById('classics');
    
    vehicleCards.forEach(card => {
        const capacityText = card.querySelector('.vehicle-stats span').textContent;
        const capacity = capacityText.match(/\d+/)[0];
        
        if (filterType === 'TODOS') {
            card.style.display = 'block';
        } else if (filterType === '2 PUERTAS' && capacity === '2') {
            card.style.display = 'block';
        } else if (filterType === '4 PUERTAS' && capacity === '4') {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
    
    // Ocultar/mostrar el banner promocional según el filtro
    if (filterType === '2 PUERTAS' || filterType === '4 PUERTAS') {
        if (promoBanner) {
            promoBanner.style.display = 'none';
        }
    } else {
        if (promoBanner) {
            promoBanner.style.display = 'block';
        }
    }
    
    // Ocultar secciones completas si es necesario
    if (filterType === '4 PUERTAS') {
        if (supercarsSection) {
            supercarsSection.style.display = 'none';
        }
        if (classicsSection) {
            classicsSection.style.display = 'none';
        }
    } else {
        if (supercarsSection) {
            supercarsSection.style.display = 'block';
        }
        if (classicsSection) {
            classicsSection.style.display = 'block';
        }
    }
}

// Función para establecer el botón de filtro activo
function setActiveFilterButton(clickedButton) {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.classList.remove('active');
    });
    clickedButton.classList.add('active');
}

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function() {
    // Actualizar el display del banco al cargar
    updateBankDisplay();
    
    // Verificar el estado del descuento
    checkDiscountStatus();
    
    // Agregar eventos a los botones de compra
    const buyButtons = document.querySelectorAll('.buy-btn');
    buyButtons.forEach(button => {
        button.addEventListener('click', function() {
            buyVehicle(this);
        });
    });
    
    // Agregar eventos a los botones de filtro
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterType = this.textContent.trim();
            filterVehicles(filterType);
            setActiveFilterButton(this);
        });
    });
    
    const hasDiscount = localStorage.getItem('lifeInvaderDiscount') === 'true';
    console.log('Sistema de compra y filtros inicializado. Saldo: ' + formatMoney(bankBalance));
    if (hasDiscount) {
        console.log('Descuento LifeInvader ACTIVO: 10% en todos los vehículos');
    }
});