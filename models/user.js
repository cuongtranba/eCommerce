class User {
  constructor(name, group, email) {
    this.name = name;
    this.group = group;
    this.email = email;
    this.cart = null;
  }

  addProduct(product, quantity) {
    [...Array(quantity).keys()].forEach(e => {
      this.cart.products.push(product);
    })
  }

  removeProductQuantity(name, quantity) {
    let count = Math.abs(quantity);
    for (let i = 0; i < this.cart.products.length; i++) {
      const product = this.cart.products[i];
      if (count == 0) {
        return;
      }
      if (product.name == name) {
        this.cart.products.splice(i, 1);
        count--;
      }
    }
  }

  removeProduct(name) {
    this.cart.products = this.cart.products.filter(c => c.name != name);
  }

  toString() {
    return `name: ${this.name} - group: ${this.group} - email: ${this.email}`
  }
}

module.exports = User