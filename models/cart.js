class Cart {
  constructor() {
    this.products = [];
    this.user = null;
  }

  getTotalPrice(promotion) {
    const total = this.products.reduce((acc, cur) => {
      return acc + cur.price
    }, 0);

    if (promotion == null) {
      return total;
    }
    return total - promotion.getDiscount(this.user);
  }
}

module.exports = Cart