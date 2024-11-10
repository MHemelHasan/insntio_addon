<?php
/**
 * Plugin Name: Instantio Themefic Special
 * Plugin URI: https://themefic.com/instantio/
 * Description: Instantio Themefic Special.
 * Author: Themefic
 * Text Domain: instantioSecial
 * Domain Path: /lang/
 * Author URI: https://themefic.com
 * Tags: woocommerce cart, woocommerce checkout, woocommerce direct checkout, multistep checkout, woocommerce side cart
 * Version: 3.0.0
 * Tested up to: 6.6
 * Requires PHP: 7.4
 * WC tested up to: 9.3.3
 **/

// don't load directly
defined( 'ABSPATH' ) || exit;

class INSTANTIO_THEMEFIC {
	public function __construct() {
		$this->define_constants();
		add_action( 'wp_enqueue_scripts', array( $this, 'instantio_special_js_scripts' ), 9999999 );
        add_action( 'wp_ajax_clear_and_add_product_to_cart', [ $this, 'clear_and_add_product_to_cart' ] );
		add_action( 'wp_ajax_nopriv_clear_and_add_product_to_cart', [ $this, 'clear_and_add_product_to_cart' ] );
	}

	private function define_constants() {
		define( 'INSTANTIO_SPECIAL_URL', plugin_dir_url( __FILE__ ) );
		define( 'INSTANTIO_SPECIAL_ASSETS_URL', INSTANTIO_SPECIAL_URL . 'assets' );
	}

	public function instantio_special_js_scripts() {
		wp_enqueue_script( 'instantio_themific-script', INSTANTIO_SPECIAL_ASSETS_URL . '/instantio_special.js', array( 'jquery' ), true );
        wp_localize_script( 'instantio_themific-script', 'instantio_themific_params',
			array(
				'ins_ajax_nonce' => wp_create_nonce( 'ins_ajax_nonce' ),
				'ajax_url' => admin_url( 'admin-ajax.php' ),
				'cartajax_url' => WC()->ajax_url(),
				'wc_ajax_url' => \WC_AJAX::get_endpoint( '%%endpoint%%' ),
				'update_shipping_method_nonce' => wp_create_nonce( 'update-shipping-method' ),
			)
		);
	}

	// Add the AJAX function to handle cart clearing and adding
	public function clear_and_add_product_to_cart() {
		if ( isset( $_POST['product_id'] ) ) {
			$product_id = intval( $_POST['product_id'] );
			WC()->cart->empty_cart();

			$added = WC()->cart->add_to_cart( $product_id );

			if ( $added ) {
				wp_send_json_success();
			} else {
				wp_send_json_error( 'Failed to add product to cart.' );
			}
		} else {
			wp_send_json_error( 'Product ID missing.' );
		}
	}
}

new INSTANTIO_THEMEFIC();