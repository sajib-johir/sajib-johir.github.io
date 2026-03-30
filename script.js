const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
const body = document.body;

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    navToggle.classList.toggle("is-open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
    body.classList.toggle("menu-open", isOpen);
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("is-open");
      navToggle.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
      body.classList.remove("menu-open");
    });
  });
}

const revealItems = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.14,
  }
);

revealItems.forEach((item) => revealObserver.observe(item));

const sections = document.querySelectorAll("main section[id]");
const menuLinks = document.querySelectorAll(".nav-links a");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const id = entry.target.getAttribute("id");
      const match = document.querySelector(`.nav-links a[href="#${id}"]`);

      if (entry.isIntersecting) {
        menuLinks.forEach((link) => link.classList.remove("active"));
        if (match) match.classList.add("active");
      }
    });
  },
  {
    threshold: 0.42,
  }
);

sections.forEach((section) => sectionObserver.observe(section));

const yearElement = document.getElementById("year");
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

const progressBar = document.getElementById("progressBar");
const backToTop = document.getElementById("backToTop");

const updateScrollUi = () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

  if (progressBar) {
    progressBar.style.width = `${progress}%`;
  }

  if (backToTop) {
    backToTop.classList.toggle("is-visible", scrollTop > 420);
  }
};

window.addEventListener("scroll", updateScrollUi, { passive: true });
window.addEventListener("load", updateScrollUi);

if (backToTop) {
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

const countItems = document.querySelectorAll(".count-number");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const animateCount = (element) => {
  const targetValue = Number(element.dataset.count || 0);
  const decimals = Number(element.dataset.decimals || 0);
  const duration = 1200;
  const startTime = performance.now();

  const step = (now) => {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = targetValue * eased;
    element.textContent = current.toFixed(decimals);

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      element.textContent = targetValue.toFixed(decimals);
    }
  };

  requestAnimationFrame(step);
};

if (countItems.length) {
  const countObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target;
          if (prefersReducedMotion) {
            const targetValue = Number(element.dataset.count || 0);
            const decimals = Number(element.dataset.decimals || 0);
            element.textContent = targetValue.toFixed(decimals);
          } else {
            animateCount(element);
          }
          countObserver.unobserve(element);
        }
      });
    },
    { threshold: 0.55 }
  );

  countItems.forEach((item) => countObserver.observe(item));
}

const interactiveCards = document.querySelectorAll(".interactive-card");
const supportsHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

if (supportsHover && !prefersReducedMotion) {
  interactiveCards.forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const rotateY = ((x / rect.width) - 0.5) * 5;
      const rotateX = ((y / rect.height) - 0.5) * -5;
      card.style.transform = `translateY(-4px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0) rotateX(0) rotateY(0)";
    });
  });
}
