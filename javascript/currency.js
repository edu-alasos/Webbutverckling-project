api = "https://v6.exchangerate-api.com/v6/3a841749723118f07780902f/latest/USD"

async function getData() {
    const response = await fetch(api)
    const data = await response.json()
    console.log(data)
    conversionRates = data["conversion_rates"]
    console.log(conversionRates)

    let rates = JSON.parse(localStorage.getItem("rates") || '[]')
    rates.push({conversionRates})
    localStorage.setItem("rates", JSON.stringify(rates))

    let date = new Date
    let time = date.getTime()

    let lastFetch = JSON.parse(localStorage.getItem("lastFetchConversions") || '[]')
    lastFetch.push({time})
    localStorage.setItem("lastFetch", JSON.stringify(lastFetch))

    return conversionRates
}

getData()