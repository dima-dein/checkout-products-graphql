define([
    'ko',
    'uiComponent',
    'underscore',
    'Magento_Checkout/js/model/step-navigator'
], function (
    ko,
    Component,
    _,
    stepNavigator
) {
    'use strict';

    return Component.extend({
        defaults: {
            template: 'Test_NewStepCheckout/view/checkout-products-step'
        },

        id: 'productStep',
        title: 'Checkout Products',
        isVisible: ko.observable(true),

        /**
         * Add new checkout step
         * @returns {*}
         */
        initialize: function () {
            this._super();

            stepNavigator.registerStep(
                this.id,
                null, this.title,
                this.isVisible,
                _.bind(this.navigate, this),
                1
            );

            return this;
        },

        /**
         * Set new step as a default
         */
        navigate: function () {
            stepNavigator.navigateTo(this.id);
        },

        /**
         * Used in template, switches step to next in stepNavigator queue
         */
        navigateToNextStep: function () {
            stepNavigator.next();
        }
    });
});
