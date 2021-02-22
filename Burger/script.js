class Param {
  name = "";
  price = 0;
  calories = 0;

  constructor(el) {
    this.name = el.value;
    ({ price: this.price, cal: this.calories } = Burger.burgerParams[this.name])
  }
}

class Burger {
  static burgerParams = {
    small: {
      price: 50,
      cal: 20,
    },
    big: {
      price: 100,
      cal: 40,
    },
    salad: {
      price: 20,
      cal: 5,
    },
    cheese: {
      price: 10,
      cal: 20,
    },
    potato: {
      price: 15,
      cal: 10,
    },
    spices: {
      price: 15,
      cal: 0,
    },
    mayo: {
      price: 20,
      cal: 5,
    }
  };

  size = null;
  filling = null;
  addition = [];

  constructor(size, filling, addition) {
    this.size = new Param(this._select(size));
    this.filling = new Param(this._select(filling));
    this.addition = this._selectAll(addition).map((el) => new Param(el));
  }

  get price() {
    return this._sum('price');
  }

  get calories() {
    return this._sum('calories');
  }

  showSum(price, calories) {
    document.querySelector(price).textContent = this.price;
    document.querySelector(calories).textContent = this.calories;
  }

  _select(name) {
    return document.querySelector(`input[name="${name}"]:checked`);
  }

  _selectAll(name) {
    return [...document.querySelectorAll(`input[name="${name}"]:checked`)];
  }

  _sum(value) {
    let result = this.size[value] + this.filling[value];
    this.addition.forEach((add) => (result += add[value]));
    return result;
  }
}
