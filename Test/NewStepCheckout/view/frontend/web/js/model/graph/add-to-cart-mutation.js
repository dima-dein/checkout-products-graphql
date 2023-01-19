define([], function () {
    'use strict';

    return {
        ADD_SIMPLE_PRODUCTS_TO_CART: function (
            cartId,
            productSku
        ) {
            let query = `mutation{
                  addSimpleProductsToCart(
                    input: {
                      cart_id: "${cartId}"
                      cart_items: [
                        {
                          data: {
                            quantity: 1
                            sku: "${productSku}"
                          }
                        }
                      ]
                    }
                  ) {
                    cart {
                      items {
                        id
                        product {
                          name
                          sku
                        }
                        quantity
                      }
                    }
                  }
                }`;

            return query;
        }
    }
})
