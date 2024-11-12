(function ($) {
    "use strict";

    function instantioThemific() {
        const cartDiv = document.querySelector('.ins-single-cart-wrap');
        const cartDiv_but = document.querySelector('.ins-cart-btns a.checkout');
        
        // console.log('instantioThemific call');

        if (cartDiv && cartDiv_but) { // Check if both cartDiv and cartDiv_but exist
            const childDivs = cartDiv.querySelectorAll(".ins-single-cart-item"); // Find all divs within cartDiv
            const childDivCount = childDivs.length;
            
            if (childDivCount > 1) {
                // Disable checkout button and show message
                cartDiv_but.setAttribute('disabled', 'true');
                cartDiv_but.textContent = 'Please remove one item from the cart';
                cartDiv_but.href = '#';
            } else if (childDivCount == 1) {
                // Enable checkout button and set the correct link for a single item
                const get_productId = childDivs[0].getAttribute("data-product-id");
                cartDiv_but.removeAttribute('disabled'); // Ensure the button is enabled
                cartDiv_but.textContent = 'Checkout'; // Reset text to 'Checkout'

                let thisProductVariationID = [];

                // console.log(get_productId);

                if (get_productId) {
                    $.ajax({
                        url: instantio_themific_params.ajax_url, // WordPress AJAX endpoint
                        type: 'GET',
                        data: {
                            action: 'get_cart_data'
                        },
                        success: function (response) {
                            if (response.success) {
                                const foundItem = response.data.find(item => item.product_id == get_productId);
                                const variationId = foundItem ? foundItem.variation_id : null;
								
                                if (variationId == '37098') {
                                    cartDiv_but.href = 'https://portal.themefic.com/checkout/?add-to-cart=26176';
                                } else if (variationId == '37102') {
									cartDiv_but.href = 'https://portal.themefic.com/checkout/?add-to-cart=26178';
                                }
								
								// console.log(variationId);

                            }
                        }
                    });
                }

            }
        } else {
            console.log("No .ins-single-cart-wrap or .checkout button found.");
        }
    }
	
	// Define instantioThemific globally
	window.instantioThemific = function () {
		// Your function code here
		// console.log("instantioThemific function called");
		// Include any console logs or functionality needed for your code here
	};



    window.onload = function () {
        instantioThemific();
    };


    // Listen for any AJAX completion globally
    $(document).ajaxComplete(function (event, xhr, settings) {
		    function instantioThemific() {
				const cartDiv = document.querySelector('.ins-single-cart-wrap');
				const cartDiv_but = document.querySelector('.ins-cart-btns a.checkout');

				// console.log('instantioThemific call');

				if (cartDiv && cartDiv_but) { // Check if both cartDiv and cartDiv_but exist
					const childDivs = cartDiv.querySelectorAll(".ins-single-cart-item"); // Find all divs within cartDiv
					const childDivCount = childDivs.length;

					if (childDivCount > 1) {
						// Disable checkout button and show message
						cartDiv_but.setAttribute('disabled', 'true');
						cartDiv_but.textContent = 'Please remove one item from the cart';
						cartDiv_but.href = '#';
					} else if (childDivCount == 1) {
						// Enable checkout button and set the correct link for a single item
						const get_productId = childDivs[0].getAttribute("data-product-id");
						cartDiv_but.removeAttribute('disabled'); // Ensure the button is enabled
						cartDiv_but.textContent = 'Checkout'; // Reset text to 'Checkout'

						let thisProductVariationID = [];

						// console.log(get_productId);

						if (get_productId) {
							$.ajax({
								url: instantio_themific_params.ajax_url, // WordPress AJAX endpoint
								type: 'GET',
								data: {
									action: 'get_cart_data'
								},
								success: function (response) {
									if (response.success) {
										const foundItem = response.data.find(item => item.product_id == get_productId);
										const variationId = foundItem ? foundItem.variation_id : null;

										if (variationId == '37098') {
											cartDiv_but.href = 'https://portal.themefic.com/checkout/?add-to-cart=26176';
										} else if (variationId == '37102') {
											cartDiv_but.href = 'https://portal.themefic.com/checkout/?add-to-cart=26178';
										}

										// console.log(variationId);

									}
								}
							});
						}

					}
				} else {
					console.log("No .ins-single-cart-wrap or .checkout button found.");
				}
			}
        // console.log(settings);

        if (settings.data == "id=1&action=ins_ajax_cart_reload") {
            // Call your function after the AJAX request is completed
            window.instantioThemific();
			instantioThemific();
            // console.log('Reload call ');
        }

        if (settings.data && settings.data.indexOf('action=ins_ajax_cart_item_remove') !== -1) {
            // Call your function
            window.instantioThemific();
			instantioThemific();
			setTimeout(function () {
				$('.ins-checkout-layout button[name="update_cart"]').trigger("click");
			}, 1000);
			// console.log('remove call ');
        }

        if (settings.data && settings.data.indexOf('action=ins_ajax_update_cart') !== -1) {
            // Call your function
            instantioThemific();
            // console.log('update call ');
        }

    });



})(jQuery);