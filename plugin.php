<?php
/**
 * Plugin Name: 아임포트 블록 플러그인
 * Plugin URI: https://wordpress.org/plugins/iamport-block/
 * Description: 워드프레스 블록을 활용해 원하는 위치에 자유 자재로 결제 버튼을 생성하실 수 있는 아임포트 플러그인입니다. 여러 PG사의 다양한 결제수단을 이용하실 수 있습니다. (신용카드/실시간계좌이체/가상계좌/휴대폰소액결제/카카오페이/페이팔/삼성페이 - 에스크로포함)
 * Author: SIOT
 * Author URI: http://www.siot.do
 * Version: 0.9.0
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain: iamport-block
 * Domain Path: /languages
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
require_once(dirname(__FILE__).'/model/IamportBlock.php');
require_once(dirname(__FILE__).'/model/IamportBlockPaymentCallback.php');

register_activation_hook(__FILE__, 'iamport_block_activated');

function iamport_block_activated() {
	create_iamport_block_order_list_page();
	create_iamport_block_payment_result_page();
	add_iamport_block_endpoints();
}

function create_iamport_block_order_list_page() {
	$slug = 'iamport_block_order_list';

	$history_page = get_iamport_block_page_by_slug($slug);
	if( empty($history_page) ) {
		$page_data = array(
			'post_status'		  => 'publish',
			'post_type'			  => 'page',
			'post_author'		  => 1,
			'post_name'			  => $slug,
			'post_title'		  => '결제내역 - 아임포트',
			'post_content'		=> '[iamport_block_order_list_page]',
			'post_parent'		  => 0,
			'comment_status'	=> 'closed'
		);

		$page_id = wp_insert_post( $page_data );
	}
}

function create_iamport_block_payment_result_page() {
	$slug = 'iamport_block_payment_result';

	$thankyou_page = get_iamport_block_page_by_slug($slug);
	if( empty($thankyou_page) ) {
		$page_data = array(
			'post_status'		  => 'publish',
			'post_type'			  => 'page',
			'post_author'		  => 1,
			'post_name'			  => $slug,
			'post_title'		  => '결제완료 - 아임포트',
			'post_content'	  => '[iamport_block_payment_result_page]',
			'post_parent'		  => 0,
			'comment_status'  => 'closed'
		);

		$page_id = wp_insert_post( $page_data );
	}
}

function get_iamport_block_page_by_slug($slug) {
	$args = array(
		'name'        => $slug,
		'post_type'   => 'page',
		'post_status' => 'publish',
		'numberposts' => 1
	);
	return get_posts($args);
}

function add_iamport_block_endpoints() {
	add_rewrite_endpoint('iamport-order-view', EP_PAGES);
	add_rewrite_endpoint('iamport-order-received', EP_PERMALINK | EP_PAGES);

	flush_rewrite_rules();
}

new IamportBlock();

include __DIR__ . '/src/block/index.php';
