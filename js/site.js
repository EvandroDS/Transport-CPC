const navToggle = document.getElementById("navToggle");
const nav = document.getElementById("nav");
const year = document.getElementById("year");

if (year) year.textContent = new Date().getFullYear();

if (navToggle && nav) {
  navToggle.addEventListener("click", () => nav.classList.toggle("show"));
  nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => nav.classList.remove("show")));
}

// Active nav link based on filename
const path = window.location.pathname.split("/").pop() || "index.html";
document.querySelectorAll(".nav-link").forEach(link => {
  if (link.getAttribute("href") === path) link.classList.add("active");
});
