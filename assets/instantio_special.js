(function ($) {
    "use strict";

    // change checkout url base on product 
    // function updateCheckoutLink() {
    //     var instantio = document.getElementsByClassName('ins-content')[0];
    //     var instantio_content = instantio.querySelector('.woocommerce-cart-form');

    //     if (instantio_content) {
    //         var instantio_cart = instantio_content.querySelector('.ins-cart-content-wrap .ins-single-cart-wrap');

    //         // Check if the specific product ID exists within instantio_cart
    //         var productItem = instantio_cart.querySelector('.ins-single-cart-item[data-product-id="37096"]');
    //         var productItemTwo = instantio_cart.querySelector('.ins-single-cart-item[data-product-id="37096"]');

    //         if (productItem) {
    //             // Change the checkout button link if the product is in the cart
    //             var instantio_cart_btn = instantio_content.querySelector('.ins-cart-btns .checkout');
    //             if (instantio_cart_btn) {
    //                 instantio_cart_btn.href = 'https://portal.themefic.com/checkout/?add-to-cart=26178';
    //             }
    //         }

    //         if (productItemTwo) {
    //             // Change the checkout button link if the product is in the cart
    //             var instantio_cart_btn = instantio_content.querySelector('.ins-cart-btns .checkout');
    //             if (instantio_cart_btn) {
    //                 instantio_cart_btn.href = 'https://portal.themefic.com/checkout/?add-to-cart=26178';
    //             }
    //         }
    //     }
    // }

    // // Run the function on page load
    // updateCheckoutLink();

    // // Run the function when the cart is refreshed
    // $(document.body).on('wc_fragment_refresh', function () {
    //     updateCheckoutLink();
    // });

    $(document).on("added_to_cart", function (e) {
        e.preventDefault();

        // Get the active element which is the button that triggered the event
        var thisbutton = document.activeElement;

        // Get the product_id from the button's data attribute
        var product_id = $(thisbutton).data('product_id');
        $(document.body).trigger('.ins-empty-cart');
        console.log(thisbutton);
        console.log(product_id);
        $.ajax({
            url: instantio_themific_params.ajax_url, // WooCommerce AJAX URL
            type: 'POST',
            data: {
                action: 'clear_and_add_product_to_cart',
                product_id: product_id,
            },
            success: function (response) {
                console.log(response);
                if (response.success) {
                    $(document.body).trigger('wc_fragment_refresh');
                    // updateCheckoutLink();
                } else {
                    alert('Failed to update cart.');
                }
            },
            error: function () {
                alert('An error occurred. Please try again.');
            }
        });
    });



})(jQuery);