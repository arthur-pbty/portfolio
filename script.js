document.addEventListener("DOMContentLoaded", function() {
    var userLanguage = navigator.language || navigator.userLanguage;
    var userLanguage = userLanguage.substring(0, 2);

    if (userLanguage !== "fr" && userLanguage !== "en" && userLanguage !== "zh") {
        var userLanguage = "en";
    } 

    var elementsToStyle = document.querySelectorAll("[lang]");
    for (var j = 0; j < elementsToStyle.length; j++) {
        var element = elementsToStyle[j];
        if (userLanguage !== element.getAttribute("lang")) {
            element.style.display = "none";
        }
    }
});
