define([
    'jquery',
    'ko',
    'mage/url',
    'Magento_Checkout/js/model/quote',
    'Magento_Checkout/js/action/get-totals',
    'Test_NewStepCheckout/js/model/graph/add-to-cart-mutation',
], function (
    $,
    ko,
    mageUrl,
    quote,
    getTotals,
    addToCart
) {
    'use strict';

    /**
     * Add product to cart via GraphQL query, based on SKU
     */
    return function (productSku) {
        // QraphQL cart mutation query, Quote id is equal to cart id
        let addItemToCartMutation = addToCart.ADD_SIMPLE_PRODUCTS_TO_CART(quote.getQuoteId(), productSku)

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
