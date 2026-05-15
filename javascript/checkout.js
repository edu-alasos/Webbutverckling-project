document.addEventListener('DOMContentLoaded', function() {
    renderCheckout()
})

function renderCheckout() {
    const cart = JSON.parse(localStorage.getItem("cart") || '[]')
    const tbody = document.getElementById('checkout-tbody')
    const tfootCell = document.getElementById('checkout-total')
    const emptyMsg = document.getElementById('checkout-empty')
    const table = document.getElementById('checkout-table')
    const payBtn = document.querySelector('.pay-btn')

    tbody.innerHTML = ''

    const currency = localStorage.getItem('selectedCurrency') || 'USD'
    const currencyPrefix = currency === 'USD' ? '$' : ''
    const currencySuffix = currency === 'USD' ? '' : ` ${currency}`

    if (cart.length === 0) {
        emptyMsg.style.display = 'block'
        table.style.display = 'none'
        if (payBtn) payBtn.textContent = `Pay ${currencyPrefix}0.00${currencySuffix}`
        return
    }

    emptyMsg.style.display = 'none'
    table.style.display = 'table'

    let total = 0

    cart.forEach((item, index) => {
        const price = parseFloat(item.price.replace(/[^0-9.]/g, ''))
        total += price

        const row = document.createElement('tr')
        row.innerHTML = `
            <td><img src="${item.image}" class="checkout-item-img"></td>
            <td>${item.name}</td>
            <td>${item.seller}</td>
            <td>${item.price}</td>
            <td><button class="remove-from-checkout" data-index="${index}">Remove</button></td>
        `
        tbody.appendChild(row)
    })

    const totalFormatted = `${currencyPrefix}${total.toFixed(2)}${currencySuffix}`
    tfootCell.textContent = totalFormatted
    if (payBtn) payBtn.textContent = `Pay ${totalFormatted}`

    tbody.querySelectorAll('.remove-from-checkout').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = parseInt(this.dataset.index)
            let cart = JSON.parse(localStorage.getItem("cart") || '[]')
            cart.splice(index, 1)
            localStorage.setItem("cart", JSON.stringify(cart))
            renderCheckout()
        })
    })

    if (payBtn) {
        payBtn.addEventListener('click', function(e) {
            e.preventDefault()
            localStorage.setItem("cart", JSON.stringify([]))
            renderCheckout()
        })
    }
}