var model = {
  currentCat: null,
  data: [
    {
      name: "Alex",
      imageUrl: 'kitten_1.jpg',
      clicksCounter: 0
    },
    {
      name: "Puff",
      imageUrl: 'kitten_2.jpg',
      clicksCounter: 0
    },
    {
      name: "Meow",
      imageUrl: 'kitten_1.jpg',
      clicksCounter: 0
    },
    {
      name: "Rix",
      imageUrl: 'kitten_2.jpg',
      clicksCounter: 0
    },
    {
      name: "Dori",
      imageUrl: 'kitten_1.jpg',
      clicksCounter: 0
    },
  ],
};

var controller = {
  init: function() {
    model.currentCat = model.data[0];

    catListView.init();
    catDisplayView.init();
    adminPanelView.init();
  },

  setCurrentCat: function(cat) {
    model.currentCat = cat;
  },

  incrementCounter: function() {
    model.currentCat.clicksCounter++;
    catDisplayView.updateCounter();
  },

  getAllCats: function() {
    return model.data;
  },

  getCurrentCat: function() {
    return model.currentCat;
  }
};

var catListView = {
  init: function() {
    this.cats = controller.getAllCats();

    this.render();
  },
  render: function() {
    var list = document.querySelector('.list');
    var itemList;
    this.cats.forEach(function(cat, id) {
      itemList = document.createElement('li');
      itemList.textContent = cat.name;

      itemList.addEventListener('click', (function(copyCat) {
        return function() {
          controller.setCurrentCat(copyCat);
          catDisplayView.render();
        };
      })(cat));

      list.append(itemList);
    });
  },
};

var catDisplayView = {
  init: function() {
    this.catDisplay = document.querySelector('#catDisplay');
    this.title = this.catDisplay.querySelector('h1');
    this.counter = this.catDisplay.querySelector('span');
    this.image = this.catDisplay.querySelector('img');
    this.image.addEventListener('click', function() {
      controller.incrementCounter();
    });

    this.render();
  },
  render: function() {
    this.cat = controller.getCurrentCat();
    this.title.textContent = this.cat.name;
    this.image.src = 'assets/images/' + this.cat.imageUrl;

    this.updateCounter();
  },
  updateCounter: function() {
    this.counter.textContent = this.cat.clicksCounter;
  }
};

var adminPanelView = {
  init: function() {
    this.adminButton = document.querySelector('.adminButton');
    this.adminPanel = document.querySelector('.adminPanel');

    this.adminButton.addEventListener('click', function() {
      adminPanelView.render();
    });
  },
  render: function() {
    this.cat = controller.getCurrentCat();
    this.editCatName = document.createElement('input');
    this.editCatUrl = document.createElement('input');
    this.editCatCounter = document.createElement('input');
    this.editCatName.value = this.cat.name;
    this.editCatUrl.value = this.cat.imageUrl;
    this.editCatCounter.value = this.cat.clicksCounter;
    this.adminPanel.append(this.editCatName, this.editCatUrl, this.editCatCounter);
  },
  clear: function() {
    this.adminPanel.innerHTML = '';
  }
}

controller.init();
