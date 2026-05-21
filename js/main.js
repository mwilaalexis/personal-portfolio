(function () {
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  var menuBtn = document.querySelector(".menu-btn");
  var nav = document.querySelector(".nav");

  if (menuBtn && nav) {
    menuBtn.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
      menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      document.body.style.overflow = open ? "hidden" : "";
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.setAttribute("aria-label", "Open menu");
        document.body.style.overflow = "";
      });
    });
  }

  var reveals = document.querySelectorAll(".reveal");
  if (!reveals.length) return;

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) {
    reveals.forEach(function (el) {
      el.classList.add("visible");
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -32px 0px" }
  );

  reveals.forEach(function (el) {
    observer.observe(el);
  });

  document.querySelectorAll(".hero .reveal").forEach(function (el) {
    requestAnimationFrame(function () {
      el.classList.add("visible");
    });
  });
})();
