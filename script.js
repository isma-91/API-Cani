const select = document.getElementById('breeds');
const container = document.getElementById('container');

async function generateSelectOptions() {
  const response = await fetch('https://dog.ceo/api/breeds/list/all');
  const breeds = await response.json();
  const breedKeys = Object.keys(breeds.message);

  breedKeys.forEach(breed => {
    const option = document.createElement('option');
    option.classList.add('option');
    option.value = breed;
    option.textContent = breed;
    select.appendChild(option);
  });
}

async function filterBreeds(data) {
  const response = await fetch(`https://dog.ceo/api/breed/${data}/images`);
  const breedsImgs = await response.json();
  const imgLinks = Object.values(breedsImgs.message);

  return imgLinks;
}

async function generateCards(data, title) {
  const card = await data.forEach(img => {
    container.innerHTML += `
    <div class="rounded-xl shadow-xl text-xl  h-[200px] w-[200px] overflow-hidden">
      <img class="h-[100%] w-[100%]" src="${img}" alt="${title}">
    </div>
    `;
  });
}

generateSelectOptions();

select.addEventListener('change', async function (e) {
  const selected = e.target.value;
  const images = await filterBreeds(selected);
  container.innerHTML = '';

  generateCards(images, selected);
});
