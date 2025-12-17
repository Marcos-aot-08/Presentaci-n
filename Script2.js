let isFollowing = false;

function followPage() {
    const btn = document.querySelector('.btn-follow');
    const notification = document.getElementById('notification');

    if (!isFollowing) {
        isFollowing = true;
        btn.textContent = '✓ SIGUIENDO';
        btn.style.background = '#48bb78';

        // Guardar que el usuario siguió la página y activar el descuento
        localStorage.setItem('lifeInvaderDiscount', 'true');
        localStorage.setItem('discountActivatedTime', Date.now());

        navigator.clipboard.writeText('LIFE10').catch(() => {
            console.log('LIFE10');
        });

        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    } else {
        isFollowing = false;
        btn.textContent = 'SEGUIR AHORA';
        btn.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
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