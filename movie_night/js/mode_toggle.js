document.querySelector(".dark_mode").onclick = function() {
    document.body.classList.toggle("dark");
    var isDarkMode = document.body.classList.contains("dark");
    this.textContent = isDarkMode ? "Dark Mode ON" : "Dark Mode OFF";
};