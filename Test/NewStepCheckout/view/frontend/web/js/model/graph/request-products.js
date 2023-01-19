define([], function () {
    'use strict';

    return {
        GET_PRODUCTS_BY_CATEGORY_ID: function (
            categoryId = 3,
            productsNumber = 8
        ) {
            let query = `{
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

            return query;
        }
    }
})
