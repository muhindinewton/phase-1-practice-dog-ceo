document.addEventListener("DOMContentLoaded", () => {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
    const breedUrl = "https://dog.ceo/api/breeds/list/all";
    const imageContainer = document.getElementById("dog-image-container");
    const breedList = document.getElementById("dog-breeds");
    const breedDropdown = document.getElementById("breed-dropdown");
    let allBreeds = [];

    // Fetch and display random dog images
    fetch(imgUrl)
        .then(response => response.json())
        .then(data => {
            data.message.forEach(imgUrl => {
                const imgElement = document.createElement("img");
                imgElement.src = imgUrl;
                imgElement.alt = "A Random Dog";
                imageContainer.appendChild(imgElement);
            });
        })
        .catch(error => console.error("Error fetching images:", error));

    // Fetch and display dog breeds
    fetch(breedUrl)
        .then(response => response.json())
        .then(data => {
            allBreeds = Object.keys(data.message);
            displayBreeds(allBreeds);
        })
        .catch(error => console.error("Error fetching breeds:", error));

    // Function to display breeds in the list
    function displayBreeds(breeds) {
        breedList.innerHTML = "";
        breeds.forEach(breed => {
            const li = document.createElement("li");
            li.textContent = breed;
            li.addEventListener("click", () => {
                li.style.color = "blue"; // Change font color on click
            });
            breedList.appendChild(li);
        });
    }

    // Filter breeds by selected letter
    breedDropdown.addEventListener("change", (event) => {
        const selectedLetter = event.target.value;
        const filteredBreeds = allBreeds.filter(breed => breed.startsWith(selectedLetter));
        displayBreeds(filteredBreeds);
    });
});
