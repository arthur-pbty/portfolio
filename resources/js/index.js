import '../css/index.css'

const toggleBtn = document.getElementById("toggle-btn");
const body = document.querySelector("body");
const text = document.getElementById("text");
const mini_nav = document.getElementById("mini-nav");
const mini_nav_depli = document.getElementById("nav");

let darkmode = localStorage.getItem("dark-mode");

const enableDarkMode=() =>{
    body.classList.add("dark-mode-theme");
    mini_nav.classList.add("nav-dark");
    mini_nav_depli.classList.add("nav-dark");
    mini_nav.classList.remove("nav-light");
    mini_nav_depli.classList.remove("nav-light");

    toggleBtn.classList.add("dark-mode-toggle");
    toggleBtn.style.color = "rgb(177, 177, 177)";

    text.innerHTML="sombre";
    localStorage.setItem("dark-mode" , "enabled")
}

const disableDarkMode= () =>{
    body.classList.remove("dark-mode-theme");
    mini_nav.classList.remove("nav-dark");
    mini_nav_depli.classList.remove("nav-dark");
    mini_nav.classList.add("nav-light");
    mini_nav_depli.classList.add("nav-light");

    toggleBtn.classList.remove("dark-mode-toggle");
    toggleBtn.style.color = "rgb(83, 83, 83)";

    text.innerHTML="claire";
    localStorage.setItem("dark-mode" , "disabled")
}


if(darkmode === "enabled"){
    enableDarkMode()
}

toggleBtn.onclick = function(){
    darkmode = localStorage.getItem("dark-mode");
    if(darkmode === "enabled"){
        disableDarkMode()
    } else {
        enableDarkMode()
    }
}