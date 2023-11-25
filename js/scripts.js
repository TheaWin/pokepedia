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

pokemonList.forEach (function(poke) {
    if (poke.height >=4) {
        document.write (`<p>${poke.name} - (height: ${poke.height} - Wow, that's big!)</p>`);
    } else {
        document.write (`<p>${poke.name} - (height: ${poke.height})</p>`);
    }
    }
)