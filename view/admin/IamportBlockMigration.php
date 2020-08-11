<?php
  wp_register_style('iamport-block-migration-css', plugins_url('../../assets/css/iamport-block-migration.css', __FILE__), array(), "20180730");
  wp_enqueue_style('iamport-block-migration-css');

  wp_register_style('iamport-block-manual-css', plugins_url('../../assets/css/iamport-block-manual.css', __FILE__), array(), "20180730");
  wp_enqueue_style('iamport-block-manual-css');

  wp_register_style('iamport-block-common-css', plugins_url('../../assets/css/iamport-block-common.css', __FILE__), array(), "20180730");
  wp_enqueue_style('iamport-block-common-css');

  require_once(dirname(__FILE__).'/../../model/IamportShortcode.php');

  // 각 포스트의 마이그레이션 버튼 눌렀을때
	if ( isset($_POST['action']) && $_POST['action'] == "migrate_to_iamport_block") {
    $postId = $_POST['post_id'];
    $postContent = get_post($postId)->post_content;

    while(1) {
      // 숏코드 찾기
      preg_match(
        '/' . get_shortcode_regex() . '/s',
        $postContent,
        $matches,
        PREG_OFFSET_CAPTURE
      );

      if (count($matches) == 0) {
        break;
      }

      // 찾아진 숏코드
      $eachShortcode = $matches[0][0];
      // 숏코드의 위치
      $startAt = $matches[0][1];

      // 앞 스트링: 처음 ~ 숏코드 이전까지의 스트링
      $frontString = substr($postContent, 0, $startAt);
      // 뒷 스트링: 숏코드 이후 ~ 끝까지의 스트링
      $rearString = substr($postContent, $startAt + strlen($eachShortcode));

      // 각 숏코드 파싱
      $atts = shortcode_parse_atts($matches[3][0]);
      $content = $matches[5][0];
      $shortcode = new IamportShortcode($atts, $content);

      // 새 스트링: 앞 스트링 + 파싱된 숏코드 + 뒷 스트링
      $postContent =
        $frontString .
        '<!-- wp:cgb/iamport-payment ' .
        $shortcode->convertToJsonString() .
        ' /-->'.
        $rearString;
    }

    // TODO: <!-- wp:paragraph --><p> </p><!-- /wp:paragraph --> 제거
    $postContent = str_replace(
      '<!-- wp:paragraph -->
<p><!-- wp:cgb/iamport-payment',
      '<!-- wp:cgb/iamport-payment',
      $postContent
    );

    $postContent = str_replace(
      '/--></p>
<!-- /wp:paragraph -->',
      '/-->',
      $postContent
    );

    wp_update_post(
      array(
        'ID' => $postId,
        'post_content' => $postContent,
      ),
      true
    );
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
	<div class="iamport-block-container migration">
    <h1>아임포트 마이그레이션</h1>
    <div class="iamport-block-box">
      <h2><span>STEP1</span>아임포트 블록 플러그인 추가</h2>
      <p class="iamport-block-left">
        왼쪽 네비게이션 메뉴에서 <code>플러그인</code>을 클릭합니다. 플러그인 페이지에서 상단의 <code>새로추가</code> 버튼을 클릭합니다. 플러그인 추가 페이지에서 플러그인 검색 창에 <code>아임포트</code>를 입력하고 엔터를 누릅니다. 아임포트 플러그인 목록 중 <code>아임포트 블록 플러그인</code>의 <code>지금 설치</code>버튼을 클릭하면 설치가 완료됩니다.
      </p>
      <div class="iamport-block-left iamport-text-center">
        <img src="<?=plugin_dir_url( __FILE__ )?>../../assets/img/install-plugin.png" alt="아임포트 블록 설치"/>
      </div>
      <p class="iamport-block-left">
        설치가 완료되면 네비게이션 메뉴에 <code>아임포트 결제내역</code>이 추가되고 하위 메뉴로 <code>아임포트 설정</code>, <code>아임포트 블록 매뉴얼</code>이 자동으로 셋팅됩니다. 각 메뉴의 역할은 기존의 아임포트 숏코드 플러그인과 동일합니다.
      </p>
      <div class="iamport-block-left iamport-text-center">
        <img src="<?=plugin_dir_url( __FILE__ )?>../../assets/img/navigation.png" alt="아임포트 블록 네비게이션 메뉴"/>
      </div>
      <div class="iamport-block-clear"></div>
    </div>

    <div class="iamport-block-box">
      <h2><span>STEP2</span>아임포트 결제내역 마이그레이션</h2>
      <p>
        기존에 아임포트 숏코드 플러그인으로 결제된 내역을, 새 블록 플러그인에서도 확인해보실 수 있습니다. 이를 위해서는 기존의 결제내역을 <code>마이그레이션(복사)</code> 하셔야 합니다. 결제내역 복사를 위해 기존의 숏코드 플러그인의 결제내역(왼쪽 내비게이션 매뉴 <code>아임포트 결제목록</code> 클릭)으로 이동합니다. 오른쪽에 <code>마이그레이션 상태</code> 칼럼이 추가된 것을 확인해보실 수 있습니다. 이는 말 그대로 마이그레이션이 필요한지, 이미 완료됐는지를 나타내는 지표입니다.
      </p>
      <div class="iamport-text-center">
        <img src="<?=plugin_dir_url( __FILE__ )?>../../assets/img/migration.png" alt="마이그레이션"/>
      </div>
      <p>
        마이그레이션이 필요한 결제내역을 선택(체크박스)하고 상단의 <code>아임포트 결제내역 마이그레이션</code>을 선택해 적용 버튼을 누릅니다. 마이그레이션에 성공하면 상단에 완료되었다는 메시지가 뜹니다.
      </p>
      <div class="iamport-text-center">
        <img src="<?=plugin_dir_url( __FILE__ )?>../../assets/img/migration-over.png" alt="마이그레이션 완료"/>
      </div>
      <p>
        마이그레이션 완료된 결제내역은 새 블록 플러그인의 결제내역(왼쪽 내비게이션 메뉴 <code>아임포트 결제내역</code> 클릭)에서 확인해보실 수 있습니다.
      </p>
      <div class="iamport-text-center">
        <img src="<?=plugin_dir_url( __FILE__ )?>../../assets/img/migration-result.png" alt="마이그레이션 결과"/>
      </div>
    </div>
    <div class="iamport-block-box">
      <h2><span>STEP3</span>아임포트 숏코드 마이그레이션</h2>
      <p>
        아래는 숏코드가 포함된 포스트의 리스트입니다. 각 포스트에 대해 마이그레이션 버튼을 눌러, 기존의 숏코드를 새 블록으로 대체할 수 있습니다. 
      </p>
      <table>
        <thead>
          <tr>
            <th>포스트 ID</th>
            <th>포스트 타이틀</th>
            <th>포스트 컨텐츠</th>
            <th>블록으로 전환</td>
          </tr>
        </thead>
        <tbody>
          <?php
            $postCount = 0;

            // 워드프레스에 설정된 모든 페이지를 가져온다
            $query = new WP_Query(array(
              'post_type'   =>  array('page','post'),
              'post_status' => 'publish'
            ));

            if ($query->have_posts()) {
              while ($query->have_posts()) {
                $query->the_post();

                $post = get_post();
                // 숏코드를 포함하고 있는 포스트의 리스트만 렌더링한다
                preg_match(
                  '/\[iamport_payment_button(.*)\[\/iamport_payment_button\]/',
                  $post->post_content,
                  $matches,
                  PREG_OFFSET_CAPTURE
                );
                if (count($matches) > 0) {
                  $postCount += 1;
                  ?>
                    <tr>
                      <td><a href="<?=home_url().'/'.$post->post_name?>" target="_blank"><?=$post->ID?></a></td>
                      <td><?=$post->post_title?></td>
                      <td><textarea><?=$post->post_content?></textarea></td>
                      <td>
                        <form method="post" action="">
                          <input type="hidden" name="post_id" value="<?=$post->ID?>" />
                          <input type="hidden" name="action" value="migrate_to_iamport_block" />
                          <input class="button-primary" type="submit" name="iamport-options" value="마이그레이션" />
                        </form>
                      </td>
                    </tr>
                  <?php
                }
              }
            }
            wp_reset_postdata();
            
            if ($postCount == 0) { ?>
              <tr>
                <td colspan="4"><p>마이그레이션이 필요한 포스트가 없습니다</p></td>
              </tr>
          <?php
            }
          ?>
        </tbody>
      </table>
    </div>
    <div class="iamport-block-box">
      <h2><span>STEP4</span>아임포트 숏코드 플러그인 삭제</h2>
      <p>
        이제 <code>아임포트 블록 플러그인</code> 사용을 위한 모든 작업이 끝났습니다. 아임포드 결제버튼 생성 플러그인(<code>iamport-payment</code>)을 삭제(또는 비활성화) 하실 수 있습니다.
      </p>
      <div class="iamport-text-center">
        <img src="<?=plugin_dir_url( __FILE__ )?>../../assets/img/uninstall-plugin.png" alt="플러그인 삭제"/>
      </div>
    </div>
	</div>
<?php
	$iamport_admin_html = ob_get_clean();
	return $iamport_admin_html;
