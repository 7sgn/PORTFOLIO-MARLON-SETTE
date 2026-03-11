/* ============================================
   CURRÍCULO DIGITAL - JavaScript
   Interações: scroll, tema, PDF, animações
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ========== ELEMENTOS ==========
    const navbar = document.getElementById('navbar');
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.querySelectorAll('.nav-link');
    const btnTheme = document.getElementById('btn-theme');
    const btnPdf = document.getElementById('btn-pdf');
    const btnTop = document.getElementById('btn-top');
    const sections = document.querySelectorAll('.section');
    const typedText = document.getElementById('typed-text');

    // ========== TEMA ESCURO / CLARO ==========
    const initTheme = () => {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
    };

    const updateThemeIcon = (theme) => {
        const icon = btnTheme.querySelector('i');
        if (theme === 'dark') {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    };

    const toggleTheme = () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        updateThemeIcon(next);
    };

    btnTheme.addEventListener('click', toggleTheme);
    initTheme();

    // ========== NAVBAR SCROLL ==========
    const handleNavbarScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    // ========== BOTÃO VOLTAR AO TOPO ==========
    const handleBtnTop = () => {
        if (window.scrollY > 500) {
            btnTop.classList.add('visible');
        } else {
            btnTop.classList.remove('visible');
        }
    };

    btnTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ========== NAVBAR ATIVA POR SEÇÃO ==========
    const handleActiveNav = () => {
        const scrollPos = window.scrollY + 150;

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach((link) => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    // ========== MENU MOBILE ==========
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    navLinks.forEach((link) => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // ========== ANIMAÇÕES ON SCROLL ==========
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate-on-scroll');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });
        elements.forEach((el) => observer.observe(el));
    };
    animateOnScroll();

    // ========== BARRAS DE PROGRESSO ==========
    const animateSkillBars = () => {
        const skillBars = document.querySelectorAll('.skill-progress');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const width = entry.target.getAttribute('data-width');
                    entry.target.style.width = `${width}%`;
                }
            });
        }, { threshold: 0.3 });
        skillBars.forEach((bar) => observer.observe(bar));
    };
    animateSkillBars();

    // ========== EFEITO TYPED ==========
    const initTypedEffect = () => {
        const titles = ['Desenvolvedor Web', 'Analista de Sistemas', 'Freelancer Full Stack', 'Especialista em TI'];
        let i = 0, j = 0, isDeleting = false;
        const type = () => {
            const current = titles[i];
            typedText.textContent = isDeleting ? current.substring(0, j--) : current.substring(0, j++);
            if (!isDeleting && j === current.length + 1) { isDeleting = true; setTimeout(type, 2000); return; }
            if (isDeleting && j === 0) { isDeleting = false; i = (i + 1) % titles.length; }
            setTimeout(type, isDeleting ? 50 : 100);
        };
        if (typedText) type();
    };
    initTypedEffect();

    // ========== PARTÍCULAS GLOBAIS ==========
    const createParticles = () => {
        const container = document.getElementById('particles');
        if (!container) return;
        container.innerHTML = '';
        for (let i = 0; i < 150; i++) { // Intensidade aumentada
            const p = document.createElement('div');
            p.className = 'particle';
            const size = Math.random() * 5 + 2;
            p.style.width = p.style.height = `${size}px`;
            p.style.left = `${Math.random() * 100}%`;
            p.style.top = `${Math.random() * 100}%`;
            p.style.animationDuration = `${Math.random() * 15 + 10}s`;
            p.style.animationDelay = `${Math.random() * 5}s`;
            container.appendChild(p);
        }
    };
    createParticles();

    const handleParticlesScroll = () => {
        const container = document.getElementById('particles');
        if (!container) return;
        const scroll = window.scrollY;
        const height = window.innerHeight;
        // Intensidade maior no topo, suaviza mas mantém presença
        let opacity = 1 - (scroll / (height * 1.5));
        container.style.opacity = Math.max(0.3, opacity);
    };

    // ========== DOWNLOAD PDF ==========
    btnPdf.addEventListener('click', () => {
        const element = document.getElementById('cv-content');
        const opt = { margin: 5, filename: 'Marlon_Sette_CV.pdf', image: { type: 'jpeg', quality: 0.98 }, html2canvas: { scale: 2 }, jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' } };
        html2pdf().set(opt).from(element).save();
    });

    window.addEventListener('scroll', () => {
        handleNavbarScroll();
        handleBtnTop();
        handleActiveNav();
        handleParticlesScroll();
    }, { passive: true });
});
