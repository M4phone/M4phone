document.addEventListener('DOMContentLoaded', () => {
    // 스무스 스크롤 처리: 내부 링크 클릭 시 부드럽게 이동
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            // 외부 링크(https://)와 단일 # 링크는 무시
            if (targetId && targetId.startsWith('#') && targetId.length > 1) {
                e.preventDefault();
                const targetEl = document.querySelector(targetId);
                if (targetEl) {
                    targetEl.scrollIntoView({ behavior: 'smooth' });
                }
                // 모바일: 메뉴 닫기
                if(window.innerWidth <= 900) {
                    document.querySelector('.nav-links').classList.remove('open');
                }
            }
        });
    });

    // 햄버거 메뉴 토글
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (hamburger) {
        hamburger.addEventListener('click', function () {
            navLinks.classList.toggle('open');
        });
    }

    // 네비게이션 링크 활성화 관찰자
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5,
    };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const id = entry.target.getAttribute('id');
            const navLink = document.querySelector(`.nav-links a[href='#${id}']`);
            if (!navLink) return;
            if (entry.isIntersecting) {
                navItems.forEach(link => link.classList.remove('active'));
                navLink.classList.add('active');
            }
        });
    }, observerOptions);
    sections.forEach(section => observer.observe(section));

    // 브라우저 리사이즈시 메뉴 자동 닫기(PC 전환시)
    window.addEventListener('resize', () => {
        if(window.innerWidth > 900) {
            navLinks.classList.remove('open');
        }
    });
});