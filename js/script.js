/* ==========================================
        LAMMY'S COLLECTION V2.0
========================================== */

// ==========================================
// WEBSITE LOADED
// ==========================================

window.addEventListener("load", () => {

    console.log("Lammy's Collection Loaded Successfully.");

});

// ==========================================
// MOBILE MENU
// ==========================================

const menuToggle = document.getElementById("menu-toggle");

const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", () => {

    navLinks.classList.toggle("active");

});

// ==========================================
// SMOOTH SCROLL
// ==========================================

document.querySelectorAll('nav a').forEach(link => {

    link.addEventListener('click', function(e){

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        target.scrollIntoView({

            behavior:"smooth"

        });

        navLinks.classList.remove("active");

    });

});

// ==========================================
// HEADER COLOR
// ==========================================

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if(window.scrollY > 80){

        header.style.background="#111";

    }

    else{

        header.style.background="rgba(0,0,0,.85)";

    }

});

// ==========================================
// BACK TO TOP
// ==========================================

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", ()=>{

    if(window.scrollY > 400){

        backToTop.style.display="block";

    }

    else{

        backToTop.style.display="none";

    }

});

backToTop.addEventListener("click", ()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});
/* ==========================================
        DARK MODE
========================================== */

/*
darkBtn.addEventListener("click",()=>{

    document.body.classList.toggle("dark-mode");

    localStorage.setItem(

        "theme",

        document.body.classList.contains("dark-mode")

        ?

        "dark"

        :

        "light"

    );

});
*/


// ==========================================
// FADE IN SECTIONS
// ==========================================

const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver(entries=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.style.opacity="1";

            entry.target.style.transform="translateY(0)";

        }

    });

});

sections.forEach(section=>{

    section.style.opacity="0";

    section.style.transform="translateY(40px)";

    section.style.transition=".8s";

    observer.observe(section);

});

/* ==========================================
        SHOPPING CART
========================================== */

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItems = document.getElementById("cart-items");

const cartCount = document.getElementById("cart-count");

const cartSummary = document.getElementById("cart-count-summary");

const subtotal = document.getElementById("subtotal");

const cartTotal = document.getElementById("cart-total");

const selectedProducts = document.getElementById("selected-products");

const paymentTotal = document.getElementById("payment-total");

const deliveryFee = 2000;

// ==========================================
// SAVE CART
// ==========================================

function saveCart(){

    localStorage.setItem("cart", JSON.stringify(cart));

}

// ==========================================
// FORMAT MONEY
// ==========================================

function formatMoney(amount){

    return "₦" + amount.toLocaleString();

}

// ==========================================
// ADD TO CART
// ==========================================

document.querySelectorAll(".add-to-cart").forEach(button => {

    button.addEventListener("click", () => {

        console.log("Button clicked");

        const name = button.dataset.name;

        console.log(name);

        const price = Number(button.dataset.price);

        const existing = cart.find(item => item.name === name);

        if (existing) {

            existing.quantity++;

        } else {

            cart.push({

                name: name,
                price: price,
                quantity: 1

            });

        }

        saveCart();

        displayCart();

        alert(name + " added to cart.");

    });

});

// ==========================================
// DISPLAY CART
// ==========================================

function displayCart(){

    cartItems.innerHTML="";

    let totalItems=0;

    let totalAmount=0;

    let productList=[];

    cart.forEach((item,index)=>{

        totalItems += item.quantity;

        const itemTotal = item.price * item.quantity;

        totalAmount += itemTotal;

        productList.push(

            item.name +

            " x " +

            item.quantity

        );

        cartItems.innerHTML += `

<tr>

<td>${item.name}</td>

<td>${formatMoney(item.price)}</td>

<td>

<div class="quantity">

<button onclick="decreaseQuantity(${index})">-</button>

<span>${item.quantity}</span>

<button onclick="increaseQuantity(${index})">+</button>

</div>

</td>

<td>${formatMoney(itemTotal)}</td>

<td>

<button class="remove-btn"

onclick="removeItem(${index})">

Remove

</button>

</td>

</tr>

`;

    });

    cartCount.innerText=totalItems;

    cartSummary.innerText=totalItems;

    subtotal.innerText=formatMoney(totalAmount);

    cartTotal.innerText=formatMoney(totalAmount + deliveryFee);

   if (paymentTotal) {
    paymentTotal.value = formatMoney(totalAmount + deliveryFee);
}

if (selectedProducts) {
    selectedProducts.value = productList.join(", ");
}

}

/* ==========================================
        QUANTITY
========================================== */

function increaseQuantity(index){

    cart[index].quantity++;

    saveCart();

    displayCart();
   console.log("Cart Loaded:", cart); 

}

function decreaseQuantity(index){

    if(cart[index].quantity>1){

        cart[index].quantity--;

    }

    else{

        cart.splice(index,1);

    }

    saveCart();

    displayCart();

}

/* ==========================================
        REMOVE ITEM
========================================== */

