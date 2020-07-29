<?php

if ( !class_exists('IamportPaymentCallback') ) {

  require_once(dirname(__FILE__).'/iamport.php');
  require_once(dirname(__FILE__).'/iamport-order.php');
  require_once(dirname(__FILE__).'/iamport-payment-info.php');

  class IamportPaymentCallback {

    const QUERY_CALLBACK = "iamport-button-callback";

    private $user_code;
    private $api_key;
    private $api_secret;

    public function __construct($user_code, $api_key, $api_secret)
    {
      $this->user_code  = $user_code;
      $this->api_key    = $api_key;
      $this->api_secret = $api_secret;

      //init callback에서 생성자가 호출되므로 add_rewrite_endpoint 를 곧바로 호출해도 됨
      add_rewrite_endpoint( self::QUERY_CALLBACK, EP_ALL );
      add_action( 'parse_request', array( $this, 'handle_callback' ), 0 );
    }

    public function handle_callback()
    {
      if ( ! empty( $_GET[self::QUERY_CALLBACK] ) ) {
        $wp->query_vars[self::QUERY_CALLBACK] = $_GET[self::QUERY_CALLBACK];
      }
      if ( empty( $wp->query_vars[self::QUERY_CALLBACK] ) ) return;

      $imp_uid = self::pop_post_param("imp_uid");

      //결제정보 확인 및 검증
      $iamport = new Iamport($this->api_key, $this->api_secret);
      $iamport_result = $iamport->findByImpUID($imp_uid);

      if ( $iamport_result->success ) {
        $payment_data = $iamport_result->data;

        $iamport_order = IamportOrder::find_by_order_uid( $payment_data->merchant_uid );
        if ( empty($iamport_order) ) return '주문정보를 찾을 수 없습니다.';

        if ( floatval($payment_data->amount) != $iamport_order->get_order_amount() ) {
          return '결제요청금액과 승인된 금액이 다릅니다. 비정상적인 시도입니다.';
        }

        //결제완료처리
        $iamport_order->set_pay_method($payment_data->pay_method);
        $iamport_order->set_currency($payment_data->currency);
        $iamport_order->set_order_status($payment_data->status, $payment_data->pay_method);

        if ( $payment_data->status == 'paid' ) {
          $iamport_order->set_paid_amount( $payment_data->amount );
          $iamport_order->set_paid_date( $payment_data->paid_at );
          $iamport_order->set_receipt_url($payment_data->receipt_url);
        } else if ( $payment_data->status == 'cancelled' ) {
          $iamport_order->set_cancelled_date( $payment_data->cancelled_at );
          $iamport_order->set_cancel_reason( $payment_data->cancel_reason );
        }

        exit("Success");
      }

      exit("Version: 0.9.29");
    }

    private static function pop_post_param($name)
    {
      if ( $_SERVER["CONTENT_TYPE"] === 'application/json' ) {
        $data = json_decode( file_get_contents('php://input'), true );

        if ( isset($data[ $name ]) )  return $data[ $name ];
      } else {
        if ( isset($_POST[ $name ]) ) return $_POST[ $name ];
        if ( isset($_GET[ $name ]) )  return $_GET[ $name ];
      }

      return null;
    }

  }

}