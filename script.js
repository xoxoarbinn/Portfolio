const hiddenElements = document.querySelectorAll('.hidden');

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, {
    threshold: 0.15 
});

hiddenElements.forEach(function(el) {
    observer.observe(el);
});



const line1 = document.getElementById('line1');
const line2 = document.getElementById('line2');
const intro = document.getElementById('intro');
const hero = document.getElementById('main-portfolio-page');
const nav = document.querySelector('.nav');
const heroHeading = document.getElementById('hero-heading');
const heroSub = document.getElementById('hero-sub');
const photo = document.querySelector('img');
const skillsSection = document.getElementById('skills');
const skillsHeading = document.getElementById('skills-heading');
const skillCards = document.querySelectorAll('.skill-box');

const text1 = "Hello world!";
const text2 = "Welcome to my Portfolio!!";
const headingText = "Hi! I'm Arbinn.";
const subText = "A 10th-grade developer specializing in C/C++ and front-end engineering. I build high-performance logic with a focus on clean, responsive design.";
const skillsText = "My Toolkits!";

let i = 0, j = 0, h = 0, s = 0, sk = 0;
let cardIndex = 0;

function startTyping() {
    nav.classList.add('nav-disabled');
    document.body.classList.add('no-scroll');
    typeLine1();
}

function typeLine1() {
    line1.classList.add('typing');
    if (i < text1.length) {
        line1.textContent += text1.charAt(i);
        i++;
        setTimeout(typeLine1, 100);
    } else {
        line1.classList.remove('typing');
        setTimeout(typeLine2, 300);
    }
}

function typeLine2() {
    line2.classList.remove('hidden-line');
    line2.classList.add('show');
    line2.classList.add('typing');
    if (j < text2.length) {
        line2.textContent += text2.charAt(j);
        j++;
        setTimeout(typeLine2, 80);
    } else {
        line2.classList.remove('typing');
        setTimeout(revealHero, 800);
    }
}

function revealHero() {
    intro.style.opacity = '0';
    intro.style.filter = 'blur(5px)';

    setTimeout(() => {
        intro.style.display = 'none';
        hero.classList.remove('hero-hidden');
        hero.classList.add('hero-visible');

        setTimeout(() => {
            photo.classList.remove('photo-hidden');
            photo.classList.add('photo-visible');
            typeHeading();
        }, 300);

    }, 800);
}

function typeHeading() {
    heroHeading.classList.add('typing');
    if (h < headingText.length) {
        heroHeading.textContent += headingText.charAt(h);
        h++;
        setTimeout(typeHeading, 100);
    } else {
        heroHeading.classList.remove('typing');
        typeSub();
    }
}

function typeSub() {
    heroSub.classList.add('typing');
    if (s < subText.length) {
        heroSub.textContent += subText.charAt(s);
        s++;
        setTimeout(typeSub, 40);
    } else {
        heroSub.classList.remove('typing');

        setTimeout(() => {
            document.body.classList.remove('no-scroll');
            steadyGlideTo(skillsSection, 1500);
        }, 900);
    }
}

function steadyGlideTo(target, duration) {
    document.documentElement.style.scrollBehavior = 'auto';

    const start = window.pageYOffset;
    const targetPosition = target.getBoundingClientRect().top + start;
    const distance = targetPosition - start;
    const startTime = performance.now();

    function glide(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        window.scrollTo(0, start + distance * progress);

        if (progress < 1) {
            requestAnimationFrame(glide);
        } else {
            document.documentElement.style.scrollBehavior = 'smooth';
            setTimeout(typeSkillsHeading, 400);
        }
    }

    requestAnimationFrame(glide);
}

function typeSkillsHeading() {
    skillsHeading.classList.add('typing');

    if (sk < skillsText.length) {
        skillsHeading.textContent += skillsText.charAt(sk);
        sk++;
        setTimeout(typeSkillsHeading, 80);
    } else {
        skillsHeading.classList.remove('typing');
        
        // Show cards first
        showCardsOneByOne();
        
        // After cards start appearing, scroll to show the full skills section
        // Use the LAST card as the scroll target
        const lastCard = skillCards[skillCards.length - 1];
        
        setTimeout(() => {
            // Scroll so the last card is fully visible with some padding
            const lastCardBottom = lastCard.getBoundingClientRect().bottom + window.pageYOffset;
            const viewportHeight = window.innerHeight;
            const scrollTarget = lastCardBottom - viewportHeight + 150;
            
            // Only scroll if the last card is below viewport
            if (scrollTarget > window.pageYOffset) {
                smoothScrollToPosition(scrollTarget, 1200);
            }
        }, 1500); // wait for cards to appear
    }
}

function showCardsOneByOne() {
    if (cardIndex >= skillCards.length) {
        nav.classList.remove('nav-disabled');
        return;
    }
    
    const card = skillCards[cardIndex];
    card.classList.remove('hidden-card');
    card.classList.add('show-card');
    cardIndex++;
    
    setTimeout(showCardsOneByOne, 250);
}

// Scroll down by a fixed amount from current position
function scrollDownBy(amount, duration) {
    const start = window.pageYOffset;
    const target = start + amount;
    const startTime = performance.now();

    function glide(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        
        window.scrollTo(0, start + (amount * ease));
        
        if (progress < 1) {
            requestAnimationFrame(glide);
        }
    }

    requestAnimationFrame(glide);
}

window.addEventListener('DOMContentLoaded', startTyping);

const textElements = [
    document.getElementById('hero-heading'),
    document.getElementById('hero-sub'),
    document.getElementById('skills-heading')
];

textElements.forEach(el => {
    if (!el) return;
    // Split text by spaces and wrap each word in a span
    const words = el.innerText.split(' ');
    el.innerHTML = words.map(word => `<span>${word}</span>`).join(' ');
});
