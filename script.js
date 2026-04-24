let cart = document.getElementsByClassName("cart")[0]

cart.addEventListener("click", function (e) {
    console.log("cart clicked")

    const div = document.createElement("div")
    div.classList = "cart-view"
    console.log(div)
    document.body.appendChild(div)
})