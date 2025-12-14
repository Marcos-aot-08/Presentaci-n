// Inicializar el saldo bancario
let bankBalance = 10000000;

// Función para formatear números con comas y símbolo de dólar
function formatMoney(amount) {
    return '$' + amount.toLocaleString('en-US');
}

// Actualizar el display del balance bancario
function updateBankDisplay() {
    const bankAmountElement = document.getElementById('bankAmount');
    if (bankAmountElement) {
        bankAmountElement.textContent = formatMoney(bankBalance);
        
        // Animación de actualización
        bankAmountElement.style.transition = 'transform 0.2s';
        bankAmountElement.style.transform = 'scale(1.1)';
        setTimeout(() => {
            bankAmountElement.style.transform = 'scale(1)';
        }, 200);
    }
}

// Función para manejar la compra de vehículos
function buyVehicle(button) {
    const price = parseInt(button.getAttribute('data-price'));
    const vehicleName = button.closest('.vehicle-card').querySelector('h3').textContent;
    
    // Verificar si hay suficiente dinero
    if (bankBalance >= price) {
        // Restar el precio del balance
        bankBalance -= price;
        
        // Actualizar el display
        updateBankDisplay();
        
        // Cambiar el botón a "COMPRADO"
        button.textContent = 'COMPRADO';
        button.style.background = '#00ff00';
        button.style.color = '#000';
        button.disabled = true;
        
        // Mostrar mensaje de éxito
        alert(`¡Felicidades! Has comprado el ${vehicleName} por ${formatMoney(price)}\n\nSaldo restante: ${formatMoney(bankBalance)}`);
    } else {
        // Mostrar mensaje de fondos insuficientes
        const deficit = price - bankBalance;
        alert(`Fondos insuficientes.\n\nNecesitas ${formatMoney(deficit)} más para comprar este vehículo.\n\nSaldo actual: ${formatMoney(bankBalance)}\nPrecio del vehículo: ${formatMoney(price)}`);
    }
}

// Agregar event listeners a todos los botones de compra cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar el display del balance
    updateBankDisplay();
    
    // Obtener todos los botones de compra
    const buyButtons = document.querySelectorAll('.buy-btn');
    
    // Agregar event listener a cada botón
    buyButtons.forEach(button => {
        button.addEventListener('click', function() {
            buyVehicle(this);
        });
    });
    
    console.log('Sistema de compra inicializado. Saldo: ' + formatMoney(bankBalance));
});