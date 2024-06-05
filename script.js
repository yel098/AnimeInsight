const hamsterLoading = document.querySelector('.hamster-loading');
const astronautLoading = document.querySelector('.astronaut-loading');

const mainContent = document.querySelector('.main-content');
const topAnimeList = document.getElementById('top-anime-list');
const animeSearchForm = document.getElementById('anime-search-form');
const animeResults = document.getElementById('anime-results');

document.addEventListener('DOMContentLoaded', () => {
    getTopAnime();
    animeSearchForm.addEventListener('submit', searchAnime);
});

async function getTopAnime(){
    try {
        const response = await fetch('https://api.jikan.moe/v4/top/anime');
        if (!response.ok) {
            throw new Error("Anime Not Found");
        }

        const data = await response.json();

        const topAnime = data.data.slice(0, 5);

        topAnime.forEach(anime => {
            const animeLink = document.createElement('a');
            animeLink.href = anime.url;
            animeLink.target = '_blank';
            animeLink.rel = 'noreferrer';
            animeLink.textContent = anime.title;
            topAnimeList.appendChild(animeLink);
        });

        hamsterLoading.style.display = 'none';
        mainContent.style.display = 'block';
    } catch (error) {
        console.error('Error fetching top anime:', error);
    }
};

async function searchAnime(e) {
    e.preventDefault();

    try {
        const animeName = document.getElementById('anime-name').value;

        animeResults.innerHTML = '';
        astronautLoading.style.display = 'block';

        const response = await fetch(`https://api.jikan.moe/v4/anime?q=${animeName}&sfw`);
        if (!response.ok) {
            throw new Error("Anime Not Found");
        }

        const data = await response.json();
        
        astronautLoading.style.display = 'none';

        animeResults.innerHTML = '';

        data.data.forEach(anime => {

            const animeContainer = document.createElement('div');
            animeContainer.classList.add('anime-container');

            const animeLink = document.createElement('a');
            animeLink.href = anime.url;
            animeLink.target = '_blank';
            animeLink.rel = 'noreferrer';

            const imgElement = document.createElement('img');
            imgElement.src = anime.images.jpg.large_image_url;
            imgElement.alt = anime.title;
            animeLink.appendChild(imgElement);

            const titleElement = document.createElement('h2');
            titleElement.textContent = anime.title;

            animeContainer.appendChild(animeLink);
            animeContainer.appendChild(titleElement);

            animeResults.appendChild(animeContainer);
        });

    } catch (error) {
        console.error('Error searching anime:', error);
    }
}
