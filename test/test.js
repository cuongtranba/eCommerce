const assert = require('assert'),
  User = require('../models/user'),
  Group = require('../models/group'),
  Product = require('../models/Product'),
  Cart = require('../models/cart')


describe('shopping cart testing', () => {
  describe('cart testing', () => {
    it('should add product to user\'s cart', () => {
      const cart = new Cart();
      const user = new User('John Doe 1', Group.GOLD, 'john.doe@example.com', cart);
      const product = new Product('Iphone', 'Sliver', 999)
      user.cart = cart;
      user.addProduct(product, 2)
      assert.equal(user.cart.products.length, 2)
    })

    it('should remove all product from user\'s cart', () => {
      const cart = new Cart();
      const user = new User('John Doe 1', Group.GOLD, 'john.doe@example.com', cart);
      const product = new Product('Iphone', 'Sliver', 999)
      user.cart = cart;
      user.addProduct(product, 3)
      user.removeProduct('Iphone')
      assert.equal(user.cart.products.length, 0)
    })

    it('should update product quantity from user\'s cart', () => {
      const cart = new Cart();
      const user = new User('John Doe 1', Group.GOLD, 'john.doe@example.com', cart);
      const product = new Product('Iphone', 'Sliver', 999)
      user.cart = cart;
      user.addProduct(product, 5)
      user.removeProductQuantity('Iphone', 3)
      assert.equal(user.cart.products.length, 2)
    })

  });
});