<?php

add_action('plugins_loaded', 'register_dynamic_block');

function register_dynamic_block() {
  // Only load if Gutenberg is available.
  if (!function_exists('register_block_type')) {
    return;
  }

  // Hook server side rendering into render callback
  // Make sure name matches registerBlockType in ./index.js
  register_block_type('cgb/iamport-block', array(
    'render_callback' => __NAMESPACE__ . '\render_dynamic_block'
  ));
}

function render_dynamic_block($attributes) {
  $iamportSettings = get_option('iamport_setting');

  // 아임포트 설정 페이지에서 설정 값 불러오기
  $attributes['userCode'] = $iamportSettings['user_code'];
  $attributes['loginRequired'] = $iamportSettings['login_required'];
  $attributes['bizNum'] = $iamportSettings['biz_num'];

  // 결제 창 열자마자 결제내역에 결제 건 추가하기 위한 HTTP 요청 URL
  $attributes['adminUrl'] = admin_url('admin-ajax.php');

  // Parse attributes
  $iamportAttributes = htmlspecialchars(json_encode($attributes));

  ob_start(); // Turn on output buffering

  /* BEGIN HTML OUTPUT */
?>
  <div
    id="iamport-block-wrapper"
    data-iamport-attributes="<?=$iamportAttributes?>"
  ></div>
<?php
  /* END HTML OUTPUT */

  $output = ob_get_contents(); // collect output
  ob_end_clean(); // Turn off ouput buffer

  return $output; // Print output
}