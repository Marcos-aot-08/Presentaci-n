let isFollowing = false;

function followPage() {
    const btn = document.querySelector('.btn-follow');
    const notification = document.getElementById('notification');

    if (!isFollowing) {
        // SEGUIR LA PÁGINA
        isFollowing = true;
        btn.textContent = '✓ SIGUIENDO';
        btn.style.background = '#48bb78';

        // Guardar que el usuario siguió la página y activar el descuento
        localStorage.setItem('lifeInvaderDiscount', 'true');
        localStorage.setItem('discountActivatedTime', Date.now());

        navigator.clipboard.writeText('LIFE10').catch(() => {
            console.log('LIFE10');
        });

        notification.textContent = '✓ ¡Ahora sigues a Legendary Motorsport! Código LIFE10 copiado';
        notification.style.background = 'linear-gradient(135deg, #48bb78, #38a169)';
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    } else {
        // DEJAR DE SEGUIR LA PÁGINA
        // Mostrar confirmación antes de dejar de seguir
        if (confirm('¿Estás seguro de que quieres dejar de seguir a Legendary Motorsport?\n\nPerderás tu descuento del 10% en todos los vehículos.')) {
            isFollowing = false;
            btn.textContent = 'SEGUIR AHORA';
            btn.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';

            // Eliminar el descuento del localStorage
            localStorage.removeItem('lifeInvaderDiscount');
            localStorage.removeItem('discountActivatedTime');

            notification.textContent = '✗ Has dejado de seguir a Legendary Motorsport. Descuento desactivado.';
            notification.style.background = 'linear-gradient(135deg, #f56565, #c53030)';
            notification.classList.add('show');
            setTimeout(() => {
                notification.classList.remove('show');
            }, 3000);
        }
    }
}

// Verificar si ya está siguiendo al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    const hasDiscount = localStorage.getItem('lifeInvaderDiscount');
    const btn = document.querySelector('.btn-follow');
    
    if (hasDiscount === 'true') {
        isFollowing = true;
        btn.textContent = '✓ SIGUIENDO';
        btn.style.background = '#48bb78';
    }
});