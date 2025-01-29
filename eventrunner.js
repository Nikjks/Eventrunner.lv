// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Mobilās izvēlnes funkcija
const menu = document.querySelector('.menu');
document.querySelector('.menu-toggle').addEventListener('click', () => {
    menu.classList.toggle('open');
});
