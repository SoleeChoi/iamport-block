<?php
	wp_register_style('iamport-shortcode-page-css', plugins_url('../../assets/css/iamport-shortcode-page.css', __FILE__), array(), "20180730");
	wp_enqueue_style('iamport-shortcode-page-css');

	ob_start();
?>
	<div class="wrap iamport-manual-page">
		<h2>아임포트 블록 메뉴얼</h2>
		<h3>1. [iamport_payment_button] 숏코드를 추가하면, "아임포트 결제버튼"이 생성됩니다</h3>
		<div class="shortcode-box">
			<img src="<?=plugin_dir_url( __FILE__ )?>../../assets/img/payment-button.png">
			<p class="attr-explanation">'결제하기' 문구는 텍스트 외에 이미지 또는 HTML이 사용될 수도 있습니다.</p>
			<div class="vir-div"></div>
			<p class="attr-explanation attr-detail">예시) [iamport_payment_button title="참가권 결제" description="아래 정보를 기입 후 결제진행해주세요." name="양평캠프 1박2일권" amount="1000" pay_method_list="kakaopay,samsung,card,trans,vbank,phone"]결제하기[/iamport_payment_button]</p>
		</div>
		<h3>2. "아임포트 결제버튼"을 클릭하면 결제정보 입력 팝업이 나타납니다</h3>
		<h4>사용자가 원하는 결제수단을 선택하고, 개인 정보를 입력한 후 "결제하기" 버튼을 누르면 PG사의 결제창이 호출되어 결제가 진행됩니다.</h4>
		<div class="shortcode-box">
			<div class="attr-text">
				<p class="attr-title">title<img src="<?=plugin_dir_url( __FILE__ )?>../../assets/img/tag-1.png" class="attr-tag"></p>
				<p class="attr-explanation">
					팝업 상단의 타이틀을 결정합니다.<br>
					<span class="attr-detail">기본값) '결제하기'</span>
				</p>

				<p class="attr-title">description<img src="<?=plugin_dir_url( __FILE__ )?>../../assets/img/tag-2.png" class="attr-tag"></p>
				<p class="attr-explanation">
					팝업 상단의 설명문구를 결정합니다.<br>
					<span class="attr-detail">기본값) '아래의 정보를 입력 후 결제버튼을 클릭해주세요'</span>
				</p>

				<p class="attr-title">amount<img src="<?=plugin_dir_url( __FILE__ )?>../../assets/img/tag-3.png" class="attr-tag"></p>
				<p class="attr-explanation">
					결제받으실 금액을 결정합니다. (면세금액이 포함되어있다면 tax_free 속성을 함께 사용해주세요.)<br>
					<span class="attr-detail">상세) 아래 3.금액옵션 상세 참고</span>
				</p>

				<p class="attr-title">pay_method_list<img src="<?=plugin_dir_url( __FILE__ )?>../../assets/img/tag-4.png" class="attr-tag"></p>
				<p class="attr-explanation">
					사용자가 선택할 수 있는 결제수단을 결정합니다.<br>
					<span class="attr-detail">
						종류) kakaopay(카카오페이), samsung(삼성페이), card(신용카드), trans(실시간계좌이체), vbank(가상계좌), phone(휴대폰소액결제), paypal(페이팔)<br>
						예시) pay_method_list="kakao,samsung,card,trans,vbank,phone,paypal"<br/>
						주의) <i>samsung(삼성페이)는 KG이니시스 전용입니다.</i>
					</span>
				</p>

				<p class="attr-title">field_list<img src="<?=plugin_dir_url( __FILE__ )?>../../assets/img/tag-5.png" class="attr-tag"></p>
				<p class="attr-explanation">
					사용자가 입력해야하는 개인 정보를 결정합니다.<br>
					<span class="attr-detail">
						종류) email(이메일주소), name(이름), phone(전화번호), shipping_addr(배송주소)<br>
						예시) field_list="name,email,phone,shipping_addr"<br>
						주의) <i>PG사에 따라 email, name, phone 3가지 정보는 반드시 입력되어야 결제가 진행되는 경우도 있습니다.</i>
					</span>
				</p>
				<p class="attr-explanation">
					<b>name(받으시는 분)</b>과 같이 괄호를 이용해 필드명을 원하는 명칭으로 지정할 수 있습니다.<br>
					<span class="attr-detail">
						예시) field_list="name(받으시는 분),email,phone,shipping_addr(수령지)"<br>
					</span>
				</p>
				<p class="attr-explanation">
					<b>name(받으시는 분|한글만 입력해주세요)</b>과 같이 괄호 및 | 기호를 이용해 필드명과 placeholder를 원하는 명칭으로 지정할 수 있습니다.<br>
					<i>필드명만 지정된 경우 placeholder는 필드명과 동일하게 설정됩니다.</i>
					<span class="attr-detail">
						예시) field_list="name(받으시는 분|한글만 입력해주세요),email,phone(전화번호|070전화번호 입력금지),shipping_addr(수령지)"<br>
					</span>
				</p>

				<p class="attr-title">style</p>
				<p class="attr-explanation">
					숏코드가 생성하는 "결제하기"버튼에 적용될 HTML style속성을 지정합니다.<br>
					<span class="attr-detail">
						기본값) 'display:inline-block;padding:6px 12px;color:#fff;background-color:#2c3e50'<br>
						주의) <i>아래의 class속성이 적용되면, style속성은 무시되며, 기본값도 적용되지 않습니다.</i></p>
					</span>

				<p class="attr-title">class</p>
				<p class="attr-explanation">숏코드가 생성하는 "결제하기"버튼에 적용될 css class속성을 지정합니다.<br>class속성이 설정되면 결제버튼에 style속성은 적용되지 않습니다.</p>

				<p class="attr-title">name</p>
				<p class="attr-explanation">
					해당 결제에 대한 주문명을 의미합니다.<br>
					<span class="attr-detail">예시) name="1박2일 참가권 결제"</span>
				</p>

				<p class="attr-title">redirect_after</p>
				<p class="attr-explanation">
					결제완료처리 후 이동될 별도의 웹 페이지를 지정합니다.<br>
					<span class="attr-detail">예시) redirect_after="http://www.iamport.kr"</span>
				</p>

                <p class="attr-title">pg_for_card</p>
                <p class="attr-explanation">
                    신용카드 결제수단에 대해 [아임포트 설정]페이지 내 PG설정값 대신 적용할 PG설정값(아임포트 복수PG기능 참조)<br>
                    <span class="attr-detail">예시) pg_for_card="kcp" 또는 pg_for_card="kcp.T0000"</span>
                </p>

                <p class="attr-title">pg_for_trans</p>
                <p class="attr-explanation">
                    실시간계좌이체 결제수단에 대해 [아임포트 설정]페이지 내 PG설정값 대신 적용할 PG설정값(아임포트 복수PG기능 참조)<br>
                    <span class="attr-detail">예시) pg_for_trans="kcp" 또는 pg_for_trans="kcp.T0000"</span>
                </p>

                <p class="attr-title">pg_for_vbank</p>
                <p class="attr-explanation">
                    가상계좌 결제수단에 대해 [아임포트 설정]페이지 내 PG설정값 대신 적용할 PG설정값(아임포트 복수PG기능 참조)<br>
                    <span class="attr-detail">예시) pg_for_vbank="kcp" 또는 pg_for_vbank="kcp.T0000"</span>
                </p>

                <p class="attr-title">pg_for_phone</p>
                <p class="attr-explanation">
                    휴대폰소액결제 결제수단에 대해 [아임포트 설정]페이지 내 PG설정값 대신 적용할 PG설정값(아임포트 복수PG기능 참조)<br>
                    <span class="attr-detail">예시) pg_for_phone="kcp" 또는 pg_for_phone="kcp.T0000"</span>
                </p>

                <p class="attr-title">pg_for_kakaopay</p>
                <p class="attr-explanation">
                    카카오페이 결제수단에 대해 [아임포트 설정]페이지 내 PG설정값 대신 적용할 PG설정값(아임포트 복수PG기능 참조)<br>
                    <span class="attr-detail">예시) pg_for_kakaopay="TC0ONETIME"</span>
                </p>

                <p class="attr-title">pg_for_paypal</p>
                <p class="attr-explanation">
                    Paypal 결제수단에 대해 [아임포트 설정]페이지 내 PG설정값 대신 적용할 PG설정값(아임포트 복수PG기능 참조)<br>
                    <span class="attr-detail">예시) pg_for_paypal="your-facilitator_api1.iamport.kr"</span>
                </p>
			</div>
			<img src="<?=plugin_dir_url( __FILE__ )?>../../assets/img/payment-modal.jpg" class="attr-img">
			<div class="vir-div"></div>
		</div>

		<h3>3. 금액옵션 상세</h3>
		<div class="shortcode-box">
			<div>
				<div class="attr-text">
					<p class="attr-title">고정금액형</p>
					<p class="attr-explanation">
						amount속성을 다음과 같이 설정하면 항상 지정된 금액으로 결제가 이뤄집니다.<br>
						<span class="attr-detail">예시) [iamport_payment_button amount="1000"]결제하기[/iamport_payment_button]</span>
                        면세금액이 포함되어있다면 tax_free 속성을 다음과 같이 설정합니다. (1,000원 중 면세금액 : 300원 / 과세금액 : 700원)<br>
						<span class="attr-detail">예시) [iamport_payment_button amount="1000" tax_free="300"]결제하기[/iamport_payment_button]</span>
                    </p>
				</div>
				<img src="<?=plugin_dir_url( __FILE__ )?>../../assets/img/amount-fixed.jpg" class="attr-img" style="margin-bottom:2em;">
				<div class="vir-div"></div>
			</div>
			<div>
				<div class="attr-text">
					<p class="attr-title">금액선택형</p>
					<p class="attr-explanation">
						금액 선택지 중 하나를 구매자가 직접 골라 결제할 수 있도록 합니다.<br>
						<span class="attr-detail">예시) [iamport_payment_button amount="2000,3000,4000"]결제하기[/iamport_payment_button]</span>
                        면세금액이 포함되어있다면 tax_free 속성을 amount와 순서에 맞춰 설정합니다.(2,000원 결제 중 면세금액 800원 / 3,000원은 면세금액 없음 / 4,000원은 모두 면세금액)<br>
                        <span class="attr-detail">예시) [iamport_payment_button amount="2000,3000,4000" tax_free="800,0,4000"]결제하기[/iamport_payment_button]</span>
                    </p>
				</div>
				<img src="<?=plugin_dir_url( __FILE__ )?>../../assets/img/amount-choose.jpg" class="attr-img" style="margin-bottom:2em;">
				<div class="vir-div"></div>
			</div>
			<div>
				<div class="attr-text">
					<p class="attr-title">가변형</p>
					<p class="attr-explanation">
						구매자가 입력하는만큼 결제가 이뤄지도록 합니다. (면세금액 지원되지 않음)<br>
						<span class="attr-detail">예시) [iamport_payment_button amount="variable"][/iamport_payment_button]</span></p>
				</div>
				<img src="<?=plugin_dir_url( __FILE__ )?>../../assets/img/amount-change.jpg" class="attr-img" style="margin-bottom:2em;">
				<div class="vir-div"></div>
			</div>
			<div>
				<div class="attr-text">
					<p class="attr-title">라벨형</p>
					<p class="attr-explanation">
						각 금액에 라벨을 함께 표시합니다.<br>
						<span class="attr-detail">예시) [iamport_payment_button amount="1000원(어린이),2000원(학생),3000원(어른)"][/iamport_payment_button]</span>
                        면세금액이 포함되어있다면 tax_free 속성을 amount와 순서에 맞춰 설정합니다.(1,000원 결제 중 면세금액 800원 / 2,000원은 면세금액 없음 / 3,000원은 모두 면세금액)<br>
                        <span class="attr-detail">예시) [iamport_payment_button amount="1000원(어린이),2000원(학생),3000원(어른)" tax_free="800,0,3000"]결제하기[/iamport_payment_button]</span>
                    </p>
				</div>
				<img src="<?=plugin_dir_url( __FILE__ )?>../../assets/img/amount-label.jpg" class="attr-img">
				<div class="vir-div"></div>
			</div>
		</div>

		<h3>4. 추가 입력 필드</h3>
		<h4>[iamport_payment_button] 숏코드 내에 <b>[iamport_payment_button_field]</b> 숏코드를 추가하면, 다음과 같이 추가 정보를 입력받을 수 있는 필드가 확장됩니다.<br></h4>
		<div class="shortcode-box">
			<div class="attr-text">
				<p class="attr-title">텍스트 입력<img src="<?=plugin_dir_url( __FILE__ )?>../../assets/img/tag-1.png" class="attr-tag"></p>
				<p class="attr-explanation">
					<span class="attr-detail">
						옵션) type="text"<br>
						예시) [iamport_payment_button_field <b>type="text"</b>]소속[/iamport_payment_button_field]
					</span>
				</p>

				<p class="attr-title">단일 선택1<img src="<?=plugin_dir_url( __FILE__ )?>../../assets/img/tag-2.png" class="attr-tag"></p>
				<p class="attr-explanation">
					<span class="attr-detail">
						옵션) type="select"<br>
						예시) [iamport_payment_button_field <b>type="select" options="1일차,2일차"</b>]참가일자[/iamport_payment_button_field]
					</span>
				</p>

				<p class="attr-title">단일 선택2<img src="<?=plugin_dir_url( __FILE__ )?>../../assets/img/tag-3.png" class="attr-tag"></p>
				<p class="attr-explanation">
					<span class="attr-detail">
						옵션) type="radio"<br>
						예시) [iamport_payment_button_field <b>type="radio" options="개발팀,기획팀,디자인팀"</b>]참가팀[/iamport_payment_button_field]
					</span>
				</p>
			</div>
			<img src="<?=plugin_dir_url( __FILE__ )?>../../assets/img/payment-option-1.jpg" class="attr-img"><br>
			<div class="vir-div"></div>
		</div>
		<div class="shortcode-box">
			<div class="attr-text">
				<p class="attr-title">복수 선택<img src="<?=plugin_dir_url( __FILE__ )?>../../assets/img/tag-4.png" class="attr-tag"></p>
				<p class="attr-explanation">
					<span class="attr-detail">
						옵션) type="check"<br>
						예시) [iamport_payment_button_field <b>type="check" options="사장,차장,과장,대리"</b>]직급[/iamport_payment_button_field]
					</span>
				</p>

				<p class="attr-title">주소 입력<img src="<?=plugin_dir_url( __FILE__ )?>../../assets/img/tag-5.png" class="attr-tag"></p>
				<p class="attr-explanation">
					<span class="attr-detail">
						옵션) type="address"<br>
						예시) [iamport_payment_button_field <b>type="address"</b>]주소[/iamport_payment_button_field]
					</span>
				</p>
			</div>
			<img src="<?=plugin_dir_url( __FILE__ )?>../../assets/img/payment-option-2.jpg" class="attr-img">
			<div class="vir-div"></div>
		</div>
		<div class="shortcode-box">
			<div class="attr-text">
				<p class="attr-title">파일첨부</p>
				<p class="attr-explanation">
					사용자로부터 파일을 첨부받을 수 있습니다.<br>
					첨부된 파일은 워드프레스 프로젝트 폴더 > wp-content 폴더 > uploads 폴더 내부에 위치합니다.<br>
					첨부된 파일 내역은 '아임포트 결제목록' 페이지 '첨부파일' 칼럼에서 확인하실 수 있습니다.<br>
					<span class="attr-detail">
						옵션) type="file"<br>
						예시) [iamport_payment_button_field <b>type="file"</b> placeholder="파일을 업로드해주세요"]파일첨부[/iamport_payment_button_field]
					</span>
				</p>
			</div>
			<img src="<?=plugin_dir_url( __FILE__ )?>../../assets/img/upload-file.jpg" class="attr-img">
			<div class="vir-div"></div>
		</div>
        <div class="shortcode-box">
            <div class="attr-text">
                <p class="attr-title">동의 체크</p>
                <p class="attr-explanation">
                    이용약관동의, 개인정보취급방침동의 등 구매자로부터 동의를 확인받는 경우 동의여부 정보를 기록합니다.<br>
                    <b>required="true"</b> 속성을 선언하면, 반드시 동의체크해야 다음페이지로 진행됩니다.<br>
                    <span class="attr-detail">
						옵션) type="agreement" link="https://www.yoursite.com/agreement"<br>
						예시 1) [iamport_payment_button_field <b>type="agreement"</b> <b>link="https://www.yoursite.com/agreement"</b>]<b>내용확인하러가기</b>[/iamport_payment_button_field]<br>
                            ㄴ 동의 내용을 외부 페이지에서 확인해야하는 경우<br>
                        예시 2) [iamport_payment_button_field <b>type="agreement"</b>]저희 사이트는 고객님으로부터 아래와 같은 내용의 동의를 받고 있습니다. (이하 생략)[/iamport_payment_button_field]<br>
                            ㄴ 동의 내용을 아래에 출력하는 경우<br>
					</span>
                </p>
            </div>
            <img src="<?=plugin_dir_url( __FILE__ )?>../../assets/img/agreement-link.png" style="border:1px solid #eee">
            <img src="<?=plugin_dir_url( __FILE__ )?>../../assets/img/agreement-content.png"  style="border:1px solid #eee">
            <div class="vir-div"></div>
        </div>
		<div class="shortcode-box">
			<div class="attr-text">
				<p class="attr-title">필수입력</p>
				<p class="attr-explanation">
					사용자로부터 정보를 필수적으로 입력하도록 설정할 수 있습니다.<br>
					필수입력 필드는 필드의 명칭 오른쪽 옆에 빨간색 동그라미가 표시됩니다.<br>
					사용자가 필수정보를 입력하지 않으면 경고메시지가 표시됩니다.
					<span class="attr-detail">
						옵션) required="true"<br>
						예시) [iamport_payment_button_field type="text" <b>required="true"</b>]소감[/iamport_payment_button_field]
					</span>
				</p>
			</div>
			<img src="<?=plugin_dir_url( __FILE__ )?>../../assets/img/required.jpg" class="attr-img">
			<div class="vir-div"></div>
		</div>
		<div class="shortcode-box">
			<div class="attr-text">
				<p class="attr-title">텍스트 기본값 (placeholder)</p>
				<p class="attr-explanation">
					텍스트 필드에 대해 기본값(placeholder)을 지정할 수 있습니다.
					<span class="attr-detail">
						옵션) placeholder="이름을 입력해주세요"<br>
						예시) [iamport_payment_button_field type="text" <b>placeholder="이름을 입력해주세요"</b>]이름[/iamport_payment_button_field]
					</span>
				</p>
			</div>
			<img src="<?=plugin_dir_url( __FILE__ )?>../../assets/img/placeholder.jpg" class="attr-img">
			<div class="vir-div"></div>
		</div>

		<h3>5. 결제 데이터 사전 입력</h3>
		<h4>결제에 필요한 데이터(이름, 이메일, 전화번호, 주소)를 미리 입력받을 수 있으며 그 값은 결제를 위한 데이터 입력시 자동으로 반영됩니다.</h4>
		<div class="shortcode-box">
			<div class="attr-text" style="width: 100%;">
				<p class="attr-title">결제자 이름<img src="<?=plugin_dir_url( __FILE__ )?>../../assets/img/tag-1.png" class="attr-tag"></p>
				<p class="attr-explanation">
					<span class="attr-detail">
						옵션) data-for="name"<br>
						예시) [iamport_payment_button_field type="text" <b>data-for="name"</b>]이름[/iamport_payment_button_field]
					</span>
				</p>

				<p class="attr-title">결제자 이메일<img src="<?=plugin_dir_url( __FILE__ )?>../../assets/img/tag-2.png" class="attr-tag"></p>
				<p class="attr-explanation">
					<span class="attr-detail">
						옵션) data-for="email"<br>
						예시) [iamport_payment_button_field type="text" <b>data-for="email"</b>]이메일[/iamport_payment_button_field]
					</span>
				</p>

				<p class="attr-title">결제자 전화번호<img src="<?=plugin_dir_url( __FILE__ )?>../../assets/img/tag-3.png" class="attr-tag"></p>
				<p class="attr-explanation">
					<span class="attr-detail">
						옵션) data-for="phone"<br>
						예시) [iamport_payment_button_field type="text" <b>data-for="phone"</b>]전화번호[/iamport_payment_button_field]
					</span>
				</p>

                <p class="attr-title">결제자 주소<img src="<?=plugin_dir_url( __FILE__ )?>../../assets/img/tag-4.png" class="attr-tag"></p>
                <p class="attr-explanation">
					<span class="attr-detail">
						옵션) data-for="address"<br>
						예시) [iamport_payment_button_field type="address" <b>data-for="address"</b>]주소[/iamport_payment_button_field]<br>
                        주의) type="address" 필드에만 적용됩니다.
					</span>
                </p>
			</div>

			<img src="<?=plugin_dir_url( __FILE__ )?>../../assets/img/pre-write.jpg" class="attr-img" style="margin-right: 1em;">
			<img src="<?=plugin_dir_url( __FILE__ )?>../../assets/img/after-write.jpg" class="attr-img">

			<div class="vir-div"></div>
		</div>

		<h3>6. 주의사항</h3>
		<div class="shortcode-box">
			<p class="attr-title">필드의 명칭은 반드시 기재해주세요.</p>
			<p class="attr-explanation attr-detail">
				잘못된 예시) [iamport_payment_button_field][/iamport_payment_button_field]<br>
				올바른 예시) [iamport_payment_button_field]<b><i>소속</i></b>[/iamport_payment_button_field]
			</p>

			<p class="attr-title">필드의 명칭은 중복되지 않도록 해주세요.</p>
			<p class="attr-explanation attr-detail">
				잘못된 예시) [iamport_payment_button_field]<b><i>소속1</i></b>[/iamport_payment_button_field][iamport_payment_button_field]<b><i>소속1</i></b>[/iamport_payment_button_field]<br>
				올바른 예시) [iamport_payment_button_field]<b><i>소속1</i></b>[/iamport_payment_button_field][iamport_payment_button_field]<b><i>소속2</i></b>[/iamport_payment_button_field]
			</p>
		</div>
	</div>
<?php
	$iamport_shortcode_page = ob_get_clean();

	return $iamport_shortcode_page;
