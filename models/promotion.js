const BasePromotion = require('./base-promotion');
const {
  excuteRules,
  rules
} = require('./promotion-validation');
class Promotion extends BasePromotion {
  /**
   * 
   * @param {Date} dateFrom
   * @param {Date} dateTo 
   * @param {String} userGroup 
   * @param {Number} discount 
   * @param {String} color
   * @param {Number} subtotal
   */
  constructor(dateFrom, dateTo, userGroup, discount, color = null, subtotal = null) {
    super()
    this.dateFrom = dateFrom;
    this.dateTo = dateTo;
    this.userGroup = userGroup;
    this.discount = discount;
    this.color = color;
    this.subtotal = subtotal
  }
  isValid(user) {
    return excuteRules(rules, {
      promotion: this,
      user
    });
  }

  getDiscount(user) {
    if (this.isValid(user)) {
      return this.discount;
    }
    return 0;
  }
}

module.exports = Promotion