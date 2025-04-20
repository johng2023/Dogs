async function fetchAPIData(url) {
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  return data;
}

async function displayDogs() {
  const { message } = await fetchAPIData("https://dog.ceo/api/breeds/list/all");

  for (const [breed, subBreeds] of Object.entries(message)) {
    const card = document.createElement("div");
    card.classList.add("card");

    const imageUrl = await displayDogImage(breed);
    card.innerHTML = `
      <h2>${breed.charAt(0).toUpperCase() + breed.slice(1)}</h2>
      ${subBreeds.length ? `<h4>Sub-breeds: ${subBreeds.join(", ")}</h4>` : ""}
      <img src='${imageUrl}'></img>`;

    document.querySelector(".container").appendChild(card);
  }
}

async function displayDogImage(breed) {
  const { message } = await fetchAPIData(`https://dog.ceo/api/breed/${breed}
/images/random`);

  return message;
}

document.addEventListener("DOMContentLoaded", displayDogs);
