
let bankBalance = 10000000;


function formatMoney(amount) {
    return '$' + amount.toLocaleString('en-US');
}


function updateBankDisplay() {
    const bankAmountElement = document.getElementById('bankAmount');
    if (bankAmountElement) {
        bankAmountElement.textContent = formatMoney(bankBalance);
        

        bankAmountElement.style.transition = 'transform 0.2s';
        bankAmountElement.style.transform = 'scale(1.1)';
        setTimeout(() => {
            bankAmountElement.style.transform = 'scale(1)';
        }, 200);
    }
}


function buyVehicle(button) {
    const price = parseInt(button.getAttribute('data-price'));
    const vehicleName = button.closest('.vehicle-card').querySelector('h3').textContent;
    

    if (bankBalance >= price) {

        bankBalance -= price;
        

        updateBankDisplay();
        

        button.textContent = 'COMPRADO';
        button.style.background = '#00ff00';
        button.style.color = '#000';
        button.disabled = true;
        

        alert(`¡Felicidades! Has comprado el ${vehicleName} por ${formatMoney(price)}\n\nSaldo restante: ${formatMoney(bankBalance)}`);
    } else {

        const deficit = price - bankBalance;
        alert(`Fondos insuficientes.\n\nNecesitas ${formatMoney(deficit)} más para comprar este vehículo.\n\nSaldo actual: ${formatMoney(bankBalance)}\nPrecio del vehículo: ${formatMoney(price)}`);
    }
}

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
    
    if (filterType === '2 PUERTAS' || filterType === '4 PUERTAS') {
        if (promoBanner) {
            promoBanner.style.display = 'none';
        }
    } else {
        if (promoBanner) {
            promoBanner.style.display = 'block';
        }
    }
    
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

function setActiveFilterButton(clickedButton) {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.classList.remove('active');
    });
    clickedButton.classList.add('active');
}

document.addEventListener('DOMContentLoaded', function() {

    updateBankDisplay();
    

    const buyButtons = document.querySelectorAll('.buy-btn');

    buyButtons.forEach(button => {
        button.addEventListener('click', function() {
            buyVehicle(this);
        });
    });
    
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