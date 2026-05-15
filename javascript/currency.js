document.addEventListener('DOMContentLoaded', function() {
    const apiUrl = "https://v6.exchangerate-api.com/v6/3a841749723118f07780902f/latest/USD"
    const cacheDuration = 600000

    async function getRates() {
        const cachedRates = JSON.parse(localStorage.getItem("exchangeRates") || 'null')
        const lastFetch = parseInt(localStorage.getItem("lastRatesFetch") || '0')
        const now = Date.now()

        if (cachedRates && (now - lastFetch) < cacheDuration) {
            return cachedRates
        }

        try {
            const response = await fetch(apiUrl)
            const data = await response.json()
            const rates = data.conversion_rates

            localStorage.setItem("exchangeRates", JSON.stringify(rates))
            localStorage.setItem("lastRatesFetch", now.toString())

            return rates
        } catch (error) {
            console.error("Failed to fetch exchange rates:", error)
            return cachedRates
        }
    }

    async function updatePrices(currency) {
        const rates = await getRates()
        if (!rates) return

        const rate = rates[currency]
        if (!rate) return

        document.querySelectorAll(".price-base p").forEach(priceEl => {
            if (!priceEl.dataset.usdPrice) {
                const usdValue = parseFloat(priceEl.textContent.replace('$', ''))
                priceEl.dataset.usdPrice = usdValue
            }

            const usdPrice = parseFloat(priceEl.dataset.usdPrice)
            const converted = (usdPrice * rate).toFixed(2)
            priceEl.textContent = `${converted} ${currency}`
        })
    }

    const currencySelect = document.getElementById('currency-select')
    if (!currencySelect) return

    currencySelect.addEventListener('change', function() {
        const selectedCurrency = this.value
        localStorage.setItem('selectedCurrency', selectedCurrency)
        updatePrices(selectedCurrency)
    })

    const savedCurrency = localStorage.getItem('selectedCurrency') || 'USD'
    currencySelect.value = savedCurrency
    if (savedCurrency !== 'USD') {
        updatePrices(savedCurrency)
    }
})