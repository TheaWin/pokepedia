let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  return {
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
      pokemonRepository.loadDetails(pokemon).then(function () {
        console.log(pokemon);
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
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      }).catch(function(e) {
        console.error(e);
      });
    }
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});
});