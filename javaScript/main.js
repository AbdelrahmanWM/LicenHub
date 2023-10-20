/**
 * Here we handle the light/dark mode
 */




let darkmode = document.getElementById("darkmode");
let lightmode = document.getElementById("lightmode");

let theme = document.getElementById("darklighttheme");

theme.onclick = function () {
    let mode = localStorage.getItem('mode');
    if (mode === 'dark') {
        localStorage.setItem('mode', 'light');
    } else if (mode === 'light' || mode === null) { // Added mode === null for initial setting
        localStorage.setItem('mode', 'dark');
    }
    updateTheme(); // Call a function to update the theme immediately
};

function updateTheme() {
    let mode = localStorage.getItem('mode');
    if (mode === 'light') {
        darkmode.classList.remove('active');
        lightmode.classList.add('active');
        document.body.classList.remove('dark_mode_values');
    } else if (mode === 'dark') {
        darkmode.classList.add('active');
        lightmode.classList.remove('active');
        document.body.classList.add('dark_mode_values');
    }
}


updateTheme();





/**
 * Here we change the active link (anchor) in the aside once clicked
 */
document.querySelectorAll('aside').innerHTML=asideContent;
let handler = function(event) {
    if(event.target.classList.contains("aside"))
    {
    let anchors=document.querySelectorAll("a.aside");
    anchors.forEach((element)=>{
        element.classList.remove("active");
    });
    event.target.classList.add("active");
//     let anchor=anchors[2];
// anchor.click();
    }
}
document.addEventListener("click",handler);

/*******************************/

/**
 * Here we handle the 'click' event for the aside close, and top menu in the case of media max-width 768px (mobile size)
 */

let menu=document.getElementById("menu");
let close=document.getElementById("close");
let aside=document.querySelector("aside");

menu.onclick=function(){
    aside.classList.add("visible");
}

close.onclick = function(){
    aside.classList.remove("visible");
}