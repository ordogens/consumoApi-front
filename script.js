document.getElementById('Load').addEventListener('click', fetchCharacters)

function fetchCharacters () {
    const urlApi = 'https://rickandmortyapi.com/api/character'

    fetch(urlApi)
    .then(response => response.json())
    .then(data => {
        const characterContainer = document.getElementById('characters');
        characterContainer.innerHTML = '';

        data.results.forEach(character => {
            const characterElement = document.createElement('div')
            characterElement.innerHTML = `
            <h2>${character.name}</h2>
            <image class='img' src = '${character.image}'> </image>
            <p> ${character.species}</p>
            <p> ${character.status}</p>
            `
            characterContainer.appendChild(characterElement);
        });
    })
    .catch(err => console.error("error", err));
}
