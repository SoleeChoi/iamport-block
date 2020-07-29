<?php
if ( !class_exists('IamportBlockPaymentInfo') ) {

	class IamportBlockPaymentInfo {

		private $user_code;
		private $api_key;
		private $api_secret;
		private $configuration;

		public function __construct($user_code, $api_key, $api_secret, $configuration) {
			$this->user_code = $user_code;
			$this->api_key = $api_key;
			$this->api_secret = $api_secret;
			$this->configuration = $configuration;

			$this->hook();
		}

		private function hook() {
			add_shortcode( 'iamport_history_page', array($this, 'hook_history_page') );
			add_shortcode( 'iamport_thankyou_page', array($this, 'hook_thankyou_page') );
		}

		public function hook_history_page($atts, $content = null) {
			global $wp;

			if ( empty($wp->query_vars['iamport-order-view']) ) { //list view
				return $this->get_order_list( get_current_user_id() );
			} else { //each order view
				$order_uid = $wp->query_vars['iamport-order-view'];

				return $this->get_order_view($order_uid);
			}
		}

		public function get_order_list( $user_id ) {
			$args = array(
				'posts_per_page' => 20,
				'post_type' => 'iamport_payment',
				'post_status' => 'any',
				'author' => $user_id,
				'orderby' => 'ID',
				'order' => 'DESC'
			);
			$posts = get_posts( $args );

			$history_page = get_page_by_slug('iamport_history');
			if ( !empty($history_page) ) $history_page_url = get_page_link($history_page[0]->ID);

			return require_once(dirname(__FILE__).'/../view/history/order-list.php');
		}

		public function get_order_view($order_uid) {
			$iamport_order = IamportBlockOrder::find_by_order_uid($order_uid);

			if ( $iamport_order ) {
				return require_once(dirname(__FILE__).'/../view/history/IamportBlockOrderDetail.php');
			}

			return '주문정보를 찾을 수 없습니다.';
		}

		public function hook_thankyou_page($atts, $content = null) {
			global $wp;
			if ( empty($wp->query_vars['iamport-order-received']) )	return '파라메터라 누락되었습니다. 관리자에게 문의해주세요.';

			$order_uid = $wp->query_vars['iamport-order-received'];
			$redirect_after = $wp->query_vars['redirect-after'];

			$iamport_order = IamportBlockOrder::find_by_order_uid($order_uid);
			if ( empty($iamport_order) ) return '주문정보를 찾을 수 없습니다.';

			//무료 주문 처리
			if ($iamport_order->is_free()) {
				$iamport_order->set_order_status('paid');
				$iamport_order->set_paid_amount( 0 );
				$iamport_order->set_paid_date( time() );

				$history_page = get_page_by_slug('iamport_history');
				if ( !empty($history_page) )	$order_view_url = add_query_arg( 'iamport-order-view', $order_uid, get_page_link($history_page[0]->ID) );

				return require_once(dirname(__FILE__).'/../view/history/thankyou-success.php');
			}

			$iamport = new IamportBlockApi($this->api_key, $this->api_secret);
			$iamport_result = $iamport->findByMerchantUID($order_uid);

			if ( $iamport_result->success ) {
				if ( floatval($iamport_result->data->amount) != $iamport_order->get_order_amount() ) {
					return '결제요청금액과 승인된 금액이 다릅니다. 비정상적인 시도입니다.';
				}

				//결제완료처리
				$iamport_order->set_pay_method($iamport_result->data->pay_method);
				$iamport_order->set_currency($iamport_result->data->currency);
				$iamport_order->set_order_status($iamport_result->data->status, $iamport_result->data->pay_method);

				if ( $iamport_result->data->status == 'paid' ) {
					$iamport_order->set_paid_amount( $iamport_result->data->amount );
					$iamport_order->set_paid_date( $iamport_result->data->paid_at );
					$iamport_order->set_receipt_url($iamport_result->data->receipt_url);

					//fire hook
					do_action('iamport_button_order_status_changed', "ready", $iamport_order->get_order_status(), $iamport_order, $iamport_result->data);
				} else if ( $iamport_result->data->status == 'failed' ) {
					$iamport_order->add_failed_history(
						date('Y-m-d H:i:s', $iamport_result->data->failed_at+(get_option( 'gmt_offset' ) * HOUR_IN_SECONDS)), $iamport_result->data->fail_reason );
				} else if ( $iamport_result->data->status == 'ready' ) {
					//[2018-09-03] PHP버전에 따라 __get 으로 구현된 속성값을 empty 체크하면 잘못된 결과가 나올 수 있음
					$vbank_num = $iamport_result->data->vbank_num;
					if ( $iamport_result->data->pay_method == 'vbank' && !empty($vbank_num) ) {
						$iamport_order->set_vbank_info(array(
							'name' => $iamport_result->data->vbank_name,
							'account' => $iamport_result->data->vbank_num,
							'due' => $iamport_result->data->vbank_date,
						));

						//fire hook
						do_action('iamport_button_order_status_changed', "ready", $iamport_order->get_order_status(), $iamport_order, $iamport_result->data);
					}
				}

				$history_page = get_page_by_slug('iamport_history');
				if ( !empty($history_page) )	$order_view_url = add_query_arg( 'iamport-order-view', $order_uid, get_page_link($history_page[0]->ID) );

				return require_once(dirname(__FILE__).'/../view/history/thankyou-success.php');
			} else {
				return require_once(dirname(__FILE__).'/../view/history/thankyou-fail.php');
			}
		}

	}
}
