class Promotion {
  constructor(dateFrom, dateTo, userGroup, discount, color, subtotal) {
    this.dateFrom = dateFrom;
    this.dateTo = dateTo;
    this.userGroup = userGroup;
    this.discount = discount;
    this.color = color;
    this.subtotal = subtotal
  }
}

module.exports = Promotion