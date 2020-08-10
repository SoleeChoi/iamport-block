<?php
  wp_register_style('iamport-block-migration-css', plugins_url('../../assets/css/iamport-block-migration.css', __FILE__), array(), "20180730");
  wp_enqueue_style('iamport-block-migration-css');

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
    <h1>아임포트 숏코드 마이그레이션</h1>
    <p>
      아래는 숏코드가 포함된 포스트의 리스트입니다. 각 포스트에 대해 마이그레이션 버튼을 눌러, 숏코드를 블록으로 대체해주세요.
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
<?php
	$iamport_admin_html = ob_get_clean();
	return $iamport_admin_html;
