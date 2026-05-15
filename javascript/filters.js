document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.filters form')
    const searchInput = document.getElementById('search-bar')
    const minPriceInput = document.getElementById('minimum-price')
    const maxPriceInput = document.getElementById('maximum-price')
    const sellerInput = document.getElementById('by-seller')
    const shippingCheckbox = document.getElementById('with-shipping')
    const products = document.querySelectorAll('.product')

    function applyFilters() {
        const search = searchInput.value.toLowerCase().trim()
        const minPrice = parseFloat(minPriceInput.value) || 0
        const maxPrice = parseFloat(maxPriceInput.value) || Infinity
        const seller = sellerInput.value.toLowerCase().trim()
        const requireShipping = shippingCheckbox.checked

        products.forEach(product => {
            const nameEl = product.querySelector('.name-base p')
            const priceEl = product.querySelector('.price-base p')
            const sellerEl = product.querySelector('.created-person')

            if (!nameEl || !priceEl || !sellerEl) return

            const name = nameEl.textContent.toLowerCase()
            const price = parseFloat(priceEl.dataset.usdPrice || priceEl.textContent.replace(/[^0-9.]/g, ''))
            const productSeller = sellerEl.textContent.toLowerCase()
            const hasShipping = product.dataset.shipping === 'true'

            const matchesSearch = !search || name.includes(search)
            const matchesMin = price >= minPrice
            const matchesMax = price <= maxPrice
            const matchesSeller = !seller || productSeller.includes(seller)
            const matchesShipping = !requireShipping || hasShipping

            if (matchesSearch && matchesMin && matchesMax && matchesSeller && matchesShipping) {
                product.style.display = ''
            } else {
                product.style.display = 'none'
            }
        })
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault()
        applyFilters()
    })

    ;[searchInput, minPriceInput, maxPriceInput, sellerInput, shippingCheckbox].forEach(el => {
        el.addEventListener('input', applyFilters)
    })
})