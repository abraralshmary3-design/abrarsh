/* =================================
   القائمة الرئيسية للجوال
================================= */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", function () {

    navMenu.classList.toggle("open");

    if (navMenu.classList.contains("open")) {
        menuToggle.textContent = "×";
    } else {
        menuToggle.textContent = "☰";
    }

});


/* =================================
   إغلاق القائمة عند اختيار قسم
================================= */

const navLinks = document.querySelectorAll("#navMenu a");

navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        navMenu.classList.remove("open");

        menuToggle.textContent = "☰";

        navLinks.forEach(function (item) {
            item.classList.remove("active");
        });

        link.classList.add("active");

    });

});


/* =================================
   تحديد القسم الحالي عند التمرير
================================= */

const sections = document.querySelectorAll("main section[id]");

const observer = new IntersectionObserver(function (entries) {

    entries.forEach(function (entry) {

        if (entry.isIntersecting) {

            navLinks.forEach(function (link) {

                link.classList.toggle(
                    "active",
                    link.getAttribute("href") === "#" + entry.target.id
                );

            });

        }

    });

}, {
    rootMargin: "-35% 0px -55% 0px"
});


sections.forEach(function (section) {
    observer.observe(section);
});


/* =================================
   إغلاق القائمة عند الضغط خارجها
================================= */

document.addEventListener("click", function (event) {

    const clickedInsideMenu = navMenu.contains(event.target);
    const clickedToggle = menuToggle.contains(event.target);

    if (!clickedInsideMenu && !clickedToggle) {

        navMenu.classList.remove("open");
        menuToggle.textContent = "☰";

    }

});


/* =================================
   تأثير ظهور الأقسام
================================= */

const revealObserver = new IntersectionObserver(function (entries) {

    entries.forEach(function (entry) {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

            revealObserver.unobserve(entry.target);

        }

    });

}, {
    threshold: 0.15
});


document.querySelectorAll(
    ".section-heading, .about-text, .profile-card, .skill-card, .project-card, .contact-card, .linkedin-card"
).forEach(function (element) {

    revealObserver.observe(element);

});