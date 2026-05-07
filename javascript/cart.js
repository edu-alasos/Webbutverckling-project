let cart = document.getElementsByClassName("cart")[0]
let cartDiv = document.getElementsByClassName("cart-div")[0]
let cartItems = document.getElementsByClassName('cart-items')[0]
let checkout = document.getElementsByClassName("cart-checkout")[0]
let cartDivVisible = false

function generateProducts() {

}

cart.addEventListener("click", function (e) {
    console.log("cart clicked")
    cartDivVisible = !cartDivVisible
    if (cartDivVisible) {
        cartDiv.style.display = "flex"
    }
    else {
        cartDiv.style.display = "none"
    }
})

document.addEventListener("click", function(e) {
    if (!cartDiv.contains(event.target) && !cart.contains(event.target)) {
        cartDivVisible = false
        cartDiv.style.display = "none"
    }
})

checkout.addEventListener("click", function (e) {
    window.location.href = "/checkout.html";
})

function updateCart() {
    let cart = JSON.parse(localStorage.getItem("cart") || '[]')

    cartItems.innerHTML = ''

    cart.forEach((item, index) => {
        let itemDiv = document.createElement("div")
        itemDiv.classList.add('cart-item')
        itemDiv.innerHTML = `
            <img class="cart-item-img" src="http://localhost:5500/y9DpT.jpg"/>
            <p class="cart-item-name">${item.name}</p>
            <p class="cart-item-price">${item.price}</p>
            <p class="cart-item-seller">${item.seller}</p>
            <img class="cart-remove" src="http://localhost:5500/6016828.png"/>
        `
        cartItems.appendChild(itemDiv)

        document.querySelectorAll(".cart-remove").forEach(button => {
            button.addEventListener("click", function (e) {
                let cart = JSON.parse(localStorage.getItem("cart") || '[]')
                cart.splice(index, 1)
                localStorage.setItem("cart", JSON.stringify(cart))
                updateCart()
            })
        })
    })
}

document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", function (e) {
        console.log("add to cart clicked")
        let itemInfo = button.parentElement.querySelector('.product-info')
        let name = itemInfo.querySelector(".name-base").querySelector("p").textContent
        let price = itemInfo.querySelector(".price-base").querySelector("p").textContent
        let seller = itemInfo.querySelector(".created-base").querySelector(".created-person").textContent
        
        let cart = JSON.parse(localStorage.getItem("cart") || '[]')
        cart.push({name, price, seller})
        localStorage.setItem("cart", JSON.stringify(cart))

        updateCart()
    })
})

updateCart()