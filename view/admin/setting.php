<?php
	/* ---------- 아임포트 설정에서 '저장하기' 버튼 눌렀을때 ---------- */
	if ( isset($_POST['action']) && $_POST['action'] == "update_iamport_settings" ) {
		if ( wp_verify_nonce($_POST['iamport-settings'], 'iamport-options') ) {
      $iamportSetting = get_option('iamport_setting');

			$iamportSetting['user_code'] = $_POST['user_code'];
			$iamportSetting['rest_key'] = $_POST['rest_key'];
			$iamportSetting['rest_secret'] = $_POST['rest_secret'];
			$iamportSetting['login_required'] = $_POST['login_required'];
      $iamportSetting['biz_num'] = $_POST['biz_num'];

      update_option('iamport_setting', $iamportSetting);

		} else {
			?><div class="error">update failed</div><?php
		}
	}

	ob_start();

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
?>
    <style>
      .iamport-mid-fill { width:100% }
    </style>
	<div class="wrap">
		<h2>아임포트 결제설정 페이지</h2>
		<p>
			<h3>0. 가상계좌 입금통보 설정</h3>
			<table class="form-table shortcode-box">
				<tbody>
					<tr valign="top">
						<th scope="row" style="padding-left:10px;"><label for="iamport_notification_guide">가상계좌 입금통보 URL설정</label></th>
						<td>
							<input readonly class="large-text" name="notification_guide" type="text" id="iamport_notification_guide" value="<?=add_query_arg( 'iamport-button-callback', 'webhook', site_url() )?>" /><br>
							<a target="_blank" href="https://admin.iamport.kr">https://admin.iamport.kr</a> 에 로그인 후, "시스템설정" > "PG설정(일반결제 및 정기결제)" 하단에 입력 및 저장하면 됩니다.
						</td>
					</tr>
				</tbody>
			</table>

			<h3>1. 아임포트 결제정보 설정</h3>
			<form method="post" action="">
				<table class="form-table shortcode-box">
					<tbody>
						<tr valign="top">
							<th scope="row" style="width:160px;padding-left:10px;"><label for="iamport_user_code">[아임포트] 가맹점 식별코드</label></th>
							<td>
								<input class="regular-text" name="user_code" type="text" id="iamport_user_code" value="<?=$iamportSetting['user_code']?>" /><br>
								<a target="_blank" href="https://admin.iamport.kr">https://admin.iamport.kr</a> 에서 회원가입 후, "시스템설정" > "내정보"에서 확인하실 수 있습니다.
							</td>
						</tr>
						<tr valign="top">
							<th scope="row" style="width:160px;padding-left:10px;"><label for="iamport_rest_key">[아임포트] REST API 키</label></th>
							<td>
								<input class="regular-text" name="rest_key" type="text" id="iamport_rest_key" value="<?=$iamportSetting['rest_key']?>" /><br>
								<a target="_blank" href="https://admin.iamport.kr">https://admin.iamport.kr</a> 에서 회원가입 후, "시스템설정" > "내정보"에서 확인하실 수 있습니다.
							</td>
						</tr>
						<tr valign="top">
							<th scope="row" style="width:160px;padding-left:10px;"><label for="iamport_rest_secret">[아임포트] REST API Secret</label></th>
							<td>
								<input class="regular-text" name="rest_secret" type="text" id="iamport_rest_secret" value="<?=$iamportSetting['rest_secret']?>" /><br>
								<a target="_blank" href="https://admin.iamport.kr">https://admin.iamport.kr</a> 에서 회원가입 후, "시스템설정" > "내정보"에서 확인하실 수 있습니다.
							</td>
						</tr>
						<tr valign="top">
							<th scope="row" style="width:160px;padding-left:10px;"><label for="iamport_login_required">로그인 필요</label></th>
							<td>
								<label><input name="login_required" type="checkbox" id="iamport_login_required" value="Y" <?=$iamportSetting['login_required'] == 'Y' ? 'checked' : ''?>/>로그인 된 사용자에게만 구매 허용하시려면 체크하세요</label>
							</td>
						</tr>
					</tbody>
				</table>

				<h3>2. PG사별 추가 설정</h3>
				<h4>다날 가상계좌 서비스를 이용하시려면 계약하신 사업자의 사업자등록번호 10자리(숫자만)를 기재해주셔야 정상동작합니다.</h4>
				<table class="form-table shortcode-box">
					<tbody>
						<tr valign="top">
							<th scope="row" style="width:160px;padding-left:10px;"><label for="iamport_biz_num">[다날] 사업자등록번호</label></th>
							<td>
								<input class="regular-text" name="biz_num" type="text" id="iamport_biz_num" value="<?=$iamportSetting['biz_num']?>" /><br>
							</td>
						</tr>
					</tbody>
				</table>

				<?php wp_nonce_field('iamport-options', 'iamport-settings'); ?>
				<input type="hidden" name="action" value="update_iamport_settings" />
				<input class="button-primary" type="submit" name="iamport-options" value="저장하기" />
			</form>
		</p>
	</div>
<?php
	$iamport_admin_html = ob_get_clean();
	return $iamport_admin_html;
