document.addEventListener("DOMContentLoaded", () => {
    const photoContainer = document.getElementById("photo-gallery")
    const buttonList = document.getElementById("button-list")
    const modal = document.getElementById("modal");
    const modalBody = document.getElementById("modal-body")
    const closeBtn = document.getElementsByClassName("closeBtn")[0];

    closeBtn.addEventListener('click', closeModal);
    window.addEventListener('click', outsideClick);

    function openModal(value) {
        modal.style.display = 'block';
        modalBody.innerHTML = `<img src=${value} />`
    }

    function closeModal() {
        modal.style.display = 'none';
    }

    function outsideClick(e) {
        if (e.target == modal) {
            modal.style.display = 'none';
        }
    }

    function fetchPhoto(page) {
        let clientId = "ZCR4bptOtkdM4ll2-Hr6AmYaevJViiYcCzXs6vc0d1o"
        let url = `https://api.unsplash.com/search/photos/?client_id=${clientId}&page=${page}&orientation=landscape&query=beach`

        fetch(url)
            .then((response) => response.json())
            .then(data => {
                const imgListHtml = data.results.map(result => `<img src=${result.urls.thumb} name=${result.urls.small} class="gallery-image"/>`).join("")
                photoContainer.innerHTML = imgListHtml
                photoContainer.addEventListener("click", (event) => {
                    if (event.target.nodeName === "IMG") {
                        openModal(event.target.name)
                    }
                })
            })
    }
    fetchPhoto(1)
    buttonList.addEventListener("click", (event) => {
        if (event.target.nodeName === "BUTTON") {
            fetchPhoto(event.target.value)
        }
    })
    const buttons = []
    for (let i = 1; i <= 10; i++) {
        buttons.push(`<button id=button-${i} value=${i}>${i}</button>`)
    }
    buttonList.innerHTML = buttons.join("")
})
