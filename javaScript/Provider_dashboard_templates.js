
// let anchors=document.querySelectorAll("a.aside");
// fetch("templates/asideTemplate.html")
// .then(response => response.text())
// .then(template => {
//     let aside=document.querySelector('aside');
//     aside.innerHTML=template;
//     initializeAside();
// });

/**
 * "ASIDE template"
 * Here we inject the aside template into the aside of each subpage of the provider dashboard
 */
let asideContent=`
<div class="top">
<div class="logo">
      <span class="material-symbols-sharp" title="LicenHub">encrypted</span>
    <h2>Licen<span>Hub</span></h2>
</div>
<div class="close" id="close">
    <span class="material-icons-sharp">close</span>
</div>
</div>
<div class="side">
<a href="provider_dashboard.html" class=" aside">
    <span class="material-icons-sharp">dashboard</span>
    <p>Dashboard</p>
</a>
<a href="provider_account.html" class="aside">
    <span class="material-icons-sharp">account_circle</span>
    <p>Account</p>
</a>
<a href="provider_customers.html" class="aside">
    <span class="material-icons-sharp">group</span>
    <p>Customers</p>
</a>
<a href="provider_products.html" class="aside">
    <span class="material-icons-sharp">inventory</span>
    <p>Products</p>
</a>
<a href="provider_serialNumbers.html" class="aside">
    <span class="material-icons-sharp">vpn_key</span>
    <p>Serial Numbers</p>
</a>
<a href="provider_notifications.html" class="aside">
    <span class="material-icons-sharp">notifications</span>
    <p>Notifications</p>
</a>
<a href="provider_settings.html" class="aside">
    <span class="material-icons-sharp">settings</span>
    <p>Settings</p>
</a>
<a href="../index.html" class="aside">
    <span class="material-icons-sharp">logout</span>
    <p>Logout</p>
</a>
</div>
`;

function initializeAside() {// This function chooses and updates the active anchor in the aside based on the current page (current window location path)
    const anchors=document.querySelectorAll("a.aside");
    // console.log(anchors.innerHTML);
    const currentPage=window.location.pathname;
    anchors.forEach((anchor,index)=>{
        if(currentPage.includes(anchors[index].getAttribute('href')))
        anchors[index].classList.add("active");
    });
}

document.querySelector('aside').innerHTML=asideContent;
initializeAside();

/**
 * RIGHT template
 * Here we inject the .right class content template into the .right class of all provider dashboard subpages.
 * 
 */

let rightContent=`
<div class="top">
<div class="menu" id="menu">
    <span class="material-symbols-sharp">menu</span>
</div>
<div class="theme" id="darklighttheme">
    <span class="material-icons-sharp active" id="lightmode" >light_mode</span>
    <span class="material-icons-sharp" id="darkmode">dark_mode</span>
</div>
<div class="profile">
    <div class="info">
        <p>Hey, <b>Daniel</b></p>
        <small>Admin</small>
    </div>
    <div class="profile-image">
        <img src="../images/profile-2398782_1280.webp" alt="profile image">
    </div>
</div>
</div>

<div class="notifications">
  <h2>Recent Notifications</h2>
  <div class="contents">
  <div class="notification">
    <div class="message">
      <img src="../images/download (1).png" alt="">
      <p>Danny Down renewed his <span class="bold">DataDash</span> subscription</p>
    </div>
    <div class="time">
      <small>4 minutes ago</small>
    </div>
  </div>

    <div class="notification">
      <div class="message">
        <img src="../images/images.jpeg" alt="">
        <p>Sara Hany renewed her <span class="bold">CyberConnect</span > subscription</p>
      </div>
      <div class="time">
        <small>45 minutes ago</small>
      </div>
    </div>

      <div class="notification">
        <div class="message">
          <img src="../images/download.png" alt="">
          <p>David Due requisted to close his account</p>
        </div>
        <div class="time">
          <small>2 hours ago</small>
        </div>
        </div>
  </div>
</div>
<div class="analytics">
<h2>Analytics</h2>
<div class="info">
  <div class="box">
    <span class="material-symbols-sharp">shopping_cart </span>
    <div class="contents">
      <div class="top">
        <span>Subsciptions</span>
        <span class="success">+54%</span>
        <span>102</span>
      </div>
      <div class="bottom">
        <small>last 24 hours</small>
      </div>
    </div>
  </div>
</div>
<div class="info">
  <div class="box">
    <span class="material-symbols-sharp">account_circle </span>
    <div class="contents">
      <div class="top">
        <span>New Customers</span>
        <span class="success">+24%</span>
        <span>16</span>
      </div>
      <div class="bottom">
        <small>last 24 hours</small>
      </div>
    </div>
  </div>
</div>
</div>
`;

document.querySelector('.right').innerHTML=rightContent;