function removeItem(index){

    if(confirm("Remove this perfume from cart?")){

        cart.splice(index,1);

        saveCart();

        displayCart();

    }

}

/* ==========================================
        LOAD CART
========================================== */

displayCart();

/* ==========================================
        LIVE SEARCH
========================================== */

const searchInput = document.getElementById("searchInput");

const productCards = document.querySelectorAll(".product-card");

searchInput.addEventListener("keyup", function(){

    const value = this.value.toLowerCase();

    productCards.forEach(card=>{

        const productName = card.querySelector("h3")
                                .innerText
                                .toLowerCase();

        if(productName.includes(value)){

            card.style.display="block";

        }

        else{

            card.style.display="none";

        }

    });

});

/* ==========================================
        WISHLIST
========================================== */

let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

const hearts = document.querySelectorAll(".wishlist");

hearts.forEach(button=>{

    button.addEventListener("click", ()=>{

        const product = button.parentElement.querySelector("h3").innerText;

        if(wishlist.includes(product)){

            wishlist = wishlist.filter(item=>item!==product);

            button.innerHTML='<i class="far fa-heart"></i>';

        }

        else{

            wishlist.push(product);

            button.innerHTML='<i class="fas fa-heart"></i>';

        }

        localStorage.setItem(

            "wishlist",

            JSON.stringify(wishlist)

        );

    });

});


/* ==========================================
        QUICK VIEW MODAL
========================================== */

const modal = document.getElementById("productModal");

const modalImg = document.getElementById("modalImage");

const modalTitle = document.getElementById("modalTitle");

const modalPrice = document.getElementById("modalPrice");

const modalDescription =
document.getElementById("modalDescription");

const closeModal =
document.querySelector(".close-modal");

document.querySelectorAll(".quick-view").forEach(button=>{

    button.addEventListener("click",()=>{

        const card =
        button.closest(".product-card");

        modalImg.src =
        card.querySelector("img").src;

        modalTitle.innerText =
        card.querySelector("h3").innerText;

        modalPrice.innerText =
        card.querySelector(".new-price").innerText;

        modalDescription.innerText =
        "Premium authentic fragrance carefully selected for confidence, elegance and unforgettable moments.";

        modal.style.display="flex";

    });

});

closeModal.onclick=function(){

    modal.style.display="none";

}

window.onclick=function(e){

    if(e.target===modal){

        modal.style.display="none";

    }

}

/* ==========================================
        NEWSLETTER
========================================== */

const newsletter = document.getElementById("newsletterForm");

newsletter.addEventListener("submit",function(e){

    e.preventDefault();

    alert(

        "🎉 Thank you for subscribing!"

    );

    this.reset();

});

/* ==========================================
        CHECKOUT BUTTON
========================================== */

const checkoutBtn = document.getElementById("checkout-btn");

checkoutBtn.addEventListener("click",()=>{

    document.getElementById("checkout")

    .scrollIntoView({

        behavior:"smooth"

    });

});

/* ==========================================
        PAYSTACK PAYMENT
========================================== */

const payButton = document.getElementById("paystack-btn");

payButton.addEventListener("click", function () {

    if (cart.length === 0) {

        alert("Your cart is empty.");

        return;

    }

    const email = document.querySelector(
        'input[name="customer_email"]'
    ).value;

    const name = document.querySelector(
        'input[name="customer_name"]'
    ).value;

    if (email === "" || name === "") {

        alert("Please complete the checkout form first.");

        return;

    }

    let amount = 0;

    cart.forEach(item => {

        amount += item.price * item.quantity;

    });

    amount += deliveryFee;

    let handler = PaystackPop.setup({

        key: "YOUR_PAYSTACK_PUBLIC_KEY",

        email: email,

        amount: amount * 100,

        currency: "NGN",

        firstname: name,

        callback: function (response) {

            alert(

                "Payment Successful!\nReference: " +

                response.reference

            );

        },

        onClose: function () {

            alert("Payment window closed.");

        }

    });

    handler.openIframe();

});

/* ==========================================
        EMAILJS ORDER
========================================== */
const form = document.getElementById("orderForm");
form.addEventListener("submit", function (e) {

    console.log("Confirm Order clicked");

    e.preventDefault();

    if(cart.length===0){

        alert("Please add a perfume to your cart first.");

        return;

    }

    emailjs.sendForm(

        "service_f621rh8",

        "template_xb4bhkb",

        this

    )

    .then(() => {

        alert(

            "🎉 Order sent successfully!"

        );

        cart=[];

        saveCart();

        displayCart();

        form.reset();

    })

    .catch(error => {

    console.error("EmailJS Error:", error);

    alert(
        "Status: " + (error.status || "Unknown") +
        "\nMessage: " + (error.text || error.message || JSON.stringify(error))
    );

});

    });


/* ==========================================
        RESTORE WISHLIST
========================================== */

hearts.forEach(button=>{

    const name=

    button.parentElement

    .querySelector("h3")

    .innerText;

    if(wishlist.includes(name)){

        button.innerHTML=

        '<i class="fas fa-heart"></i>';

    }

});

