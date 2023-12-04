

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

let logout=document.getElementById('logout');
logout.style.width='fitContent';

// logout.onclick=async function(){
//     try{
//         let response=await fetch('/logout');
//         let data=await response.json();
//         console.log(data.message);
//     }catch(err){console.log(err);}
//     localStorage.removeItem('user');
// }
// menu.onclick=function(){
//     aside.classList.add("visible");
// }
logout.onclick = async function (event) {
    // window.alert("logged out");
    event.preventDefault(); 
    try {
      let response = await fetch('/logout');
      let data = await response.json();
      console.log(data);
  
      // Redirect to the homepage after successful logout
      if (response.ok) {
        // window.alert(data);
        window.alert("successfully logged out.");
        window.location.href = '/';
      }
    } catch (err) {
      console.error(err);
      window.alert("Error logging out");
    }
    localStorage.removeItem('user');
  };
  


close.onclick = function(){
    aside.classList.remove("visible");
}
//--------------------------------------------------------------

/**
 * For the provider_account.html  form
 */

/**
 * For the provider_serialNumber.html  form
 */
function generateSN(){
    let input=document.getElementById("serialNumber");
    // Generate a random 6-digit number
    const randomNumber = Math.floor(100000 + Math.random() * 900000);

    // Add "SN" to the beginning
    const result = "SN" + randomNumber;

    input.value=result;
}

function copyText() {
    // Get the input element
    const textInput = document.getElementById('serialNumber');
    let message=document.querySelector(".p_serialNumbers #message");
  
    // Select the text in the input field
    textInput.select();
    textInput.setSelectionRange(0, 99999); // For mobile devices
  
    try {
      // Attempt to use the Clipboard API
      document.execCommand('copy');
      message.classList.add("success");
      

      message.innerText="successfully Copied.";
      setTimeout(()=>message.innerText="",1000);
    } catch (err) {
      // Fallback for browsers that do not support the Clipboard API
      console.error('Unable to copy to clipboard:', err);
    //   message.innerText="unable to copy";
    //   message.classList.replace('success','danger');
    }
  
    // Deselect the text
    window.getSelection().removeAllRanges();
  }
