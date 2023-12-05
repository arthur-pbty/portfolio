import '../css/app.css'
import Alpine from 'alpinejs'

window.Alpine = Alpine

Alpine.start()



if (!localStorage.theme) localStorage.theme = 'systeme';

// si le theme est systeme on regarde si le systeme est en dark ou light et on met une class dark ou light sur le html
if (localStorage.theme === 'systeme') {
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

// si le theme est light on met la class light sur le html
if (localStorage.theme === 'light') {
  document.documentElement.classList.remove('dark')
}

// si le theme est dark on met la class dark sur le html
if (localStorage.theme === 'dark') {
  document.documentElement.classList.add('dark')
}  
