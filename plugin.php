<?php
/**
 * Plugin Name: iamport-block — CGB Gutenberg Block Plugin
 * Plugin URI: https://github.com/ahmadawais/create-guten-block/
 * Description: iamport-block — is a Gutenberg plugin created via create-guten-block.
 * Author: mrahmadawais, maedahbatool
 * Author URI: https://AhmadAwais.com/
 * Version: 1.0.0
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
// require_once plugin_dir_path( __FILE__ ) . 'src/init.php';

function iamport_editor_scripts()
{

    // Make paths variables so we don't write em twice ;)
    $blockPath = '/dist/blocks.build.js';
    $editorStylePath = '/dist/blocks.editor.build.css';

    // Enqueue the bundled block JS file
    wp_enqueue_script(
        'iamport-blocks-js',
        plugins_url( $blockPath, __FILE__ ),
        [ 'wp-i18n', 'wp-element', 'wp-blocks', 'wp-components', 'wp-editor' ],
        filemtime( plugin_dir_path(__FILE__) . $blockPath )
    );

    // Enqueue optional editor only styles
    wp_enqueue_style(
        'iamport-blocks-editor-css',
        plugins_url( $editorStylePath, __FILE__),
        ['wp-components'],
        filemtime( plugin_dir_path( __FILE__ ) . $editorStylePath )
    );

}

// Hook scripts function into block editor hook
add_action( 'enqueue_block_editor_assets', 'iamport_editor_scripts' );

function iamport_scripts()
{
    $reactPath = '/dist/iamport.react.js';
    // Make paths variables so we don't write em twice ;)
    $stylePath = '/dist/blocks.style.build.css';

    wp_enqueue_script(
      'iamport-js-sdk',
      'https://service.iamport.kr/js/iamport.payment-1.1.8.js',
      array( 'jquery', 'jquery-ui-dialog' )
    );

    wp_enqueue_script(
      'iamport-react-js',
      plugins_url( $reactPath, __FILE__ ),
      [ 'wp-i18n', 'wp-element', 'wp-blocks', 'wp-components', 'wp-editor' ],
      filemtime( plugin_dir_path(__FILE__) . $reactPath )
    );

    // DAUM address API
    wp_enqueue_script(
      'daum-address-api',
      'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js'
    );

    // Enqueue frontend and editor block styles
    wp_enqueue_style(
      'iamport-blocks-css',
      plugins_url($stylePath, __FILE__),
      ['wp-components'],
      filemtime(plugin_dir_path(__FILE__) . $stylePath )
    );
}

// Hook scripts function into block editor hook
add_action('enqueue_block_assets', 'iamport_scripts');

// Hook For PHP
require_once(dirname(__FILE__).'/model/iamport-block.php');
require_once(dirname(__FILE__).'/model/iamport-payment-callback.php');

register_activation_hook( __FILE__, 'iamport_activated' );

function iamport_activated() {
	create_history_page();
	create_thankyou_page();
	add_endpoints();
}

function create_history_page() {
	$slug = 'iamport_history';

	$history_page = get_page_by_slug($slug);
	if( empty($history_page) ) {
		$page_data = array(
			'post_status'		=> 'publish',
			'post_type'			=> 'page',
			'post_author'		=> 1,
			'post_name'			=> $slug,
			'post_title'		=> '결제내역 - 아임포트',
			'post_content'		=> '[iamport_history_page]',
			'post_parent'		=> 0,
			'comment_status'	=> 'closed'
		);

		$page_id = wp_insert_post( $page_data );
	}
}

function create_thankyou_page() {
	$slug = 'iamport_thankyou';

	$thankyou_page = get_page_by_slug($slug);
	if( empty($thankyou_page) ) {
		$page_data = array(
			'post_status'		=> 'publish',
			'post_type'			=> 'page',
			'post_author'		=> 1,
			'post_name'			=> $slug,
			'post_title'		=> '결제완료 - 아임포트',
			'post_content'		=> '[iamport_thankyou_page]',
			'post_parent'		=> 0,
			'comment_status'	=> 'closed'
		);

		$page_id = wp_insert_post( $page_data );
	}
}

function get_page_by_slug($slug) {
	$args = array(
		'name'        => $slug,
		'post_type'   => 'page',
		'post_status' => 'publish',
		'numberposts' => 1
	);
	return get_posts($args);
}

function add_endpoints() {
	add_rewrite_endpoint( 'iamport-order-view', EP_PAGES );
	add_rewrite_endpoint( 'iamport-order-received', EP_PERMALINK | EP_PAGES );

	flush_rewrite_rules();
}

new IamportBlock();

include __DIR__ . '/src/block/index.php';
