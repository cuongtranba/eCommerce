//this module to create the custom validations promotion base on the input

const validDateRange = ({
  promotion
}) => {
  if (promotion.dateFrom > promotion.dateTo) {
    return false;
  }
  return true;
}

const validUserGroup = ({
  promotion,
  user
}) => {
  if (user.group != promotion.userGroup) {
    return false
  }
  return true;
}

const validColorAndSubtotal = ({
  promotion,
  user
}) => {
  if (!promotion.color || !promotion.subtotal) {
    return true;
  }
  const totalPriceByColor = user.cart.products
    .filter(c => c.color == promotion.color)
    .reduce((acc, cur) => acc + cur.price, 0)
  if (totalPriceByColor > promotion.subtotal) {
    return true;
  }
  return false
}

const isInRange = ({
  promotion
}) => {
  const inRange = (promotion.dateFrom < new Date() && new Date() <= promotion.dateTo);
  return inRange;
}

/**
 * register new rule here
 */
const rules = [
  validDateRange,
  validUserGroup,
  validColorAndSubtotal,
  isInRange
]
/**
 * 
 * @param {Array} array array of function to validation rule
 * @param {Object} data data for validation method
 */
const excuteRules = (rules, data) => {
  rules.forEach(rule => {
    if (!rule(data)) {
      return false
    }
  });
  return true;
}

module.exports = {
  rules,
  excuteRules
}