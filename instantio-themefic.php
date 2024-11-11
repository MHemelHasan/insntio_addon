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
 **/

// don't load directly
defined( 'ABSPATH' ) || exit;

class INSTANTIO_THEMEFIC {
	public function __construct() {
		$this->define_constants();
		add_action( 'wp_enqueue_scripts', array( $this, 'instantio_special_js_scripts' ), 999999999 );
		add_action( 'wp_footer', array( $this, 'enqueue_instantio_special_script' ) );

		add_action( 'wp_ajax_get_cart_data', [$this, 'get_cart_data_ajax'] );
		add_action( 'wp_ajax_nopriv_get_cart_data', [$this, 'get_cart_data_ajax'] );
		// add_action( 'init', [$this, 'get_cart_data_ajax'] );
	}

	private function define_constants() {
		define( 'INSTANTIO_SPECIAL_URL', plugin_dir_url( __FILE__ ) );
		define( 'INSTANTIO_SPECIAL_ASSETS_URL', INSTANTIO_SPECIAL_URL . 'assets' );
	}

	public function instantio_special_js_scripts() {
		wp_enqueue_style( 'instantio_themific_style', INSTANTIO_SPECIAL_ASSETS_URL . '/css/instantio_special.css' );
		wp_register_script( 'instantio_themific_script', INSTANTIO_SPECIAL_ASSETS_URL . '/js/instantio_special.js', array( 'jquery' ), true );

		// Localize script for AJAX functionality
		wp_localize_script( 'instantio_themific_script', 'instantio_themific_params',
			array(
				'ins_ajax_nonce' => wp_create_nonce( 'ins_ajax_nonce' ),
				'ajax_url' => admin_url( 'admin-ajax.php' ),
			)
		);
	}

	public function enqueue_instantio_special_script() {
		wp_enqueue_script( 'instantio_themific_script' );
	}



	public function get_cart_data_ajax() {
		global $woocommerce;
		$cart = $woocommerce->cart->get_cart();
		$cart_data = [];

		foreach ( $cart as $cart_item_key => $cart_item ) {
			$product_id = $cart_item['product_id'];
			$variation_id = isset( $cart_item['variation_id'] ) ? $cart_item['variation_id'] : 0;
			$cart_data[] = [ 
				'product_id' => $product_id,
				'variation_id' => $variation_id,
			];
		}
		wp_send_json_success( $cart_data );
	}





}

new INSTANTIO_THEMEFIC();