const form = document.querySelector("#searchForm")
const imgContainer = document.querySelector(".image-container")

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const searchTerm = form.elements.query.value;
    const response = await axios.get(`https://api.tvmaze.com/search/shows?q=${searchTerm}`)

    if (imgContainer.children) {
        imgContainer.innerHTML = '';
    }
    displayImages(response.data)
    console.dir(response.data)
    form.elements.query.value = "";

})

const displayImages = (shows) => {

    if (shows.length === 0) {
        const errorText = document.createElement('h1')
        errorText.innerText = "No TV shows found";
        imgContainer.append(errorText)
    }
    else {
        for (let result of shows) {
            if (result.show.image) {

                const newImg = document.createElement('img')
                newImg.src = result.show.image.medium;
                imgContainer.append(newImg)
            }
        }
    }

}