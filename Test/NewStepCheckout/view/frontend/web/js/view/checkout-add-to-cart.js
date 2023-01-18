define([
    'jquery',
    'ko',
    'mage/url',
    'Magento_Checkout/js/model/quote',
    'Magento_Checkout/js/action/get-totals',
], function (
    $,
    ko,
    mageUrl,
    quote,
    getTotals
) {
    'use strict';

    /**
     * Add product to cart via GraphQL query, based on SKU
     */
    return function (productSku) {
        let cartId = quote.getQuoteId(), // Quote id is equal to cart id
            // QraphQL cart mutation query
            addItemToCartMutation = `mutation{
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

        $.ajax({
            method: "POST",
            url: mageUrl.build('graphql?'),
            data: JSON.stringify({
                query: addItemToCartMutation
            }),
            contentType: "application/json",
            success: function (response) {
                console.log(response);
                // Recalculate totals
                getTotals([], $.Deferred());
            },
            error: function (err) {
                console.log(err);
                return false;
            }
        });
    }
})
