import { menuArray } from "./data.js";

const contatainerEl=document.getElementById("cards-container");
const orderEl=document.getElementById("order-container");
const payModel = document.getElementById('pay-model');
const formEL=document.getElementById('form');
const payBtn=document.getElementById('pay-btn');
const showModel = document.getElementById("show-message")
console.log(payBtn)
let orderArray=[];




    

document.addEventListener('click',function(e){
  if(e.target.dataset.id){
    renderString(e.target.dataset.id)
  }
  else if(e.target.dataset.remove){
    removeBtn(e.target.dataset.remove)
  }
  else if (e.target.id === "complete-order-btn"){
     showPayModel()
  }
  
})
function showPayModel(){
    if (orderArray.length > 0){
    payModel.style.display="block";
    }

}
// order items
function renderString(id) {
    const menuPost = menuArray.find(post =>  post.id ===  Number(id));

    const exists = orderArray.find(item => item.id === menuPost.id);
        if(!exists){
            orderArray.push(menuPost)
         }
     renderOrder();
        }


        

function removeBtn(id){
    orderArray = orderArray.filter( item =>item.id !== Number(id))
    renderOrder()
}

function renderOrder(){
    const totalPrice = orderArray.reduce((accumlator,price)=> accumlator+price.price,0)
    const itemHtml = orderArray.map(post=> 
       {
        return ` 
        <div class="post-container">
            <div class="order-items">
                    <p class="bg-text">${post.name}</p>
                    <button class="remove-btn ingredient-text " data-remove=${post.id}> Remove</button>
            </div>
            <p class="md-txt">$${post.price}</p>
        </div>  `
}).join("");

    orderEl.innerHTML = 
    `
     
    <div class="container">\
                <p class="bg-text order">Your order</p>
                ${itemHtml}
                <p class="total-text">Total price: <span class="price-amount">$${totalPrice}</span></p>
                <button class="complete-order-btn" id="complete-order-btn">  Complete Order </button>
            </div>`

}


// menu items
function getmenuHtml(){
    return menuArray.map(data =>
        `
        <div class="cards">
            <div class="header-image">${data.emoji}</div>
            <div class="body-container">
                <p class="bg-text">${data.name}</p>
                <p class="ingredient-text">${data.ingredients}</p>
                <p class="md-txt"> $${data.price}</p>
            </div>
            <button class="add-btn"
                    id="add-btn"
                    data-id=${data.id} >+</button>
        </div>
        `   

    ).join("");
};

formEL.addEventListener('submit', function(e) {
    e.preventDefault(); // This prevents page reload
    const name = formEL.name.value.trim() || "Customer";
    payModel.style.display = "none";
    orderEl.innerHTML = "";
    orderArray = [];
    showModel.innerHTML = `
      <div class="closing-model">
        <h2 class="pay-model-header">Thank you, ${name}! Your order is on its way!</h2>
      </div>
    `;
});

// display menu
function renderMenu(){
contatainerEl.innerHTML=getmenuHtml();
};

renderMenu();
