(function () {
  "use strict";

  /* ---------------------------------------------------- colour theme toggle */
  var root = document.documentElement;
  var toggle = document.getElementById("theme-toggle");

  function prefersDark() {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  function currentTheme() {
    var set = root.getAttribute("data-theme");
    if (set) return set;
    return prefersDark() ? "dark" : "light";
  }

  function paintIcon() {
    if (!toggle) return;
    var icon = toggle.querySelector("i");
    if (!icon) return;
    icon.className = currentTheme() === "dark" ? "fa-solid fa-sun" : "fa-solid fa-moon";
  }

  if (toggle) {
    toggle.addEventListener("click", function () {
      var next = currentTheme() === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
      paintIcon();
    });
  }
  paintIcon();

  /* ------------------------------------------------------ scroll progress */
  var bar = document.getElementById("progress");
  if (bar) {
    var update = function () {
      var height = document.documentElement.scrollHeight - window.innerHeight;
      var pct = height > 0 ? (window.scrollY / height) * 100 : 0;
      bar.style.width = Math.min(100, Math.max(0, pct)) + "%";
    };
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
  }
})();
