 function updateTheme() {
    console.log("updating themes");
    let mode = localStorage.getItem('mode');
    if (mode === 'light') {
    
        document.body.classList.remove('dark_mode_values');
    } else if (mode === 'dark') {
       
        document.body.classList.add('dark_mode_values');
    }
}
updateTheme();