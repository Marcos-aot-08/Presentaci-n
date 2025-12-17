let isFollowing = false;

function followPage() {
    const btn = document.querySelector('.btn-follow');
    const notification = document.getElementById('notification');

    if (!isFollowing) {
        isFollowing = true;
        btn.textContent = '✓ SIGUIENDO';
        btn.style.background = '#48bb78';

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
