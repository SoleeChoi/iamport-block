<?php
  wp_register_style('iamport-block-setting-css', plugins_url('../../assets/css/iamport-block-setting.css', __FILE__), array(), "20180730");
  wp_enqueue_style('iamport-block-setting-css');

  wp_register_style('iamport-block-common-css', plugins_url('../../assets/css/iamport-block-common.css', __FILE__), array(), "20180730");
  wp_enqueue_style('iamport-block-common-css');
  
	/* ---------- 아임포트 설정에서 '저장하기' 버튼 눌렀을때 ---------- */
	if ( isset($_POST['action']) && $_POST['action'] == "update_iamport_block_setting" ) {
		if ( wp_verify_nonce($_POST['iamport-settings'], 'iamport-options') ) {
      $iamportSetting = get_option('iamport_block_setting');

			$iamportSetting['user_code'] = $_POST['user_code'];
			$iamportSetting['rest_key'] = $_POST['rest_key'];
			$iamportSetting['rest_secret'] = $_POST['rest_secret'];
			$iamportSetting['login_required'] = $_POST['login_required'];
      $iamportSetting['biz_num'] = $_POST['biz_num'];

      update_option('iamport_block_setting', $iamportSetting);

		} else {
			?><div class="error">update failed</div><?php
		}
	}

	ob_start();

	$settings = get_option('iamport_block_setting');
	if ( empty($settings) ) {
		/* -------------------- 설정파일 백업으로부터 복원 -------------------- */
		$iamportSetting['user_code'] = get_option('iamport_user_code');
		$iamportSetting['rest_key'] = get_option('iamport_rest_key');
		$iamportSetting['rest_secret'] = get_option('iamport_rest_secret');
		$iamportSetting['login_required'] = get_option('iamport_login_required');
		$iamportSetting['biz_num'] = get_option('iamport_biz_num');

		update_option('iamport_block_setting', $iamportSetting);
	}
	$iamportSetting = get_option('iamport_block_setting');
?>
	<div class="iamport-block-container">
		<h1>아임포트 블록 설정</h1>
    <form method="post" action="">
      <div class="iamport-block-box">
        <h2>아임포트 결제 정보</h2>
        <p>
          아임포트 관리자 페이지(<a target="_blank" href="https://admin.iamport.kr">https://admin.iamport.kr</a>)에 접속해 회원가입 후, 아래와 같이 <code>시스템설정 > 내정보</code> 탭에 설정된 <code>가맹점 식별코드</code>, <code>REST API 키</code>, <code>REST API Secret 키</code> 값을 복사해 입력해주세요.
        </p>
        <img src="<?=plugin_dir_url( __FILE__ )?>../../assets/img/user-info.png" alt="아임포트 가맹점 정보" />
        <table>
          <tbody>
            <tr>
              <td>가맹점 식별코드</td>
              <td>
                <input name="user_code" type="text" id="iamport_user_code" value="<?=$iamportSetting['user_code']?>" /><br>
              </td>
            </tr>
            <tr>
              <td>REST API 키</td>
              <td>
                <input name="rest_key" type="text" id="iamport_rest_key" value="<?=$iamportSetting['rest_key']?>" /><br>
              </td>
            </tr>
            <tr>
              <td>REST API Secret</td>
              <td>
                <input name="rest_secret" type="text" id="iamport_rest_secret" value="<?=$iamportSetting['rest_secret']?>" /><br>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="iamport-block-box">
        <h2>가상계좌 입금 통보 URL</h2>
        <p>
          아임포트 관리자 페이지(<a target="_blank" href="https://admin.iamport.kr">https://admin.iamport.kr</a>)에 로그인 후, <code>시스템설정 > 웹훅(Notification)설정</code> 탭에 아래 값을 입력하고 하단의 <code>웹훅설정 저장</code> 버튼을 눌러주세요.
        </p>
        <input
          readonly
          name="notification_guide"
          type="text"
          id="iamport_notification_guide"
          value="<?=add_query_arg( 'iamport-button-callback', 'webhook', site_url() )?>"
        />
        <img src="<?=plugin_dir_url( __FILE__ )?>../../assets/img/notification-url.png" alt="아임포트 가상계좌 입금 통보 URL" />
      </div>

      <div class="iamport-block-box">
        <h2>사업자 등록번호</h2>
        <p>다날 - 가상계좌 서비스를 이용하시려면, 계약하신 사업자의 등록번호 10자리(-제외)를 반드시 입력해주세요.</p>
        <input name="biz_num" type="text" id="iamport_biz_num" value="<?=$iamportSetting['biz_num']?>" /><br>
      </div>
        
      <div class="iamport-block-box">
        <h2>기타 정보</h2>
        <table>
          <tbody>
            <tr>
              <td>로그인 필수 여부</td>
							<td>
								<label>
                  <input
                    name="login_required"
                    type="checkbox"
                    id="iamport_login_required"
                    value="Y"
                    <?=$iamportSetting['login_required'] == 'Y' ? 'checked' : ''?>
                  />
                  로그인 한 사용자에게만 구매를 허용하시려면 체크하세요
                </label>
							</td>
						</tr>
          </tbody>
        </table>
      </div>

      <?php wp_nonce_field('iamport-options', 'iamport-settings'); ?>
      <input type="hidden" name="action" value="update_iamport_block_setting" />
      <div class="iamport-text-center">
        <input class="button-primary" type="submit" name="iamport-options" value="저장하기" />
      </div>
		</form>
	</div>
<?php
	$iamport_admin_html = ob_get_clean();
	return $iamport_admin_html;
