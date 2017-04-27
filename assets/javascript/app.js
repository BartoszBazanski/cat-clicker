var cats = [
  {
    name: "Alex",
    imageUrl: 'kitten_1.jpg',
    clicks: 0
  },
  {
    name: "Puff",
    imageUrl: 'kitten_2.jpg',
    clicks: 0
  },
  {
    name: "Meow",
    imageUrl: 'kitten_1.jpg',
    clicks: 0
  },
  {
    name: "Rix",
    imageUrl: 'kitten_2.jpg',
    clicks: 0
  },
  {
    name: "Dori",
    imageUrl: 'kitten_1.jpg',
    clicks: 0
  },
];
var catList = [];
var list = document.querySelector('.list');
var itemList;
cats.forEach(function(cat, id) {
  itemList = document.createElement('li');
  itemList.id = id;
  itemList.textContent = cat.name;

  itemList.addEventListener('click', (function(cats, id) {
    return function() {
      document.querySelector('h1').textContent = cats[id].name;
      document.querySelector('img').id = id;
      document.querySelector('img').src = 'assets/images/' + cats[id].imageUrl;
      document.querySelector('span').textContent = cats[id].clicks;

      console.log(cats[id]);
    };
  })(cats, id));
  list.append(itemList);
});

function createCatFigure(cat) {
  return '<figure class="fl-r w-50p no-margin p-20">'+
          '<header>'+
            '<h1>'+ cat.name +'</h1>'+
          '</header>'+
          '<img src="assets/images/'+ cat.imageUrl +'" alt="Picture of the cat">'+
          '<figcaption>'+
            '<p>Clicker counter: <span>0</span></p>'+
          '</figcaption>'+
         '</figure>';
}
document.querySelectorAll('figure h1').forEach(function(title, id) {
  console.log(id, title);
  title.innerText = catNames[id];
});
var cats = document.querySelectorAll('img');

// cats.forEach(function(cat) {
//   cat.addEventListener('click', function(e) {
//     var counterContainer = this.parentNode.querySelector('span');
//     var counter = parseInt(counterContainer.innerText);
//     counter++;
//     this.parentNode.querySelector('span').innerText = counter;
//   });
// });
