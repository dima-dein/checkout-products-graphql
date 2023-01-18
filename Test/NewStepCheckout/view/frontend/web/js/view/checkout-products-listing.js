define([
    'uiComponent',
    'ko',
    'underscore',
    'jquery',
    'Magento_Checkout/js/model/quote',
    'Test_NewStepCheckout/js/view/checkout-add-to-cart',
    'mage/url',
    'priceUtils'
], function (
    uiComponent,
    ko,
    _,
    $,
    quote,
    addToCart,
    mageUrl,
    priceUtils
) {
    'use script';

    return uiComponent.extend({
        defaults: {
            template: 'Test_NewStepCheckout/view/checkout-products-listing',
            productListing: ko.observableArray(),
        },

        /**
         * Get category on load
         */
        initialize: function () {
            this._super();
            this.requestCategory();
        },

        /**
         * Get category by ID, products number - request certain amount of products in alphabetical order
         * @param categoryId
         * @param productsNumber
         */
        requestCategory: function (categoryId = 3, productsNumber = 8) {
            let requestQuery = `{
            products(
                filter: {category_id: {eq: "${categoryId}"}},
                sort: {name: ASC},
                pageSize: ${productsNumber},
                currentPage: 1
            ) {
                total_count
                items {
                    name
                    sku
                    url_key
                    small_image {
                        url
                        label
                    }
                    price_range {
                        minimum_price {
                            regular_price {
                                value
                                currency
                            }
                            final_price {
                                value
                                currency
                            }
                            discount {
                                amount_off
                                percent_off
                            }
                        }
                        maximum_price {
                            regular_price {
                                value
                                currency
                            }
                            final_price {
                                value
                                currency
                            }
                            discount {
                                amount_off
                                percent_off
                            }
                        }
                    }
                }
            }
        }`;

            $.ajax({
                method: "GET",
                url: mageUrl.build('graphql?query=') + requestQuery,
                contentType: "application/json",
                success: function (response) {
                    if (_.isEmpty(response.data.products.items)) { // check if data not empty
                        return false;
                    }
                    this.productListing(response.data.products.items); // set data to observable array
                }.bind(this),
                error: function (err) {
                    console.log(err);
                    return false;
                }
            });
        },

        /**
         * Trigger add to cart action event, requires SKU
         * @param sku
         */
        addProductToCart: function (sku) {
            if (_.isEmpty(sku)) return;

            addToCart(sku);
        },

        /**
         * Format number according to locale price format
         * @param price
         * @returns {*}
         */
        formatPrice: function (price) {
            return priceUtils.formatPrice(price, quote.getPriceFormat()) // data to a proper currency format
        }
    })
})
