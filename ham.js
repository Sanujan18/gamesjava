function toggleMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('show');
}

if('service worker' in navigator)
    {
        navigator.serviceWorker.register('/service-worker.js')
        .then(()=>
        console.log("service-worker registered"));
    }