let cart = document.getElementsByClassName("cart")[0]
let cartDiv = document.getElementsByClassName("cart-div")[0]
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

document.addEventListener("click", function(e){
    console.log(e)
    console.log(e.target)
    if (!cartDiv.contains(event.target) && !cart.contains(event.target)) {
        cartDivVisible = false
        cartDiv.style.display = "none"
    }
})

checkout.addEventListener("click", function (e) {
    window.location.href = "/checkout.html";
})

document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", function (e){
        console.log("add to cart clicked")
        let itemInfo = button.parentElement.querySelector('.product-info')
        let name = itemInfo.querySelector(".name-base").querySelector("p").textContent
        let price = itemInfo.querySelector(".price-base").querySelector("p").textContent
        let seller = itemInfo.querySelector(".created-base").querySelector(".created-person").textContent
        console.log(name)
        console.log(price)
        console.log(seller)
        
        let cart = JSON.parse(localStorage.getItem("cart") || '[]')
        cart.push({name, price, seller})
        localStorage.setItem("cart", JSON.stringify(cart))
    })
})