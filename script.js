document.addEventListener("DOMContentLoaded", function() {
    var userLanguage = navigator.language || navigator.userLanguage;
    
    // Supposons que vous preniez en charge l'anglais (en) et le français (fr)
    if (userLanguage.startsWith("fr")) {
        document.body.classList.add("lang-fr");
    } else {
        document.body.classList.add("lang-en");
    }
});
