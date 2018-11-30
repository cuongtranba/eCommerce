class Cart {
  constructor() {
    this.products = [];
    this.user = null;
  }

  getTotalPrice(promotions) {
    const total = this.products.reduce((acc, cur) => {
      return acc + cur.price
    }, 0);
    return total;
  }

  isPromotionValid(promotion) {
    
  }

}

module.exports = Cart