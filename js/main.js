const App = {
  data() {
    return {
      API: `https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses`,
      catalogUrl: "/catalogData.json",
      cartUrl: "/getBasket.json",
      products: [],
      cartItems: [],
      imgCart: "https://placehold.it/50x100",
      imgCatalog: "https://placehold.it/200x150",
      userInput: "",
      openCart: false,
    };
  },
  computed: {
    filtered() {
      return this.products.filter((el) =>
        new RegExp(this.userInput, "i").test(el.product_name)
      );
    },
  },
  methods: {
    getJson(url) {
      return fetch(url).then((result) => result.json());
    },
    addProduct(product) {
      this.getJson(`${this.API}/addToBasket.json`).then((data) => {
        if (data.result) {
          let find = this.cartItems.find(
            (el) => el.id_product === product.id_product
          );
          if (find) {
            find.quantity++;
          } else {
            let prod = Object.assign({ quantity: 1 }, product);
            this.cartItems.push(prod);
          }
        }
      });
    },
    removeProduct(product) {
      this.getJson(`${this.API}/deleteFromBasket.json`).then((data) => {
        if (data.result) {
          if (product.quantity > 1) {
            product.quantity--;
          } else {
            this.cartItems.splice(this.cartItems.indexOf(product), 1);
          }
        }
      });
    },
    min(product) {
      this.getJson(`${this.API}/deleteFromBasket.json`).then((data) => {
        if (data.result) {
          if (product.quantity > 1) {
            product.quantity--;
          } 
        }
      });
    },
  },
  mounted() {
    this.getJson(`${this.API + this.catalogUrl}`).then((data) => {
      for (let el of data) {
        this.products.push(el);
      }
    });
    this.getJson(`getProducts.json`).then((data) => {
      for (let el of data) {
        this.products.push(el);
      }
    });
    this.getJson(`${this.API + this.cartUrl}`).then((data) => {
      for (let el of data.contents) {
        this.cartItems.push(el);
      }
    });
  },
};

Vue.createApp(App).mount("#app");
