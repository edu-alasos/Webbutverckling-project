api = "https://v6.exchangerate-api.com/v6/3a841749723118f07780902f/latest/USD"
apiDebouncePeriod = 600000

async function getData() {
    let date = new Date
    let time = date.getTime()

    let rates = JSON.parse(localStorage.getItem("rates") || '[]')

    let lastFetch = JSON.parse(localStorage.getItem("lastFetchConversions") || '[]')
    let previousFetch = lastFetch
    lastFetch = {time}
    localStorage.setItem("lastFetch", JSON.stringify(lastFetch))

    console.log(rates)

    if (lastFetch - previousFetch > apiDebouncePeriod || rates.length === 0)  {
        const response = await fetch(api)
        const data = await response.json()
        console.log(data)
        conversionRates = data["conversion_rates"]
        console.log(conversionRates)

        rates = ({conversionRates})
        localStorage.setItem("rates", JSON.stringify(rates))

        return conversionRates
    }

    else {
        console.log("Didn't fetch api, recently fetched")
    }
}

getData()