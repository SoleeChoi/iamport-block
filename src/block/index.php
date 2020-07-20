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
  // Parse attributes
  $attributes['userCode'] = 'imp19424728';
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