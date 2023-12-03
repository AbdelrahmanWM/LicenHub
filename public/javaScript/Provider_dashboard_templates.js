
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
document.addEventListener('DOMContentLoaded', function () {
  // Retrieve user information from the session
  const user = JSON.parse(localStorage.getItem('user'));

  // Check if the user is authorized
  if (!user || user.userType !== 'P') {
    window.location.href = '../Login&Register/Login&Register.html'; // Redirect to the login page
  }

  // ... rest of your code for the provider dashboard
});


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
<a href="../index.html" class="aside" id='logout'>
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
let username=JSON.parse(localStorage.getItem('user')).firstname;
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
        <p>Hey, <b>${username}</b></p>
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

/*  
Adding customers to provider_customers.html table 
*/
async function refreshTableContents(){
    const table = document.querySelector('table.customers tbody');
    // Clear existing rows in the table
    table.innerHTML = "";
  
    try {
      const tableData = await fetch(`/customers?id=${JSON.parse(localStorage.getItem('user')).id}`);
      const customers = await tableData.json();
  
      for (let i = 0; i < customers.data.length; i++) {
        const row = document.createElement('tr');
        
        row.innerHTML = `
          <td><b>${customers.data[i].name}</b></td>
          <td>${customers.data[i].email}</td>
          <td class="success">${customers.data[i].status}</td>
          <td>${customers.data[i].creation_date.substring(0,10)}</td>
          <td class="success">${customers.data[i].subscription}</td>
          <td>${customers.data[i].serial_numbers}</td>
          <td>
            <span class="primary">Edit</span>
            <span class="dangerous" onclick="deleteCustomer(this)">Delete</span>
            <span id="notify" class="warning" onclick="openEmail(this)">Notify</span>
          </td>
        `;
  
        table.appendChild(row);
      }
    } catch (error) {
      console.error('Error fetching customer data:', error);
    }
  
}
document.addEventListener('DOMContentLoaded', async function () {
refreshTableContents();
});
// Notify span 
function openEmail(spanElement) {
  // Get the parent row (tr)
  const row = spanElement.closest('tr');

  // Get the email from the second cell (td) in the same row
  const email = row.cells[1].textContent.trim();

  // Construct the mailto link
  const mailtoLink = `mailto:${email}`;

  // Open the default email client
  window.location.href = mailtoLink;
}
// Delete Span
 function deleteCustomer(spanElement){
  const row = spanElement.closest('tr');

  // Get the email from the second cell (td) in the same row
  const email = row.cells[1].textContent.trim();

  const response= fetch(`/deleteCustomer?email=${email}`);
//  if(response.ok) {window.alert("Deleted");  refreshTableContents();}
//  else{
//   window.alert("problme");
//  }
 response.then(refreshTableContents());
}
/**************************************** */
// adding a new customer
let addNewCustomerButton=document.getElementById("addCustomer");
addNewCustomerButton.onclick=function(event){
addNewCustomerForm.style.display='block';
addNewCustomerButton.style.display='none';
}
let addNewCustomerForm=document.getElementById("customerForm");
addNewCustomerForm.addEventListener("submit", async function (event) {
  const name=document.querySelector('#customerForm input[name="name"]').value;
  const email=document.querySelector('#customerForm input[name="email"]').value;
  const serialNumber=document.querySelector('#customerForm input[name="sn"]').value;
  const id=JSON.parse(localStorage.getItem('user')).id;
  console.log(name);
  console.log(email);
  console.log(serialNumber);
  event.preventDefault();
  try{
    const response=await fetch('/addCustomer',{
        method:"POST",
        headers: {
        'Content-Type': 'application/json',
        },
        body:JSON.stringify({id:id,name:name,email:email,serialNumber:serialNumber})
        }
        );
        if(response.ok){
          let data=await response.json();
          if(data.message=='X'){
            window.alert("user already exists.");
          }
          else if(data.message=='R'){
            window.alert("Repeated Serial Number.");
          }
          else{
          addNewCustomerForm.style.display='none';
          addNewCustomerButton.style.display='block';
          }
          refreshTableContents();
        }
}catch(err){
  console.err(err);
}
});

