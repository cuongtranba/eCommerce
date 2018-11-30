class Product {
  constructor(name, color, price) {
    this.name = name;
    this.color = color;
    this.price = price;
  }

  toString() {
    console.log(`product name: ${this.name} - color:${this.color} - price:${this.price}`);
  }
}

module.exports = Product