# eCommerce
The basic eCommerce in nodejs


### Installation

require Node.js v8+

Install the dependencies and devDependencies and start the test.
```
$ npm install
$ npm run test
```

### Dependencies
- assert
- mocha

### TestCase
  #### shopping cart testing
  > NOTE: the **promotion testing** is the unit test which required in the assignment
  
    cart testing
      ✓ should add product to user's cart
      ✓ should remove all product from user's cart
      ✓ should update product quantity from user's cart
    promotion rules testing
      ✓ should invalid when daterange wrong
      ✓ should valid when match user group
      ✓ should valid when match color and subtotal
    **promotion testing**
      ✓ should get right total from user'cart without promotion
      ✓ should get right total from user'cart with promotion
