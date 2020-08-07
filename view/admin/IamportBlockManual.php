<?php
	wp_register_style('iamport-block-manual-css', plugins_url('../../assets/css/iamport-block-manual.css', __FILE__), array(), "20180730");
  wp_enqueue_style('iamport-block-manual-css');
  
  wp_register_style('iamport-block-common-css', plugins_url('../../assets/css/iamport-block-common.css', __FILE__), array(), "20180730");
	wp_enqueue_style('iamport-block-common-css');

	ob_start();
?>
	<div class="iamport-block-container iamport-manual">
		<h1>아임포트 블록 매뉴얼</h1>

		<div class="iamport-block-box">
      <h2><span>STEP1</span>아임포트 일반결제 블록 추가</h2>
      <div class="iamport-block-left">
        <p>
          페이지에서 + 버튼을 누르면 아래와 같이 워드프레스가 기본적으로 제공하는 위젯의 목록을 확인 할 수 있습니다. 이 중 <code>아임포트 일반결제</code> 블록을 찾아 선택하면 페이지에 결제 창을 커스터마이징 할 수 있는 화면이 생성됩니다.
        </p>
        <p>
          위젯의 종류가 많아 <code>아임포트 일반결제</code> 블록을 찾는데 어려움이 있으신 경우, <code>아임포트 일반결제</code>라는 키워드로 블록을 검색 하실 수 있습니다. 또한 <code>공통 블록</code> 카테고리를 선택하시면 보다 빠르게 <code>아임포트 일반결제</code> 블록을 찾으실 수 있습니다.
        </p>
      </div>
      <div class="iamport-block-left iamport-text-center">
        <img src="<?=plugin_dir_url( __FILE__ )?>../../assets/img/add-block.png" alt="아임포트 블록 추가"/>
      </div>
      <div class="iamport-block-clear"></div>
		</div>

    <div class="iamport-block-box">
      <h2><span>STEP2</span>기본 필드 설정하기</h2>
      <h3><span>1</span>결제 버튼 라벨</h3>
      <div class="iamport-block-left">
        <p>페이지에 렌더링되는 결제 버튼의 라벨을 결정합니다. 기본값은 <code>결제하기</code>입니다.</p>
      </div>
      <div class="iamport-block-clear"></div>

      <h3><span>2</span>결제 버튼 클래스 이름</h3>
      <div class="iamport-block-left">
        <p>결제 버튼 스타일을 커스터마이징 하기 위해 클래스 이름을 지정할 수 있습니다.</p>
      </div>

      <div class="iamport-block-left iamport-text-center">
        <img src="<?=plugin_dir_url( __FILE__ )?>../../assets/img/btn-payment.png" alt="결제하기 버튼"/>
      </div>
      <div class="iamport-block-clear"></div>


      <div class="iamport-block-left">
        <h3><span>3</span>결제 버튼 스타일 속성</h3>
        <p>결제 버튼 스타일을 커스터마이징 하기 위해 CSS 속성을 지정할 수 있습니다.</p>
      </div>
      <div class="iamport-block-clear"></div>

      <h3><span>4</span>결제 팝업 클래스 이름</h3>
      <div class="iamport-block-left">
        <p>결제 팝업 스타일을 커스터마이징 하기 위해 클래스 이름을 지정할 수 있습니다.</p>

        <h3><span>5</span>결제 팝업 타이틀</h3>
        <p>결제하기 버튼을 눌렀을때 렌더링되는 팝업의 타이틀을 결정합니다. 기본값은 <code>참가권 결제</code>입니다.</p>

        <h3><span>6</span>결제 팝업 서브 타이틀</h3>
        <p>결제하기 버튼을 눌렀을때 렌더링되는 팝업의 서브 타이틀을 결정합니다. 기본값은 <code>아래의 정보를 입력 후 결제버튼을 클릭해주세요</code>입니다.</p>
      </div>
      <div class="iamport-block-left iamport-text-center">
        <img src="<?=plugin_dir_url( __FILE__ )?>../../assets/img/payment-modal.png" alt="결제 팝업"/>
      </div>
      <div class="iamport-block-clear"></div>

      <h3><span>7</span>주문명</h3>
      <div class="iamport-block-left">
        <p>해당 결제에 대한 주문명을 결정합니다. 기본값은 <code>아임포트 워드프레스 블록 플러그인 주문</code>입니다.</p>
      </div>
      <div class="iamport-block-left iamport-text-center">
        <img src="<?=plugin_dir_url( __FILE__ )?>../../assets/img/payment-name.png" alt="주문명">
      </div>
      <div class="iamport-block-clear"></div>

      <h3><span>8</span>결제 수단</h3>
      <div class="iamport-block-left">
        <p>
          사용자가 선택 가능한 결제 수단을 설정합니다. 선택 가능한 결제수단은 <code>카카오페이</code>, <code>삼성페이</code>, <code>신용카드</code>, <code>가상계좌</code>, <code>실시간 계좌이체</code>, <code>휴대폰 소액결제</code> 그리고 <code>페이팔</code>이며 적어도 한 개 이상을 선택해야 합니다. 결제수단 마다 지원하는 PG사가 상이합니다.
        </p>
        <p>
          결제 수단에 따라 PG사와 PG 상점아이디를 설정할 수 있습니다. 하나의 PG사에 대해 서로 다른 PG 상점아이디를 갖고 있는 경우, 이를 구분하기 위해 PG 상점아이디 값을 지정할 수 있습니다. 예를 들어 아임포트 관리자페이지에 PG설정이 아래와 같다고 가정합니다.
        </p>
        <ul>
          <li>- KG이니시스(<code>PG 상점아이디: A, 기본 PG)</code></li>
          <li>- KG이니시스(<code>PG 상점아이디: B)</code></li>
          <li>- 다날(<code>PG 상점아이디: C)</code></li>
        </ul>
      </div>
      <div class="iamport-block-left iamport-text-center">
        <img src="<?=plugin_dir_url( __FILE__ )?>../../assets/img/payment-methods.png" alt="결제 수단">
      </div>
      <div class="iamport-block-clear"></div>

      <div class="iamport-block-left">
        <p>
          이때 삼성페이는<code>KG이니시스(PG 상점아이디: A)</code>, 신용카드는 <code>KG이니시스(PG 상점아이디: B)</code> 그리고 가상계좌는 <code>다날</code>로 설정하고 싶다면 오른쪽과 같이 설정해주시면 됩니다.
        </p>
      </div>
      <div class="iamport-block-left iamport-text-center">
        <img src="<?=plugin_dir_url( __FILE__ )?>../../assets/img/payment-methods-example.png" alt="결제 수단 설정 예시">
      </div>
      <div class="iamport-block-clear"></div>

      <h3><span>9</span>신용카드 할부 개월수</h3>
      <div class="iamport-block-left">
        <p>신용카드 결제수단 선택시, 사용자에게 허용할 최대 할부 개월수를 설정합니다. 기본값은 <code>PG사 기본 제공 옵션</code>입니다.</p>
      </div>
      <div class="iamport-block-left iamport-text-center">
        <img src="<?=plugin_dir_url( __FILE__ )?>../../assets/img/card-quota.png" alt="기본 필드">
      </div>
			<div class="iamport-block-clear"></div>

      <h3><span>10</span>가상계좌 입금 기한</h3>
      <div class="iamport-block-left">
        <p>가상계좌 결제수단 선택시, 가상계좌 입금 기한을 반드시 설정해야 합니다. 기본값은 <code>PG사 기본 제공 옵션</code>입니다.</p>
      </div>
      <div class="iamport-block-left iamport-text-center">
        <img src="<?=plugin_dir_url( __FILE__ )?>../../assets/img/vbank-due.png" alt="가상계좌 입금 기한">
      </div>
			<div class="iamport-block-clear"></div>

      <h3><span>11</span>실물 컨텐츠 여부</h3>
      <div class="iamport-block-left">
        <p>휴대폰 소액결제 결제수단 선택시, 구매하는 상품의 실물 컨텐츠 여부를 반드시 설정해야 합니다. 기본값은 <code>false(비 실물)</code>입니다.</p>
      </div>
      <div class="iamport-block-left iamport-text-center">
        <img src="<?=plugin_dir_url( __FILE__ )?>../../assets/img/is-digital.png" alt="실물 컨텐츠 여부">
      </div>
			<div class="iamport-block-clear"></div>

      <h3><span>12</span>결제 후 이동 될 URL</h3>
      <div class="iamport-block-left">
        <p>결제가 완료된 후 이동될 URL을 지정합니다. 유효한 URL만 입력 가능하며, 유효하지 않은 값을 입력했을 경우 아임포트가 기본으로 제공하는 페이지로 이동됩니다.</p>
      </div>
      <div class="iamport-block-left iamport-text-center">
        <img src="<?=plugin_dir_url( __FILE__ )?>../../assets/img/redirect-after.png" alt="결제 후 이동 될 URL">
      </div>
			<div class="iamport-block-clear"></div>
    </div>

		<div class="iamport-block-box">
      <h2><span>STEP3</span>결제 금액 필드 설정하기</h2>

      <h3><span>1</span>금액 유형</h3>
      <div class="iamport-block-left">
        <p>구매자가 결제할 금액을 커스터마이징 할 수 있습니다. 선택 가능한 금액 유형은 아래와 같습니다.</p>
        <ul>
          <li>-<code>고정형</code>: 구매자가 항상 정해진 금액으로 결제하는 방식</li>
          <li>-<code>가변형</code>: 구매자가 결제할 금액을 직접 입력하는 방식(면세금액 설정 불가)</li>
          <li>-<code>고정형</code>: 구매자가 결제할 금액을 N개의 옵션 중 선택하는 방식</li>
          <li>-<code>무료형</code>: 구매자가 기부하는 방식(결제가 진행되지는 않지만 결제내역에 데이터가 쌓임)</li>
        </ul>
      </div>
      <div class="iamport-block-left iamport-text-center">
        <img src="<?=plugin_dir_url( __FILE__ )?>../../assets/img/amount-fields.png" alt="결제 금액 필드"/>
      </div>
      <div class="iamport-block-clear"></div>

      <h3><span>2</span>화폐 단위</h3>
      <div class="iamport-block-left">
        <p>결제 할 화폐 단위를 선택합니다. 기본값은 <code>₩</code>이며 설정하신 화폐 단위는 결제창에 오른쪽과 같이 표기됩니다. 아래와 같이 PG사에 따라 지원하는 통화의 종류에 차이가 있고 특약을 맺어야 하는 경우도 있으니 이용에 참고 부탁드립니다.</p>
        <ul>
          <li>-<code>₩(KRW)</code>: 페이팔을 제외한 모든 PG사</li>
          <li>-<code>$(USD)</code>: 페이팔, 나이스정보통신</li>
          <li>-<code>€(EUR)</code>: 페이팔</li>
          <li>-<code>¥(JPY)</code>: 페이팔</li>
        </ul>
      </div>
      <div class="iamport-block-left iamport-text-center">
        <img src="<?=plugin_dir_url( __FILE__ )?>../../assets/img/currency-example.png" alt="결제 통화 예시"/>
      </div>
      <div class="iamport-block-clear"></div>

      <h3><span>3</span>금액 옵션</h3>
      <div class="iamport-block-left">
        <p>
          <code>선택형</code>과 <code>고정형</code> 금액에 대해, 금액 옵션을 설정할 수 있습니다. 특히 <code>선택형</code> 금액의 경우, 하단의 + 버튼을 통해 옵션을 새로 추가할 수도 있고, 오른쪽 X 버튼을 통해 추가한 옵션을 삭제할 수도 있습니다.
        </p>
        <p>각 옵션에 대해 아래 3가지 항목을 설정할 수 있습니다.</p>
        <ul>
          <li>- <code>금액 라벨</code>: 결제 창에 노출될 결제 금액의 라벨</li>
          <li>- <code>결제 금액</code>: 실제로 결제될 금액(숫자만 입력 가능)</li>
          <li>- <code>면세 금액</code>: 면세 금액(결제 금액보다 작은 숫자만 입력 가능, 미 입력시 0원으로 설정됨)</li>
        </ul>
      </div>
      <div class="iamport-block-left iamport-text-center">
        <img src="<?=plugin_dir_url( __FILE__ )?>../../assets/img/amount-options.png" alt="결제 금액 옵션"/>
      </div>
      <div class="iamport-block-clear"></div>
		</div>

		<div class="iamport-block-box">
      <h2><span>STEP4</span>커스텀 필드 설정하기</h2>
      <div class="iamport-block-left">
        <p>결제 정보 외에, 사용자로부터 가맹점 자체적으로 추가 입력 받을 필드를 설정할 수 있습니다. 오른쪽 그림의 <code>필드 추가</code> 버튼을 통해 입력 받을 새 필드를 추가할 수 있고, <code>필드 삭제</code> 버튼을 통해 추가된 필드를 삭제할 수 있습니다.</p>
        <p>입력 받은 커스텀 필드는, 결제 후 아임포트 결제내역 테이블의 <code>부가정보</code> 칼럼에서 확인하실 수 있습니다.</p>
      </div>
      <div class="iamport-block-left iamport-text-center">
        <img src="<?=plugin_dir_url( __FILE__ )?>../../assets/img/custom-fields.png" alt="커스텀 필드"/>
      </div>
      <div class="iamport-block-clear"></div>

      <h3><span>1</span>입력 유형</h3>
      <div class="iamport-block-left">
        <p>사용자로부터 입력 받을 값의 입력 방법을 선택할 수 있습니다. 가능한 종류는 아래와 같습니다.</p>
        <ul>
          <li>-<code>텍스트</code>: 텍스트</li>
          <li>-<code>파일 첨부</code>: 파일</li>
          <li>-<code>주소</code>: 주소</li>
          <li>-<code>약관 동의</code>: 결제 전 사용자 동의가 필요한 약관</li>
          <li>-<code>복수 선택</code>: 복수 선택 값</li>
          <li>-<code>단일 선택(라디오/드롭다운)</code>: 단일 선택 값</li>
        </ul>
        <p>
          첨부된 실제 파일은 워드프레스 프로젝트 폴더 > wp-content 폴더 > uploads 폴더 내부에 위치하며, <code>아임포트 결제내역</code> 페이지 <code>첨부파일</code> 칼럼에서도 확인하실 수 있습니다.
        </p>
      </div>
      <div class="iamport-block-clear"></div>

      <h3><span>2</span>입력 라벨</h3>
      <div class="iamport-block-left">
        <p>사용자로 부터 입력 받을 필드의 이름을 지정합니다. 이 값은 반드시 유일한 값이어야 합니다. 즉, 같은 <code>입력 라벨</code> 값을 갖는 커스텀 필드가 존재해서는 안됩니다.</p>
      </div>
      <div class="iamport-block-clear"></div>

      <h3><span>3</span>필수 입력/선택 여부</h3>
      <div class="iamport-block-left">
        <p>사용자로부터 해당 필드를 필수로 입력 또는 선택 해야하는지 여부를 사전에 설정할 수 있습니다. 필수 입력/선택 하도록 설정된 필드에 대해 유저가 값을 입력하지 않으면 결제가 진행되지 않습니다.</p>
      </div>
      <div class="iamport-block-clear"></div>

      <h3><span>4</span>입력 힌트</h3>
      <div class="iamport-block-left">
        <p>텍스트 유형의 입력 필드의 경우, 입력 값에 대해 사용자에게 제공할 힌트를 설정할 수 있습니다.</p>
      </div>
      <div class="iamport-block-clear"></div>

      <h3><span>5</span>입력 옵션</h3>
      <div class="iamport-block-left">
        <p><code>복수 선택</code>, <code>단일 선택(라디오/드롭다운)</code> 유형의 필드는 유저로부터 입력/선택 가능한 옵션을 제공해야 합니다. 오른쪽 그림 속 + 버튼을 통해 새 옵션을 추가할 수 있고, X 버튼을 통해 추가된 옵션을 삭제할 수 있습니다.</p>
        <p>옵션 값은 1개 이상 입력해야 하며, 각 옵션 값은 하나의 필드에 대해 반드시 유일한 값이어야 합니다.</p>
      </div>
      <div class="iamport-block-left iamport-text-center">
        <img src="<?=plugin_dir_url( __FILE__ )?>../../assets/img/multiple-fields.png" alt="복수/단일 선택 옵션"/>
      </div>
      <div class="iamport-block-clear"></div>

      <h3><span>6</span>약관 옵션</h3>
      <div class="iamport-block-left">
        <p><code>약관 동의</code> 유형의 필드는 유저가 약관을 확인할 수 있도록 약관이 명시된 <code>링크</code>를 설정하거나 약관 <code>전문</code>을 직접 표기해야 합니다. 하나의 약관 동의 필드에 대해, 2개 이상의 약관을 설정할 수 있으며 위 <code>복수/단일 선택</code> 필드 처럼 약관을 추가 또는 삭제할 수 있습니다. 이때 <code>약관 라벨</code>값은 반드시 유일한 값이어야 합니다.</p>
      </div>
      <div class="iamport-block-left iamport-text-center">
        <img src="<?=plugin_dir_url( __FILE__ )?>../../assets/img/agreement-fields.png" alt="약관 동의 옵션"/>
      </div>
      <div class="iamport-block-clear"></div>
		</div>
	</div>
<?php
	$iamport_shortcode_page = ob_get_clean();

	return $iamport_shortcode_page;
