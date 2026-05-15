document.addEventListener('DOMContentLoaded', function() {
    let cart = document.getElementsByClassName("cart")[0]
    let cartDiv = document.getElementsByClassName("cart-div")[0]
    let cartItems = document.getElementsByClassName('cart-items')[0]
    let checkout = document.getElementsByClassName("cart-checkout")[0]
    let cartBadge = document.getElementById("cart-badge")
    let cartCount = document.getElementById("cart-count")
    let cartDivVisible = false

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

    function updateCart() {
        let cart = JSON.parse(localStorage.getItem("cart") || '[]')

        cartItems.innerHTML = ''

        const count = cart.length
        if (cartCount) {
            cartCount.textContent = count === 1 ? '1 item' : `${count} items`
        }
        if (cartBadge) {
            if (count > 0) {
                cartBadge.textContent = count
                cartBadge.style.display = 'flex'
            } else {
                cartBadge.style.display = 'none'
            }
        }

        if (count === 0) {
            cartItems.innerHTML = '<p class="cart-empty">Your cart is empty</p>'
        }

        cart.forEach((item, index) => {
            let itemDiv = document.createElement("div")
            itemDiv.classList.add('cart-item')
            itemDiv.innerHTML = `
                <img class="cart-item-img" src="${item.image}"/>
                <div class="cart-item-info">
                    <p class="cart-item-name">${item.name}</p>
                    <p class="cart-item-seller">${item.seller}</p>
                </div>
                <p class="cart-item-price">${item.price}</p>
                <img class="cart-remove" src="images/RemoveFromCart.png"/>
            `
            cartItems.appendChild(itemDiv)

            itemDiv.querySelector(".cart-remove").addEventListener("click", function (e) {
                let cart = JSON.parse(localStorage.getItem("cart") || '[]')
                cart.splice(index, 1)
                localStorage.setItem("cart", JSON.stringify(cart))
                updateCart()
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
            let image = button.parentElement.querySelector('.product-img img').src

            let cart = JSON.parse(localStorage.getItem("cart") || '[]')
            cart.push({name, price, seller, image})
            localStorage.setItem("cart", JSON.stringify(cart))

            updateCart()
        })
    })

    updateCart()
})