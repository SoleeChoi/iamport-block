<?php

add_action('plugins_loaded', 'register_dynamic_block');

function register_dynamic_block() {
  // Only load if Gutenberg is available.
  if (!function_exists('register_block_type')) {
    return;
  }

  // Hook server side rendering into render callback
  // Make sure name matches registerBlockType in ./index.js
  register_block_type('cgb/iamport-payment', array(
    'render_callback' => __NAMESPACE__ . '\render_iamport_payment_block'
  ));

  // Hook server side rendering into render callback
  // Make sure name matches registerBlockType in ./index.js
  register_block_type('cgb/iamport-subscription', array(
    'render_callback' => __NAMESPACE__ . '\render_iamport_subscription_block'
  ));
}

function render_iamport_payment_block($attributes) {
  // Parse attributes
  $iamportAttributes = getIamportAttributes($attributes);

  ob_start(); // Turn on output buffering

  /* BEGIN HTML OUTPUT */
?>
  <div
    class="iamport-payment-wrapper"
    data-iamport-attributes="<?=$iamportAttributes?>"
  ></div>
<?php
  /* END HTML OUTPUT */

  $output = ob_get_contents(); // collect output
  ob_end_clean(); // Turn off ouput buffer

  return $output; // Print output
}

function render_iamport_subscription_block($attributes) {
  // Parse attributes
  $iamportAttributes = getIamportAttributes($attributes);

  ob_start(); // Turn on output buffering

  /* BEGIN HTML OUTPUT */
?>
  <div
    class="iamport-subscription-wrapper"
    data-iamport-attributes="<?=$iamportAttributes?>"
  ></div>
<?php
  /* END HTML OUTPUT */

  $output = ob_get_contents(); // collect output
  ob_end_clean(); // Turn off ouput buffer

  return $output; // Print output
}

function getIamportAttributes($attributes) {
  $iamportSettings = get_option('iamport_block_setting');

  // 아임포트 설정 페이지에서 설정 값 불러오기
  $attributes['userCode'] = $iamportSettings['user_code'];
  $attributes['bizNum'] = $iamportSettings['biz_num'];

  // 로그인 유저만 허용하는데, 로그인이 되어 있지 않은 경우엔 로그인이 필요하다
  $attributes['isLoginRequired'] = $iamportSettings['login_required'] && !is_user_logged_in();
  $attributes['loginUrl'] = wp_login_url("http" . (isset($_SERVER['HTTPS']) ? 's' : '') . '://' . "{$_SERVER['HTTP_HOST']}{$_SERVER['REQUEST_URI']}", true);

  // 결제 창 열자마자 결제내역에 결제 건 추가하기 위한 HTTP 요청 URL
  $attributes['adminUrl'] = admin_url('admin-ajax.php');

  // 모바일 기기인지 여부
  $attributes['isMobile'] = wp_is_mobile();

  // Parse attributes
  return htmlspecialchars(json_encode($attributes));
}