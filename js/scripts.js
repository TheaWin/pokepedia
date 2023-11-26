let pokemonRepository = (function() {
    let pokemonList = [
      {
        id: '0001',
        name: 'Bulbasaur',
        height: 2,
        types: ['grass', 'poison']
      },
      {
        id: '0002',
        name: 'Ivysaur',
        height: 3,
        types: ['grass', 'poison']
      },
      {
        id: '0003',
        name: 'Venusaur',
        height: 6,
        types: ['grass', 'poison']
      }
    ];
  
    return {
      getAll: function() {
        return pokemonList;
      },
      // add conditional to add in only the correct type
      add: function(pokemon) {
        if (typeof pokemon === 'object' && "name" in pokemon && "height" in pokemon) {
          pokemonList.push(pokemon);
        } else {
          console.log("Pokemon is not correct");
        }
      },
      //added showDetails function
      showDetails: function(pokemon) {
        console.log(`id: ${pokemon.id}, name: ${pokemon.name}, height: ${pokemon.height}, types: ${pokemon.types}`);
      },
      
      //addListItem for DOM Manipulation
      addListItem: function(pokemon) {
        let pokeList = document.querySelector('.pokemon-list');
        //created buttons for each pokemon
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('button');
        //add an eventListener to the button that will use showDetails function
      button.addEventListener('click', function() {
        pokemonRepository.showDetails(pokemon);
      });
        listItem.appendChild(button);
        pokeList.appendChild(listItem);
      }
    };
  })();
  
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });