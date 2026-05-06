function getStars(rating) {
    stars = '★'.repeat(rating) + '☆'.repeat(5-rating)
    return stars
}

document.querySelectorAll('.rating').forEach(item =>{
    let rating = item.dataset.rating
    let pTag = document.createElement('p')
    pTag.textContent = getStars(rating)
    item.appendChild(pTag)
    console.log("asd")
})