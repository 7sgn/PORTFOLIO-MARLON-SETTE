document.addEventListener('DOMContentLoaded', () => {

    const navbar = document.getElementById('navbar');
    const btnTheme = document.getElementById('btn-theme');
    const btnPdf = document.getElementById('btn-pdf');
    const btnTop = document.getElementById('btn-top');
    const typedText = document.getElementById('typed-text');

    // Tema
    const initTheme = () => {
        const theme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', theme);
        if (btnTheme) btnTheme.querySelector('i').className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    };
    if (btnTheme) {
        btnTheme.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);
            btnTheme.querySelector('i').className = next === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        });
    }
    initTheme();

    // Scroll handlers
    window.addEventListener('scroll', () => {
        const scroll = window.scrollY;
        if (navbar) navbar.classList.toggle('scrolled', scroll > 50);
        if (btnTop) btnTop.classList.toggle('visible', scroll > 500);

        const particles = document.getElementById('particles');
        if (particles) {
            const opacity = 1 - (scroll / (window.innerHeight * 1.5));
            particles.style.opacity = Math.max(0.2, opacity);
        }
    }, { passive: true });

    // Typed effect
    const initTyped = () => {
        if (!typedText) return;
        const words = ['Desenvolvedor Full Stack', 'Especialista em Automação', 'Analista de Sistemas'];
        let wordIdx = 0, charIdx = 0, isDeleting = false;
        const type = () => {
            const currentWord = words[wordIdx];
            typedText.textContent = isDeleting ? currentWord.substring(0, charIdx--) : currentWord.substring(0, charIdx++);
            let speed = isDeleting ? 50 : 100;
            if (!isDeleting && charIdx === currentWord.length + 1) { isDeleting = true; speed = 2000; }
            else if (isDeleting && charIdx === 0) { isDeleting = false; wordIdx = (wordIdx + 1) % words.length; speed = 500; }
            setTimeout(type, speed);
        };
        type();
    };
    initTyped();

    // Particles
    const initParticles = () => {
        const container = document.getElementById('particles');
        if (!container) return;
        container.innerHTML = '';
        for (let i = 0; i < 150; i++) {
            const p = document.createElement('div');
            p.className = 'particle';
            const size = Math.random() * 5 + 2;
            p.style.width = p.style.height = `${size}px`;
            p.style.left = `${Math.random() * 100}%`;
            p.style.top = `${Math.random() * 100}%`;
            p.style.animationDuration = `${Math.random() * 15 + 10}s`;
            p.style.animationDelay = `${Math.random() * 8}s`;
            container.appendChild(p);
        }
    };
    initParticles();

    // Observer
    const observer = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.animate-on-scroll, .section, .glass-card').forEach(s => observer.observe(s));

    // PDF
    if (btnPdf) {
        btnPdf.addEventListener('click', () => {
            const element = document.getElementById('cv-content');
            html2pdf().set({ margin: 8, filename: 'Marlon_Sette_CV.pdf', html2canvas: { scale: 2 }, jsPDF: { format: 'a4' } }).from(element).save();
        });
    }
});
