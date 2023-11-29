let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  return {

    showModal: function (pokemon) {
      let modalContainer = document.querySelector('#modal-container');
      //clear all existing content
      modalContainer.innerHTML = '';
      //created a modal to display info
      let modal = document.createElement('div');
      //assigning class to new element
      modal.classList.add('modal');

      //create close button
      let closeButtonElement = document.createElement('button');
      //assign class
      closeButtonElement.classList.add('modal-close');
      //adding text to the button
      closeButtonElement.innerText = 'Close';
      //assigning action to the button
      closeButtonElement.addEventListener('click', pokemonRepository.hideModal);

      //create heading in modal for the pokemon name
      let titleElement = document.createElement('h1');
      titleElement.innerText = pokemon.name;

      //create paragraph in modal for the pokemon description
      let contentElement = document.createElement('p');
      contentElement.innerText = `id: #${pokemon.id}
      height: ${pokemon.height}
      types: ${pokemon.types}`

      //create pokemon image in modal
      let imageElement = document.createElement('img');
      imageElement.classList.add('modal-img');
      imageElement.src = pokemon.imageUrl

      modal.appendChild(closeButtonElement);
      modal.appendChild(titleElement);
      modal.appendChild(contentElement);
      modal.appendChild(imageElement);
      modalContainer.appendChild(modal);

      //added the class .is-visible to make it visible and interactive
      modalContainer.classList.add('is-visible');
    },

    hideModal: function () {
      let modalContainer = document.querySelector('#modal-container');
      //remove the class .is-visible to make it disappear/hidden
      modalContainer.classList.remove('is-visible');
    },

    getAll: function () {
      return pokemonList;
    },

    // add conditional to add in only the correct type
    add: function (pokemon) {
      if (typeof pokemon === 'object' && "name" in pokemon) {
        pokemonList.push(pokemon);
      } else {
        console.log("Pokemon is not correct");
      }
    },

    //added showDetails function
    showDetails: function (pokemon) {
      //
      pokemonRepository.loadDetails(pokemon).then(function () {
        pokemonRepository.showModal(pokemon);
      });
    },

    //addListItem for DOM Manipulation
    addListItem: function (pokemon) {
      let pokeList = document.querySelector('.pokemon-list');
      //created buttons for each pokemon
      let listItem = document.createElement('li');
      let button = document.createElement('button');
      button.innerText = pokemon.name;
      button.classList.add('button');
      //add an eventListener to the button that will use showDetails function
      button.addEventListener('click', function () {
        pokemonRepository.showDetails(pokemon);
      });
      listItem.appendChild(button);
      pokeList.appendChild(listItem);
    },

    //promise function
    loadList: function () {
      return fetch(apiUrl).then(function (response) {
        return response.json();
      }).then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          pokemonRepository.add(pokemon);
        });
      }).catch(function (e) {
        console.error(e);
      })
    },

    loadDetails: function (item) {
      let url = item.detailsUrl;
      return fetch(url).then(function (response) {
        return response.json();
      }).then(function (details) {
        item.id = details.id;
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types.map (function (type) {
          return type.type.name});
        pokemonRepository.showModal (item);
      }).catch(function (e) {
        console.error(e);
      });
    }
  };
})();

window.addEventListener('keydown', (e) => {
  let modalContainer = document.querySelector('#modal-container');
  if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
    pokemonRepository.hideModal();
  }
});

let modalContainer = document.querySelector('#modal-container');
modalContainer.addEventListener('click', (e) => {
  let target = e.target;
  if (target === modalContainer) {
    pokemonRepository.hideModal();
  }
})

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
