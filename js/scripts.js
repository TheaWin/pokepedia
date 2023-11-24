// set of pokemon arrays
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

/* line 29: for loop to iterates over the objects in the arra
 line 30 & 31: declaring object name to look for specific values
line 31 & 32: using template literal to show result 
line 32: as well as adding conition within the loop
 */
for (let i = 0; i < pokemonList.length; i++) {
    let pokeName = pokemonList[i].name;
    let pokeHeight = pokemonList[i].height;
    document.write(`<p>${pokeName} 
      ${pokeHeight >= 4 ? `(height: ${pokeHeight} - Wow, that's big!` : `(height: ${pokeHeight}`})</p>`);
    
  }