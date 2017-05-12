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
      imageUrl: 'kitten_3.jpg',
      clicksCounter: 0
    },
    {
      name: "Rix",
      imageUrl: 'kitten_4.jpg',
      clicksCounter: 0
    },
    {
      name: "Dori",
      imageUrl: 'kitten_2.jpg',
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
    this.list = document.querySelector('.list');
    this.render();
  },
  render: function() {
    var list = this.list;
    var itemList;
    this.cats.forEach(function(cat, id) {
      itemList = document.createElement('li');
      itemList.classList.add('btn');
      itemList.textContent = cat.name;

      itemList.addEventListener('click', (function(copyCat) {
        return function() {
          controller.setCurrentCat(copyCat);
          catDisplayView.render();
          adminPanelView.clear();
        };
      })(cat));

      list.append(itemList);
    });
  },
  updateView: function() {
    this.clear();
    this.render();
  },
  clear: function() {
    this.list.innerHTML = '';
  }
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
    this.adminPanel = document.querySelector('.adminPanelView');

    this.adminButton.addEventListener('click', function() {
      adminPanelView.render();
    });

    this.editCatName = document.createElement('input');
    this.editCatUrl = document.createElement('input');
    this.editCatCounter = document.createElement('input');
    this.saveButton = document.createElement('button');
    this.saveButton.classList.add('btn', 'block', 'w-50p');
    this.saveButton.textContent = "Save";
    this.clearButton = document.createElement('button');
    this.clearButton.classList.add('btn', 'block', 'w-50p');
    this.clearButton.textContent = "Clear";
    this.clearButton.addEventListener('click', (function(view) {
      return function() {
        view.clear();
      }
    })(this));
  },
  render: function() {
    this.cat = controller.getCurrentCat();

    this.editCatName.value = this.cat.name;
    this.editCatUrl.value = this.cat.imageUrl;
    this.editCatCounter.value = this.cat.clicksCounter;
    this.adminPanel.append(this.editCatName, this.editCatUrl, this.editCatCounter, this.saveButton, this.clearButton);
    this.saveButton.addEventListener('click', (function(view) {
      return function() {
        controller.setCurrentCat(view.updateCat());
        catDisplayView.render();
        catListView.updateView();
        adminPanelView.clear();
      }
    })(this));
  },
  updateCat: function() {
    var cat = this.cat;
    cat.name = this.editCatName.value;
    cat.imageUrl = this.editCatUrl.value;
    cat.clicksCounter = this.editCatCounter.value;
    return cat;
  },
  collectCatInfo: function() {
    var updatedCat
  },
  clear: function() {
    this.adminPanel.innerHTML = '';
  }
}

controller.init();
