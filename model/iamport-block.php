<?php

if ( !class_exists('IamportBlock') ) {
	require_once(dirname(__FILE__).'/iamport.php');
	require_once(dirname(__FILE__).'/IamportBlockOrder.php');
	require_once(dirname(__FILE__).'/IamportBlockPaymentInfo.php');

	class IamportBlock {

		private $user_code;
		private $api_key;
		private $api_secret;
		private $payment_info;
		private $callback;

		public function __construct() {
			if( is_admin() ) {
				add_action('admin_menu', array( $this, 'iamport_admin_menu') );
			}

			add_action( 'init', array($this, 'init') );
			add_filter( 'query_vars', array($this, 'add_query_vars'), 0 );

			add_action( 'wp_ajax_get_order_uid', array($this, 'ajax_get_order_uid') );
			add_action( 'wp_ajax_nopriv_get_order_uid', array($this, 'ajax_get_order_uid') );

			add_action( 'add_meta_boxes', array($this, 'iamport_order_metabox') );
			add_action( 'save_post', array($this, 'save_iamport_order_metabox') );
		}

		public function iamport_admin_menu() {
			add_submenu_page(
				'edit.php?post_type=iamport_payment',
				'아임포트 설정',
				'아임포트 설정',
				'administrator',
				'iamport-config',
				function() { echo require_once(dirname(__FILE__).'/../view/admin/setting.php'); }
			);

			add_submenu_page(
				'edit.php?post_type=iamport_payment',
				'아임포트 블록 메뉴얼',
				'아임포트 블록 메뉴얼',
				'administrator',
				'iamport-block',
				function() { echo require_once(dirname(__FILE__).'/../view/admin/manual.php'); }
			);
		}

		public function init() {
			$settings = get_option('iamport_setting');
			if ( empty($settings) ) {
				/* -------------------- 설정파일 백업으로부터 복원 -------------------- */
				$iamportSetting['user_code'] = get_option('iamport_user_code');
				$iamportSetting['rest_key'] = get_option('iamport_rest_key');
				$iamportSetting['rest_secret'] = get_option('iamport_rest_secret');
				$iamportSetting['login_required'] = get_option('iamport_login_required');
				$iamportSetting['biz_num'] = get_option('iamport_biz_num');

				update_option('iamport_setting', $iamportSetting);
			}

			$iamportSetting = get_option('iamport_setting');
			$this->user_code 		= $iamportSetting['user_code'];
			$this->api_key 			= $iamportSetting['rest_key'];
			$this->api_secret 		= $iamportSetting['rest_secret'];
			$this->login_required 	= $iamportSetting['login_required'];
			$this->biz_num 				= $iamportSetting['biz_num'];

      $configuration 					        = new stdClass();
      $configuration->$user_code      = $this->user_code;
			$configuration->login_required 	= $this->login_required === 'Y';
      $configuration->biz_num 			  = $this->biz_num;

			$this->payment_info = new IamportBlockPaymentInfo($this->user_code, $this->api_key, $this->api_secret, $configuration);
			$this->callback = new IamportBlockPaymentCallback($this->user_code, $this->api_key, $this->api_secret);

			$this->create_iamport_post_type();
    }

		public function add_query_vars($vars) {
			$vars[] = 'iamport-order-view';
			$vars[] = 'iamport-order-received';
			$vars[] = 'redirect-after';

			return $vars;
		}

		public function ajax_get_order_uid() {
			$order_title 	= $_POST['order_title'];
			$pay_method 	= $_POST['pay_method']; //카카오페이는 kakaopay로 일단 올라오고, 그 후 front에서 card로 변경되어야 함
			$buyer_name 	= $_POST['buyer_name'];
			$buyer_email 	= $_POST['buyer_email'];
			$buyer_tel 		= $_POST['buyer_tel'];
			$order_amount 	= $_POST['order_amount'];
			$tax_free_amount 	= $_POST['tax_free_amount'];
			$currency 	    = $_POST['currency'];
			$amount_label 	= $_POST['amount_label'];
			$redirect_after	= $_POST['redirect_after'];
			$attached_files = $_FILES;
			$extraFields	= $_POST['extra_fields'];

			foreach( $_FILES as $fileType => $fileValue ) {
				/* ---------- NFC to NFD ---------- */
				//normalizer_normalize 메소드가 없는 경우가 많음
				// $fileName = $fileValue['name'];
				// $fileValue['name'] = normalizer_normalize($fileName);

        $uploadFiles = wp_handle_upload($fileValue, array('action' => 'get_order_uid'));
        if ( !isset($uploadFiles['error']) ) {
          $attached_files[$fileType]['location'] = $uploadFiles['url'];
        }
			}

			$order_data = array(
				'post_status'		=> 'publish',
				'post_type'			=> 'iamport_payment',
				'post_title'		=> $order_title,
				'post_parent'		=> 0,
				'comment_status'	=> 'closed'
			);

			$order_id = wp_insert_post( $order_data );

			//TODO : model setter 활용하기
			$order_uid = $this->get_order_uid();
			add_post_meta( $order_id, 'order_uid', $order_uid, true);
			add_post_meta( $order_id, 'pay_method', $pay_method, true);
			add_post_meta( $order_id, 'buyer_name', $buyer_name, true);
			add_post_meta( $order_id, 'buyer_email', $buyer_email, true);
			add_post_meta( $order_id, 'buyer_tel', $buyer_tel, true);
			add_post_meta( $order_id, 'order_amount', $order_amount, true);
			add_post_meta( $order_id, 'tax_free_amount', $tax_free_amount, true);
			add_post_meta( $order_id, 'currency', $currency, true);
			add_post_meta( $order_id, 'amount_label', $amount_label, true);
			add_post_meta( $order_id, 'order_status', 'ready', true);
			add_post_meta( $order_id, 'attached_files', $attached_files, true);
			add_post_meta( $order_id, 'extra_fields', $extraFields, true);

			$thankyou_url = '';
			$thankyou_page = get_page_by_slug('iamport_thankyou');
			if ( !empty($thankyou_page) ) {
				$thankyou_url = add_query_arg( array(
					'iamport-order-received' => $order_uid,
					'redirect-after' => $redirect_after
				), get_page_link($thankyou_page[0]->ID) );
			}

			$response = array(
        'order_id'=>$order_id,
        'order_uid'=>$order_uid,
        'thankyou_url'=>$thankyou_url,
      );

			wp_send_json($response);
		}

		private function get_order_uid() {
			return uniqid(date('mdis_'));
		}

		private function create_iamport_post_type() {
			register_post_type( 'iamport_payment',
				array(
					'labels'		 		=> array(
						'name' 				=> '아임포트 결제목록',
						'singular_name' 	=> '아임포트 결제목록'
					),
					'menu_icon' 			=> plugin_dir_url( __FILE__ ) . '../assets/img/iamport.jpg',
					'show_ui' 				=> true,
					'show_in_nav_menus' 	=> false,
					'show_in_admin_bar' 	=> true,
					'public' 				=> true,
					'has_archive' 			=> false,
					'rewrite' 				=> array('slug' => 'iamport_payment'),
					'map_meta_cap' 			=> true,
					'capabilities' 			=> array(
						'edit_post' 		=> true,
						'create_posts' 		=> false
					)
				)
			);

			remove_post_type_support( 'iamport_payment', 'editor' );

			add_filter( 'manage_iamport_payment_posts_columns', array($this, 'iamport_payment_columns') );
			add_action( 'manage_iamport_payment_posts_custom_column' , array($this, 'iamport_payment_custom_columns'), 10, 2 );
		}

		public function iamport_payment_columns($columns) {
			$columns['title_uid'] 			= '주문명<br>주문번호';
			$columns['order_status'] 		= '주문상태';
			$columns['order_paid_amount']	= '요청금액 (면세금액)<br>결제금액';
			$columns['pay_method_date'] 	= '결제수단<br>결제시각';
			$columns['buyer_info'] 			= '이름<br>이메일<br>전화번호';
			$columns['extra_fields'] 		= '부가정보';
			$columns['attached_files'] 		= '첨부파일';

			unset($columns['title']);
			unset($columns['date']);

			return $columns;
		}

		public function iamport_payment_custom_columns( $column, $post_id ) {
			$iamport_order = IamportBlockOrder::find_by_id($post_id);
			if ( $iamport_order == null )	return;

			switch ( $column ) {
				case 'title_uid':
					echo $iamport_order->get_order_title(). '<br>' . $iamport_order->get_order_uid();
					break;

				case 'order_status':
					echo $iamport_order->get_order_status();
					break;

				case 'pay_method_date':
					echo $iamport_order->get_pay_method();
					if ( $iamport_order->get_pay_method(true) == "vbank" ) {
						$vbank_info = $iamport_order->get_vbank_info();
						$due = is_numeric($vbank_info['due']) ? date('Y-m-d H:i:s', $vbank_info['due']+(get_option( 'gmt_offset' ) * HOUR_IN_SECONDS)) : $vbank_info['due'];

						echo '<p style="background:#eee;text-align:left;font-size:85%;padding:5px;">';
						echo sprintf("* 은행 : %s<br>* 계좌번호 : %s<br>* 입금기한 : %s", $vbank_info['name'], $vbank_info['account'], $due);
						echo '</p>';
					}

					echo '<br>';
					echo $iamport_order->get_paid_date();
					break;

				case 'order_paid_amount' : {
					$amount = $iamport_order->get_paid_amount();
					$taxFree = $iamport_order->get_tax_free_amount(true);

					if ( isset($amount) ) {
						$paidAmount = '<b>' . $iamport_order->get_paid_amount(true) . '</b>';
					}

					echo sprintf('%s (%s)<br>%s', $iamport_order->get_order_amount(true), $taxFree, $paidAmount .$iamport_order->get_amount_label());
					break;
				}

				case 'buyer_info':
					echo $iamport_order->get_buyer_name() . '<br>' .
							 $iamport_order->get_buyer_email() . '<br>' .
							 $iamport_order->get_buyer_tel();
					break;

				case 'attached_files': {
          $attachedFiles = $iamport_order->get_attached_files();

					if ( empty($attachedFiles) ) echo '-';
					else {
						$files = array();
						foreach ( $attachedFiles as $file => $fileData ) {
              //normalizer_normalize 메소드가 없는 경우가 많음
              // $normalizedFileName = normalizer_normalize($fileData['name']);
              $normalizedFileName = $fileData['name'];

              $files[] = sprintf('<div class="file-info"><p>%s</p><a style="text-decoration: underline;" href="%s" download="%s" onmouseover="hoverOnFile(event)" onmouseleave="leaveOnFile(event)"><img src="%s"/><span class="file-name-size">%s/%s</span></a></div>',
                preg_replace('/%0D%0A/', '', $file),
                $fileData['location'],
                $normalizedFileName,
                plugin_dir_url(__FILE__).'../assets/img/file-img.png',
                $normalizedFileName,
                $this->iamport_file_size_converter($fileData['size'])
              );
						}

						echo implode('<br/>', $files);
					}

					break;
				}

				case 'extra_fields': {
					$extra = json_decode($iamport_order->get_extra_fields());

					if ( !empty($extra) ) {
						$lists = array();

						foreach ($extra as $key => $value) {
              $lists[] = sprintf('<span><b>%s : </b>%s</span>', $key, $value);
						}

						echo implode('<br/>', $lists);
					} else {
						echo '-';
					}

					break;
				}
			}
		}

		public function iamport_file_size_converter($bytes) {
	        $bytesTypes = array(
	            'T' 	=> pow(1024, 4),
	            'G' 	=> pow(1024, 3),
	            'M' 	=> pow(1024, 2),
	            'K'	=> 1024,
	            'B'		=> 1
	        );

		    foreach($bytesTypes as $type => $value) {
		        if ( $bytes >= $value ) {
		            $result = $bytes / $value;
		            $result = round($result, 2)." ".$type;
		            break;
		        }
		    }

		    return $result;
		}

		public function iamport_order_metabox() {
			remove_meta_box( 'submitdiv', 'iamport_payment', 'side' );

			add_meta_box( 'iamport-order-info', '아임포트 결제상세정보', array($this, 'iamport_order_metabox_callback'), 'iamport_payment', 'normal' );
			add_meta_box( 'iamport-order-action', '결제상태 변경', array($this, 'iamport_order_action_metabox_callback'), 'iamport_payment', 'side', 'high' );
			add_meta_box( 'iamport-order-fail-history', '결제 히스토리', array($this, 'iamport_order_history_metabox_callback'), 'iamport_payment', 'side', 'low');
		}

		public function iamport_order_metabox_callback($post) {
			$iamport_order = new IamportBlockOrder($post);
			echo $this->payment_info->get_order_view( $iamport_order->get_order_uid() );
		}

		public function iamport_order_action_metabox_callback($post) {
			wp_nonce_field( 'iamport_metabox_nonce', 'iamport_metabox_nonce' );

			$iamport_order = new IamportBlockOrder($post);
			$order_status = $iamport_order->get_order_status(true);

			echo require_once(dirname(__FILE__).'/../view/admin/edit-order.php');
		}

		public function iamport_order_history_metabox_callback($post) {
			$iamport_order = new IamportBlockOrder($post);
			$history = $iamport_order->get_failed_history();

			echo '<div id="minor-publishing">';
			foreach($history as $h) {
				echo '<div class="misc-pub-section">[' . $h['date'] . '] ' . $h['reason'] . '</div>';
			}
			echo '</div>';
		}

		public function save_iamport_order_metabox($post_id) {
			$iamport_order = IamportBlockOrder::find_by_id($post_id);

			if ( empty($iamport_order) )															return;
			if ( !isset( $_POST['iamport_metabox_nonce'] ) )										return;
			if ( !wp_verify_nonce( $_POST['iamport_metabox_nonce'], 'iamport_metabox_nonce' ) )		return;
			if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE )									return;

			if ( isset( $_POST['post_type'] ) && 'iamport_payment' == $_POST['post_type'] ) {
				if ( !current_user_can('administrator') && !current_user_can('editor') )		return;
			} else {
				return;
			}

			if ( !isset($_POST['new_iamport_order_status']) )	return;

			$new_iamport_order_status = sanitize_text_field($_POST['new_iamport_order_status']);
			if ( $new_iamport_order_status == 'cancelled' ) {
				$iamport = new Iamport($this->api_key, $this->api_secret);
				$iamport_result = $iamport->cancel(array(
					'merchant_uid' 	=> $iamport_order->get_order_uid(),
					'amount' 		=> $iamport_order->get_paid_amount(),
					'reason' 		=> '워드프레스 관리자 결제취소'
				));

				$iamport_order->add_failed_history(date_i18n('Y-m-d H:i:s'), $iamport_result->error['message']);

				if ( !$iamport_result->success ) return; // 결제환불이 이루어지지 못했으므로 상태업데이트 해주면 안됨
			}

			$iamport_order->set_order_status($new_iamport_order_status);

			//fire hook
			do_action('iamport_button_order_status_changed', "paid", $iamport_order->get_order_status(), $iamport_order, $iamport_result->data);
		}

	}
}
