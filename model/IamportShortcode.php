<?php

if ( !class_exists('IamportShortcode') ) {

	class IamportShortcode {

    private $shortcodeAtts;

		public function __construct($shortcodeString) {
      $this->shortcodeAtts = shortcode_parse_atts($shortcodeString);
		}

		public function convertToJsonString() {
      // 1. 숏코드 스트링을 파싱해, array로 저장
			$a = shortcode_atts(array(
        'title' 			      => __('결제하기', 'iamport-block'),
				'description' 		  => __('아래의 정보를 입력 후 결제버튼을 클릭해주세요', 'iamport-block'),
				'pay_method' 		    => 'card',
				'pay_method_list' 	=> 'card,kakaopay,samsung,trans,vbank,phone,paypal',
				'field_list' 		    => 'name,email,phone',
				'name' 				      => '아임포트 결제하기',
				'amount' 			      => '',
				'tax_free' 			    => '',
				'style' 			      => 'display:inline-block;padding:6px 12px;color:#fff;background-color:#2c3e50',
				'class' 			      => '',
				'redirect_after' 	  => '',
				'currency'          => 'KRW',
        'digital'           => 'no',
        'pg_for_card'       => '',
        'pg_for_trans'      => '',
        'pg_for_vbank'      => '',
        'pg_for_phone'      => '',
        'pg_for_kakaopay'   => '',
        'pg_for_paypal'     => '',
        'amount_label'      => __('결제금액', 'iamport-block'),
      ), $this->shortcodeAtts);

      // TODO
      // $content = null;
			// $trimedAttr = $this->trim_iamport_attr($content);
			// $content = $trimedAttr['content'];
			// $customFields = $trimedAttr['customFields'];

      $amountInfo = $this->getAmountInfo($a['amount'], $a['tax_free']);
      $buyerOptions = $this->getBuyerOptions($a['field_list']);
      $payMethods = array_unique(explode(',', $a['pay_method_list']));

      $iamportSetting = get_option('iamport_setting');
      $pgOptions = $this->getPgOptions($a, $iamportSetting);
      $pgs = $pgOptions['pgs'];
      $pgMids = $pgOptions['pgMids'];

      $cardQuota = $this->getCardQuota($iamportSetting);
      $vbankDue = $this->getVbankDue($iamportSetting);
      $digital = filter_var($a['digital'], FILTER_VALIDATE_BOOLEAN);

      $convertedShortcode = array(
        'buttonStyle'       => $a['style'],                   // 결제 버튼 스타일
        'buttonClassName'   => $a['class'],                   // 결제 버튼 클래스 이름
        'title'             => $a['title'],                   // 결제 모달 타이틀
        'description'       => $a['description'],             // 결제 결제 모달 설명
        'name'              => $a['name'],                    // 주문명
        'amountType'        => $amountInfo['amountType'],     // 결제 금액 유형
        'amountOptions'     => $amountInfo['amountOptions'],  // 결제 금액 정보
        // 'amountLabel'       => $a['amount_label'],
        'buyerOptions'      => $buyerOptions,                 // 구매자 정보
        'currency'          => $a['currency'],                // 화폐 단위
        'payMethods'        => $payMethods,                   // 결제 수단
        'pgs'               => $pgs,                          // 결제수단 별 PG사 정보
        'pgMids'            => $pgMids,                       // 결제수단 별 PG 상점아이디 정보
        'pgMids'            => $pgMids,                       // 결제 수단 별 PG 상점아이디 정보
        'cardQuota'         => $cardQuota,                    // 신용카드 할부 개월수
        'vbankDue'          => $vbankDue,                     // 가상계좌 입금 기한
        'digital'           => $digital,                      // 실물 컨텐츠 여부
        'redirectAfter'     => $a['redirect_after'],          // 결제 후 이동될 URL
      );
      return json_encode($convertedShortcode, JSON_UNESCAPED_UNICODE);
		}

		public function trim_iamport_attr($content) {
			/* ---------- TRIM CONTENT ---------- */
			if ( empty($content) )	$content = __('결제하기', 'iamport-block');

			// markup remove
			$content = preg_replace('/<\s*\/?[a-zA-Z0-9]+[^>]*>/s', '', $content);

			// &nbsp; &amp;nbsp; remove
			$content = htmlentities($content, null, 'utf-8');
			$content = preg_replace('/nbsp;|&nbsp;|&amp;/', '', $content);
			$content = html_entity_decode($content);

			$fieldRegex = get_shortcode_regex(array('iamport_payment_button_field'));
			$matchCount = preg_match_all("/$fieldRegex/s", $content, $fieldMatchs);

			$content = trim(preg_replace("/$fieldRegex/s", '', $content));

			/* ---------- TRIM CUSTOMFIELDS ---------- */
			$customFields = array();

			if ( $matchCount > 0 ) {
				foreach ($fieldMatchs[0] as $f) {
					$html = do_shortcode($f);

					if ( !empty($html) ) $customFields[] = $html;
				}
			}

			return array(
				'content' 		=> $content,
				'customFields' 	=> $customFields
			);
		}

		public function hook_payment_field($atts, $content = null) {
			if ( is_null($this->buttonContext) )	return; //[iamport_payment_button] 없이 [iamport_payment_button_field] 단독으로 사용된 경우. buttonContext 가 없으므로 처리하지 않음

			$a = shortcode_atts( array(
				'type' 			=> 'text',
				'required' 		=> false,
				'options' 		=> array(),
				'content'		=> null,
				'placeholder' 	=> null,
				'data-for'		=> null,
				'default'       => null,
                'label'         => null,
                'link'          => null,
      ), $atts );

			if ( empty($content) ) return null;
			else $a['content'] = $content;

			if ( !empty($a['options']) ) $a['options'] = explode(',', $a['options']);

			if ( !isset($this->buttonContext["customFields"]) )	$this->buttonContext["customFields"] = array();

			$this->buttonContext["customFields"][] = $a;
    }
    
    private function getAmountInfo($amount, $taxFreeAmount) {
      // 결제 유형 및 결제 금액 정보
      $amountType = null;
      $amountOptions = array();

			$amountList = array_unique(preg_split("/,(?![^(]*\))/", $amount)); // 괄호 안에 comma가 있을 수도 있음
      $taxFreeList = explode(',', $taxFreeAmount);
      
			if ($amountList[0] == 'variable') {
        // 가변형이 아닌 경우
				$amountType = 'variable';
			} else {
        // 가변형이 아닌 경우
        foreach ($amountList as $idx => $amount) {
					preg_match_all('/\((.*)\)/', $amount, $amountLabel); // 괄호 안에 괄호가 들어가 있을 수 있어 greedy match
					preg_match_all('/([0-9\.]+)/', $amount, $amountValue); // float value 허용

					$label = null;
					if (!empty($amountLabel) && $amountLabel[1]) {
						$label = $amountLabel[1][0];
					} else {
            // 라벨이 없는 경우, 결제 금액과 같은 값으로 설정한다
            $label = $amountValue[0][0];
          }

					$taxFree = 0;
					if (isset($taxFreeList[$idx])) {
					  $taxFree = floatval($taxFreeList[$idx]);
          }

					$amountOptions[] = array(
						'label'         => trim($label),
						'value'         => floatval($amountValue[0][0]),
            'taxFreeAmount' => $taxFree,
					);
				}
      }

      if (count($amountOptions) == 1) {
        if ($amountOptions[0]['value'] == 0) {
          // 무료형
          $amountType = 'free';
        } else {
          // 고정형
          $amountType = 'fixed';
        }
      } else {
        // 선택형
        $amountType = 'selection';
      }

      return array(
        'amountType' => $amountType,
        'amountOptions' => $amountOptions,
      );
    }

    private function getBuyerOptions($fieldList) {
      /**
       * 결제자 이름, 이메일, 전화번호, 주소
       * 이름과 이메일 주소는 로그인 한 유저의 경우, 해당 정보를 가져와 전달한다
       */
			$currentUser = wp_get_current_user();
			if (!empty($currentUser->user_nicename)) {
				$buyerName = $currentUser->user_nicename;
			}
			if (!empty($currentUser->user_email)) {
				$buyerEmail = $currentUser->user_email;
      }

			$buyerOptions = array();
			foreach (array_unique(explode(',', $fieldList)) as $buyerOption)  {
				$trimmedBuyerOption = trim($buyerOption);
				$regex = "/^(name|email|phone|shipping_addr)\((.+)\)$/";

				if (preg_match($regex, $trimmedBuyerOption, $matches)) {
					$optionType = $matches[1];
					$optionLabels = explode("|", $matches[2]);

					$optionLabel = $optionPlaceholder = $optionLabels[0];
					if (count($optionLabels) > 1) {
						$optionPlaceholder = $optionLabels[1];
					}
				} else { // basic format
					$optionType = $trimmedBuyerOption;
					$optionLabel = null;
					$optionPlaceholder = null;
				}

				switch($optionType) {
					case 'name': {
						$buyerOptions['name'] = array(
							'checked'		    => 'true',
							'value' 		    => $buyerName,
							'label' 		    => $optionLabel ? $optionLabel : __('결제자 이름', 'iamport-block'),
							'placeholder' 	=> $optionPlaceholder ? $optionPlaceholder : __('결제자 이름', 'iamport-block'),
            );
            break;
					}
					case 'email': {
						$buyerOptions['email'] = array(
							'checked'		    => 'true',
							'value'			    => $buyerEmail,
							'label'		      => $optionLabel ? $optionLabel : __('결제자 이메일', 'iamport-block'),
							'placeholder' 	=> $optionPlaceholder ? $optionPlaceholder : __('결제자 이메일', 'iamport-block'),
            );
            break;
					}
					case 'phone': {
						$buyerOptions['phone'] = array(
							'checked'		    => 'true',
							'value'			    => null,
							'label'		      => $optionLabel ? $optionLabel : __('결제자 전화번호', 'iamport-block'),
							'placeholder' 	=> $optionPlaceholder ? $optionPlaceholder : __('결제자 전화번호', 'iamport-block'),
            );
            break;
					}
					case 'shipping_addr' : {
						$buyerOptions['address'] = array(
							'checked'		    => 'true',
							'value'			    => null,
							'label'		      => $optionLabel ? $optionLabel : __('배송주소', 'iamport-block'),
							'placeholder' 	=> $optionPlaceholder ? $optionPlaceholder : __('배송주소', 'iamport-block'),
            );
            break;
					}
				}
      }
      return $buyerOptions;
    }

    private function getPgOptions($a, $iamportSetting) {
      /**
       * 결제 수단 별 PG사 및 PG 상점아이디 정보
       * pg_for_${payMethod}값과 iamport_setting값을 조합한다
       */
      $pgs = array();
      $pgMids = array();

      $payMethods = array('card', 'trans', 'vbank', 'phone', 'kakaopay', 'paypal', 'samsung');
      foreach ($payMethods as $payMethod) {
        $pgMid = $a['pg_for_' . $payMethod];
        if (empty($pgMid)) {
          // 정의되지 않은 경우, iamport_setting값을 참조한다
          $defaultPgOptions = $this->getDefaultPgOptions($payMethod, $iamportSetting);
          $pgs[$payMethod] = $defaultPgOptions['pg'];
          $pgMids[$payMethod] = $defaultPgOptions['mid'];
        } else {
          // 정의 된 경우
          $splittedPgMid = explode('.', $pgMid, 2);
          $pgs[$payMethod] = $splittedPgMid[0];

          $mid = null;
          if (count($splittedPgMid) > 1) {
            // PG사.PG상점아이디
            $mid = $splittedPgMid[1];  
          } else {
            $mid = $pgMid;
          }
          $pgMids[$payMethod] = $mid;
        }
      }

      return array(
        'pgMids' => $pgMids,
        'pgs' => $pgs,
      );
    }

    private function getDefaultPgOptions($payMethod, $iamportSetting) {
      $pgOptionsSetting = $iamportSetting['pg_for_payment'];

      $pgSetting = $pgOptionsSetting[$payMethod];
      $midSetting = $pgOptionsSetting[$payMethod.'_mid'];
      
      $pg = null;
      $mid = null;
      if (empty($pgSetting)) {
        // PG사가 정의되지 않은 경우
        if ($payMethod == 'kakaopay' || $payMethod == 'paypal') {
          $pg = $payMethod;
        } else if ($payMethod == 'phone') {
          $pg = 'danal';
        } else {
          $pg = 'html5_inicis';
        }
      } else {
        // PG사가 정의 된 경우
        $pg = $pgSetting;
      }

      if (!empty($midSetting)) {
        // PG상점아이디가 정의 된 경우
        $mid = $midSetting;
      }

      return array(
        'pg' => $pg,
        'mid' => $mid,
      );
    }

    private function getCardQuota($iamportSetting) {
      // 신용카드 최대 할부 개월수
      $cardQuota = $iamportSetting['card_max_quota'];
      if ($cardQuota == 'none') {
        return 0;
      }
      $splittedCardQuota = explode('m', $cardQuota, 2);
      return intval($splittedCardQuota[0]);
    }

    private function getVbankDue($iamportSetting) {
      // 가상계좌 입금 기한
      $vbankDue = $iamportSetting['vbank_day_limit'];
      if ($vbankDue == 'none') {
        return 0;
      }
      $splittedVbankDue = explode('d', $vbankDue, 2);
      return intval($splittedVbankDue[0]);
    }
	} // end of Class

} // end of if
