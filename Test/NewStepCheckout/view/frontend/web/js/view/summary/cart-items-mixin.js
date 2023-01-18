define([
    'ko',
    'Magento_Checkout/js/model/totals',
    'Magento_Customer/js/customer-data'
], function (
    ko,
    totals,
    customerData
) {
    'use strict';

    var mixin = {
        cartItemsNumber: ko.observable(),
        defaults: {
            template: "Test_NewStepCheckout/summary/cart-items"
        },

        /**
         * Update items number from Quote and Totals
         */
        initialize: function () {
            this._super();

            this.cartItemsNumber(this.getCartSummaryItemsCount()); // set observable variable used in template

            totals.totals.subscribe(function (items) {
                customerData.reload(['cart'], true); // update minicart section
                this.cartItemsNumber(items.items_qty); // update items number in summary sidebar
            }.bind(this));
        }
    };

    return function (target) {
        return target.extend(mixin);
    };
});
