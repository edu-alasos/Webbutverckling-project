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

checkout.addEventListener("click", function (e) {
    window.location.href = "/checkout.html";
})

document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", function (e){
        console.log("add to cart clicked")
    })
})