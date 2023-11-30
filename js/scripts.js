let pokemonRepository = (function() {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  return {

    showModal: function(pokemon) {
      let modalBody = $('.modal-body');
      let modalTitle = $('.modal-title');
      //clear all existing content
      modalBody.html('');
      modalTitle.html('');

      let titleElement = $('<h1>' + pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1) + '</h1>');
      let imageElement = $('<img>')
        .addClass('modal-img float-right')
        .attr('src', pokemon.imageUrl);
      let contentElement = $('<p>')
        .html(`id: #${pokemon.id}<br>height: ${pokemon.height}<br>types: ${pokemon.types}`);

      modalTitle.append(titleElement);
      modalBody.append(imageElement);
      modalBody.append(contentElement);
    },

    getAll: function() {
      return pokemonList;
    },

    // add conditional to add in only the correct type
    add: function(pokemon) {
      if (typeof pokemon === 'object' && "name" in pokemon) {
        pokemonList.push(pokemon);
      } else {
        console.log("Pokemon is not correct");
      }
    },

    //added showDetails function
    showDetails: function(pokemon) {
      //
      pokemonRepository.loadDetails(pokemon).then(function() {
        pokemonRepository.showModal(pokemon);
      });
    },

    //addListItem for DOM Manipulation
    addListItem: function(pokemon) {
      let pokeList = $('.row');
      //created buttons for each pokemon
      let listItem = $('<li></li>');
      listItem.addClass('list-group-item col-12 col-md-4');
      let button = $('<button>');
      button.text(pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1));
      button.addClass('btn btn-block btn-style button-style');
      button.attr('data-toggle', 'modal');
      button.attr('data-target', '#modal');
      button.on('click', function() {
        pokemonRepository.showDetails(pokemon);
      });
      listItem.append(button);
      pokeList.append(listItem);
    },

    //promise function
    loadList: function() {
      return fetch(apiUrl).then(function(response) {
        return response.json();
      }).then(function(json) {
        json.results.forEach(function(item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          pokemonRepository.add(pokemon);
        });
      }).catch(function(e) {
        console.error(e);
      })
    },

    loadDetails: function(item) {
      let url = item.detailsUrl;
      return fetch(url).then(function(response) {
        return response.json();
      }).then(function(details) {
        item.id = details.id;
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types.map(function(type) {
          return type.type.name
        });
        pokemonRepository.showModal(item);
      }).catch(function(e) {
        console.error(e);
      });
    }
  };
})();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});