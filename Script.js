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

// Función para mostrar el modal de selección de color
function showColorModal(vehicleName, price, button) {
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
            <p class="modal-price">${formatMoney(price)}</p>
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
            confirmPurchase(vehicleName, price, selectedColor, button);
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
function confirmPurchase(vehicleName, price, color, button) {
    // Restar el dinero
    bankBalance -= price;
    
    // Actualizar el display del banco
    updateBankDisplay();
    
    // Cambiar el botón a estado "comprado"
    button.textContent = 'COMPRADO';
    button.style.background = '#00ff00';
    button.style.color = '#000';
    button.disabled = true;
    
    // Mostrar mensaje de confirmación
    alert(`¡Felicidades! Has comprado el ${vehicleName} en color ${color.toUpperCase()} por ${formatMoney(price)}\n\nSaldo restante: ${formatMoney(bankBalance)}`);
}

// Función principal de compra
function buyVehicle(button) {
    const price = parseInt(button.getAttribute('data-price'));
    const vehicleName = button.closest('.vehicle-card').querySelector('h3').textContent;
    
    // Verificar si hay fondos suficientes
    if (bankBalance >= price) {
        // Mostrar modal de selección de color
        showColorModal(vehicleName, price, button);
    } else {
        // Mostrar mensaje de fondos insuficientes
        const deficit = price - bankBalance;
        alert(`Fondos insuficientes.\n\nNecesitas ${formatMoney(deficit)} más para comprar este vehículo.\n\nSaldo actual: ${formatMoney(bankBalance)}\nPrecio del vehículo: ${formatMoney(price)}`);
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
    
    console.log('Sistema de compra y filtros inicializado. Saldo: ' + formatMoney(bankBalance));
});