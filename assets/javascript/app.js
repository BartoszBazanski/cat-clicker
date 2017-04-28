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
var title = document.querySelector('h1');
var image = document.querySelector('img');
var counter = document.querySelector('span');
var catDisplay = document.querySelector('#catDisplay');
var itemList;

cats.forEach(function(cat, id) {
  itemList = document.createElement('li');
  itemList.id = id;
  itemList.textContent = cat.name;

  itemList.addEventListener('click', (function(cats, id) {
    return function() {
      if(catDisplay.classList.contains('hidden')) {
        catDisplay.classList.remove('hidden');
      }
      title.textContent = cats[id].name;
      image.id = id;
      image.src = 'assets/images/' + cats[id].imageUrl;
      counter.textContent = cats[id].clicks;
    };
  })(cats, id));
  list.append(itemList);
});

image.addEventListener('click', function() {
  cats[this.id].clicks++;
  counter.textContent = cats[this.id].clicks;
});
