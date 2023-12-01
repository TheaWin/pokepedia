let pokemonRepository=function(){let t=[];return{showModal:function(t){let o=$(".modal-body"),e=$(".modal-title");o.html(""),e.html("");let n=$("<h1>"+t.name.charAt(0).toUpperCase()+t.name.slice(1)+"</h1>"),i=$("<img>").addClass("modal-img float-right").attr("src",t.imageUrl),l=$("<p>").addClass("text-left").html(`id: #${t.id}<br>height: ${t.height}<br>types: ${t.types}`);e.append(n),o.append(i),o.append(l)},getAll:function(){return t},add:function(o){"object"==typeof o&&"name"in o?t.push(o):console.log("Pokemon is not correct")},showDetails:function(t){pokemonRepository.loadDetails(t).then(function(){pokemonRepository.showModal(t)})},addListItem:function(t){let o=$(".row"),e=$("<li></li>");e.addClass("list-group-item col-12 col-md-4");let n=$("<button>");n.text(t.name.charAt(0).toUpperCase()+t.name.slice(1)),n.addClass("btn btn-block btn-style button-style"),n.attr("data-toggle","modal"),n.attr("data-target","#modal"),n.on("click",function(){pokemonRepository.showDetails(t)}),e.append(n),o.append(e)},loadList:function(){return fetch("https://pokeapi.co/api/v2/pokemon/?limit=150").then(function(t){return t.json()}).then(function(t){t.results.forEach(function(t){let o={name:t.name,detailsUrl:t.url};pokemonRepository.add(o)})}).catch(function(t){console.error(t)})},loadDetails:function(t){return fetch(t.detailsUrl).then(function(t){return t.json()}).then(function(o){t.id=o.id,t.imageUrl=o.sprites.front_default,t.height=o.height,t.types=o.types.map(function(t){return t.type.name}),pokemonRepository.showModal(t)}).catch(function(t){console.error(t)})}}}();pokemonRepository.loadList().then(function(){pokemonRepository.getAll().forEach(function(t){pokemonRepository.addListItem(t)})});let form=$(".form-inline"),input=$("<input>").addClass("form-control mr-2 my-1").attr({type:"text",placeholder:"Search","aria-label":"Search"});function searchFunction(){var t,o,e,n;t=input.val().toLowerCase(),(o=$(".list-group-item")).each(function(){(e=(n=$(this).find(".button-style")).text()).toLowerCase().indexOf(t)>-1?$(this).show():$(this).hide()})}form.append(input),input.on("keyup",searchFunction);let mybutton=document.getElementById("btn-top");function backToTop(){document.body.scrollTop=0,document.documentElement.scrollTop=0}window.onscroll=function(){document.body.scrollTop>20||document.documentElement.scrollTop>20?mybutton.style.display="block":mybutton.style.display="none"},mybutton.addEventListener("click",backToTop);