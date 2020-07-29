<?php
	wp_register_style('iamport-shortcode-page-css', plugins_url('../../assets/css/iamport-shortcode-page.css', __FILE__), array(), "20180730");
	wp_enqueue_style('iamport-shortcode-page-css');

	ob_start();
?>
	<div class="wrap iamport-manual-page">
		<h2>아임포트 블록 메뉴얼</h
    2>
		<h3>1. 아임포트 블록 추가</h3>
		<div class="shortcode-box">
      페이지에서 + 버튼을 통해 아임포트 블록을 추가할 수 있습니다.
      <p class="attr-explanation">
        <span class="attr-detail">
          검색 키워드) 아임포트 블록<br>
          블록 카테고리) 공통 블록
        </span>
      </p>
		</div>

		<h3>2. 기본 입력 필드</h3>
		<h4></h4>
		<div class="shortcode-box">
      <img src="<?=plugin_dir_url( __FILE__ )?>../../assets/img/basic_fields.png" class="attr-img">
			<div class="attr-text">
				<p class="attr-title">결제 버튼 라벨<img src="<?=plugin_dir_url( __FILE__ )?>../../assets/img/tag-1.png" class="attr-tag"></p>
				<p class="attr-explanation">
					페이지에 렌더링되는 결제 버튼의 라벨을 결정합니다.<br>
					<span class="attr-detail">기본값) '결제하기'</span>
				</p>

				<p class="attr-title">결제 팝업 타이틀<img src="<?=plugin_dir_url( __FILE__ )?>../../assets/img/tag-2.png" class="attr-tag"></p>
				<p class="attr-explanation">
					결제하기 버튼을 눌렀을때 렌더링되는 팝업의 타이틀을 결정합니다.<br>
					<span class="attr-detail">기본값) '참가권 결제'</span>
				</p>

				<p class="attr-title">결제 팝업 설명<img src="<?=plugin_dir_url( __FILE__ )?>../../assets/img/tag-3.png" class="attr-tag"></p>
				<p class="attr-explanation">
					결제하기 버튼을 눌렀을때 렌더링되는 팝업의 서브 타이틀을 결정합니다.<br>
					<span class="attr-detail">기본값) '아래의 정보를 입력 후 결제버튼을 클릭해주세요'</span>
				</p>

				<p class="attr-title">주문명<img src="<?=plugin_dir_url( __FILE__ )?>../../assets/img/tag-4.png" class="attr-tag"></p>
				<p class="attr-explanation">
					해당 결제에 대한 주문명을 결정합니다.<br>
          <span class="attr-detail">기본값) '아임포트 워드프레스 블록 플러그인 주문'</span>
				</p>

				<p class="attr-title">결제수단<img src="<?=plugin_dir_url( __FILE__ )?>../../assets/img/tag-5.png" class="attr-tag"></p>
				<p class="attr-explanation">
					사용자가 선택 가능한 결제 수단, 결제수단 별 PG사 그리고 PG 상점아이디를 설정합니다.<br>
          하나의 PG사에 대해 서로 다른 PG 상점아이디를 갖고 있는 경우, 이를 구분하기 위해 PG 상점아이디 값을 지정할 수 있습니다.
					<span class="attr-detail">
						종류) 카카오페이, 삼성페이, 신용카드, 가상계좌, 실시간 계좌이체, 휴대폰 소액결제, 페이팔<br>
						주의) 적어도 하나의 결제수단을 선택해야 합니다.
					</span>
				</p>

				<p class="attr-title">신용카드 할부 개월수</p>
				<p class="attr-explanation">
					신용카드 결제수단 선택시, 사용자에게 허용할 최대 할부 개월수를 설정합니다.<br>
					<span class="attr-detail">
						기본값) 'PG사 기본 제공 옵션'<br>
						주의) <i>할부 기능은 PG사 계약 후에 이용 가능합니다.</i></p>
					</span>

				<p class="attr-title">가상계좌 입금 기한</p>
				<p class="attr-explanation">
          가상계좌 결제수단 선택시, 가상계좌 입금 기한을 설정합니다.<br>
          <span class="attr-detail">
						기본값) 'PG사 기본 제공 옵션'<br>
					</span>
        </p>

        <p class="attr-title">실물 컨텐츠 여부</p>
				<p class="attr-explanation">
          휴대폰 소액결제 결제수단 선택시, 구매하는 상품의 실물 컨텐츠 여부를 설정합니다.<br>
          <span class="attr-detail">
						기본값) 'false'<br>
					</span>
        </p>

        <p class="attr-title">결제 후 이동 될 URL</p>
				<p class="attr-explanation">
          결제가 완료된 후 이동될 URL을 지정합니다.<br>
          미 입력시, 아임포트가 기본으로 제공하는 페이지로 이동됩니다.
          <span class="attr-detail">
						주의) 유효한 URL만 입력 가능합니다.<br>
					</span>
        </p>
			</div>
			<div class="vir-div"></div>
		</div>

		<h3>3. 결제 금액 필드</h3>
		<div class="shortcode-box">
      <img src="<?=plugin_dir_url( __FILE__ )?>../../assets/img/amount_fields.png" class="attr-img">
      <div>
				<div class="attr-text">
					<p class="attr-title">금액 유형</p>
					<p class="attr-explanation">
						구매자가 결제할 금액을 커스터마이징 할 수 있습니다.
						<span class="attr-detail">
              [고정형] 구매자가 항상 정해진 금액으로 결제하도록 합니다.<br>
              [가변형] 구매자가 결제할 금액을 직접 입력하도록 합니다. (면세금액 지원되지 않음)<br>
              [선택형] 구매자가 결제할 금액을 N개의 옵션 중 선택하도록 합니다.
            </span>
          </p>
				</div>
				<div class="vir-div"></div>
			</div>
			<div>
				<div class="attr-text">
					<p class="attr-title">화폐 단위</p>
					<p class="attr-explanation">
						결제 할 화폐 단위를 선택합니다.
            <span class="attr-detail">
              기본값) ₩<br>
						  [₩]: KRW, 페이팔을 제외한 모든 PG사 지원<br>
              [$]: USD, 나이스페이, 페이팔 지원<br>
              [€]: EUR, 페이팔만 지원<br>
              [¥]: JPY, 페이팔만 지원
            </span>
          </p>
				</div>
				<div class="vir-div"></div>
			</div>
			<div>
				<div class="attr-text">
					<p class="attr-title">금액 라벨</p>
					<p class="attr-explanation">
            결제 팝업에 렌더링 될 금액의 라벨을 설정합니다.
            <span class="attr-detail">
              주의) 필수 입력입니다.<br>
              예시) 1000원
            </span>
          </p>
				</div>
				<div class="vir-div"></div>
			</div>
			<div>
				<div class="attr-text">
					<p class="attr-title">결제 금액</p>
					<p class="attr-explanation">결제 금액을 입력합니다.
            <span class="attr-detail">주의) 필수 입력이며 숫자만 입력 가능합니다.</span>
            <span class="attr-detail">예시) 1000</span><br>
          </p>
				</div>
				<div class="vir-div"></div>
			</div>
      <div>
				<div class="attr-text">
					<p class="attr-title">면세 금액</p>
					<p class="attr-explanation">
            면세 금액을 입력합니다. 미입력시 0원으로 설정됩니다.
            <span class="attr-detail">
              주의) 숫자만 입력 가능합니다.<br>
              기본값) 0<br>
              예시) 100
          </p>
				</div>
				<div class="vir-div"></div>
			</div>
		</div>

		<h3>4. 커스텀 필드</h3>
		<div class="shortcode-box">
      <img src="<?=plugin_dir_url( __FILE__ )?>../../assets/img/single_fields.png" class="attr-img">
			<div class="attr-text">
				<p class="attr-title">입력 유형<img src="<?=plugin_dir_url( __FILE__ )?>../../assets/img/tag-1.png" class="attr-tag"></p>
				<p class="attr-explanation">
          사용자로부터 입력 받을 값의 종류를 선택합니다.
					<span class="attr-detail">
            [텍스트]: 텍스트를 입력 받습니다.<br>
            [파일 첨부]: 파일을 첨부 받습니다.<br>
            [주소]: 주소를 입력 받습니다.<br>
            [약관 동의]: 약관 동의 여부를 입력 받습니다.<br>
            [복수 선택]: 복수 선택 가능한 값을 입력 받습니다.<br>
            [단일 선택(라디오)]: 단일 선택 가능한 값을 입력 받습니다.<br>
            [단일 선택(드롭다운)]: 단일 선택 가능한 값을 입력 받습니다.
          </span>
				</p>

				<p class="attr-title">입력 라벨<img src="<?=plugin_dir_url( __FILE__ )?>../../assets/img/tag-2.png" class="attr-tag"></p>
				<p class="attr-explanation">
          입력 필드의 라벨을 설정합니다.
					<span class="attr-detail">예시) 성별</span>
				</p>

				<p class="attr-title">필수 입력 / 선택 여부<img src="<?=plugin_dir_url( __FILE__ )?>../../assets/img/tag-3.png" class="attr-tag"></p>
				<p class="attr-explanation">
          입력 필드의 필수 입력 / 선택 여부를 결정합니다.<br>
          필수 입력 / 선택으로 설정한 경우, 유저가 미 입력 / 선택시 결제가 진행되지 않습니다.
				</p>
			</div>
			<div class="vir-div"></div>
		</div>

    <h3>4-1. 약관 동의 필드</h3>
		<div class="shortcode-box">
      <img src="<?=plugin_dir_url( __FILE__ )?>../../assets/img/agreement_fields.png" class="attr-img">
			<div class="attr-text">
				<p class="attr-title">약관 라벨<img src="<?=plugin_dir_url( __FILE__ )?>../../assets/img/tag-4.png" class="attr-tag"></p>
				<p class="attr-explanation">
          약관의 이름을 결정합니다.
					<span class="attr-detail">
            주의) 필수 입력입니다.<br>
						예시) 개인 정보 이용 제공 동의
					</span>
				</p>

				<p class="attr-title">약관 링크<img src="<?=plugin_dir_url( __FILE__ )?>../../assets/img/tag-5.png" class="attr-tag"></p>
				<p class="attr-explanation">
          약관이 명시된 링크를 설정합니다.
					<span class="attr-detail">
            주의) 필수 입력이며, 유효한 URL만 입력 가능합니다.<br>
						예시) https://admin.iamport.kr/pages/terms
					</span>
				</p>
			</div>
			<div class="vir-div"></div>
		</div>

    <h3>4-2. 복수 선택 / 단일 선택 필드</h3>
		<div class="shortcode-box">
      <img src="<?=plugin_dir_url( __FILE__ )?>../../assets/img/multiple_fields.png" class="attr-img">
			<div class="attr-text">
				<p class="attr-title">입력 옵션</p>
				<p class="attr-explanation">
					선택 가능한 옵션의 종류를 설정합니다.
					<span class="attr-detail">
						주의) 적어도 1개 이상의 옵션을 입력해야 합니다.
					</span>
				</p>
			</div>
			<div class="vir-div"></div>
		</div>
        
		<h3>5. 주의사항</h3>
		<div class="shortcode-box">
			<p class="attr-explanation">- 입력 라벨은 중복될 수 없습니다.</p>
			<p class="attr-explanation">- 복수 선택 / 단일 선택 필드에 대해, 입력 옵션은 중복될 수 없습니다.</p>
			<p class="attr-explanation">- 약관 동의 필드에 대해, 약관 라벨은 중복될 수 없습니다.</p>
		</div>
	</div>
<?php
	$iamport_shortcode_page = ob_get_clean();

	return $iamport_shortcode_page;
