const assert = require('assert'),
  User = require('../models/user'),
  Group = require('../models/group'),
  Product = require('../models/Product'),
  Cart = require('../models/cart'),
  Promotion = require('../models/promotion'),
  {
    rules,
  } = require('../models/promotion-validation')


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

  describe('promotion rules testing', () => {
    it('should invalid when daterange wrong', () => {
      const promotion = new Promotion(new Date(2019, 12, 20), new Date(2018, 12, 2))
      const validDateRange = rules.find(c => c.name == 'validDateRange');
      assert.equal(validDateRange({
        promotion
      }), false)
    })

    it('should valid when match user group', () => {
      const promotion = new Promotion(new Date(2019, 12, 20), new Date(2018, 12, 2), Group.REGISTER)
      const validUserGroup = rules.find(c => c.name == 'validUserGroup');
      const fakeUser = new User('cuong', Group.REGISTER);
      assert.equal(validUserGroup({
        promotion,
        user: fakeUser
      }), true)
    })

    it('should valid when match color and subtotal', () => {
      const promotion = new Promotion(new Date(2019, 12, 20), new Date(2018, 12, 2), Group.REGISTER, 10, 'Blue', 100)
      const validColorAndSubtotal = rules.find(c => c.name == 'validColorAndSubtotal');
      
      const cart = new Cart();
      const fakeUser = new User('cuong', Group.REGISTER);
      fakeUser.cart = cart;
      cart.user = fakeUser;
      fakeUser.addProduct(new Product('Mac', 'Blue', 100), 2);
      fakeUser.addProduct(new Product('Mac', 'Green', 100), 1);

      assert.equal(validColorAndSubtotal({
        promotion,
        user: fakeUser
      }), true)
    })
  })

  describe('promotion testing', () => {
    it('should get right total from user\'cart without promotion', () => {
      const cart = new Cart();
      const user = new User('John Doe 1', Group.GOLD, 'john.doe@example.com', cart);
      const iphoneSliver = new Product('Iphone', 'Sliver', 999);
      const iphoneBlack = new Product('Iphone', 'Black', 899);

      user.cart = cart;
      user.addProduct(iphoneSliver, 2)
      user.addProduct(iphoneBlack, 1)

      assert.equal(user.cart.getTotalPrice(), 2897) // 999 * 2 + 899 = 2897
    })

    it('should get right total from user\'cart with promotion', () => {
      const cart = new Cart();
      const user = new User('John Doe 1', Group.GOLD, 'john.doe@example.com');

      const iphoneSliver = new Product('Iphone', 'Sliver', 999);
      const iphoneBlack = new Product('Iphone', 'Black', 899);

      user.cart = cart;
      cart.user = user;

      user.addProduct(iphoneSliver, 2)
      user.addProduct(iphoneBlack, 1)

      const promotion = new Promotion(new Date(2018, 11, 20), new Date(2018, 12, 20), Group.GOLD, 50, 'Black',
        1500)
      assert.equal(user.cart.getTotalPrice(promotion), 2847) // 999 * 2 + 899 = 2897 - 50(discount) = 2847
    })
  })
});