=== Plugin Name ===
Contributors: iamport
Donate link: http://www.iamport.kr
Tags: payment, payment-button, iamport, woocommerce, button, pg, gateway, block
Requires at least: 5.2.3
Tested up to: 5.4.2
Stable tag: 0.9.0
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

블록을 활용해 아임포트 결제 버튼을 어디서든 생성. 신용카드, 실시간계좌이체, 가상계좌, 휴대폰소액결제, 카카오페이, 페이팔 지원.


== Description ==

아임포트 서비스 하나면 국내 여러 PG사들의 결제 기능을 표준화된 동일한 방식으로 사용할 수 있습니다.<br>
아임포트 블록 플러그인은 아임포트 서비스를 어디서든 쉽게 이용할 수 있도록 "결제 버튼"을 생성해주는 "블록"을 포함하고 있습니다.<br>
신용카드, 실시간계좌이체, 가상계좌, 휴대폰소액결제, 카카오페이, 페이팔 그리고 삼성페이를 지원합니다.


== Action Hook ==

= 아임포트 블록 플러그인이 제공하는 action hook =
*   `iamport_button_order_status_changed` : 아임포트 주문 데이터 상태가 변경되었을 때 호출뢰며 $old\_status, $new\_status, $iamport\_order, $iamport\_api\_response 4개의 파라메터를 제공합니다.
    * status
        * ready : 미결제
        * paid : 결제완료
        * failed : 결제실패
        * cancelled : 환불됨
        * awaiting-vbank : 가상계좌 입금대기중
    * iamport\_order : model/IamportBlockOrder.php 참조
    * iamport\_api\_response : [아임포트 REST API](https://api.iamport.kr/#!/payments/getPaymentByImpUid) 의 응답필드 참조


== Frequently Asked Questions ==
= 아임포트 서비스 소개 =
http://www.iamport.kr
= 아임포트 관리자 페이지 =
https://admin.iamport.kr
= 아임포트 결제 데이터 분석 페이지 =
https://analytics.iamport.kr
= 고객센터 =
1670-5176 / cs@iamport.kr(고객지원 문의) / support@iamport.kr(기술지원 문의)


== Installation ==

아임포트 관리자 페이지(https://admin.iamport.kr)에 회원가입을 하면 "시스템 설정" 탭에 가맹점 정보("가맹점 식별코드", "REST API키", "REST API Secret")가 설정됩니다. 아임포트 블록 플러그인을 설치한 후 왼쪽 네비게이션 메뉴에 생성되는 "아임포트 설정" 페이지에 이 가맹점 정보를 그대로 입력 후 저장해주세요.

1. 다운받은 iamport-block.zip 파일을 압축 해제 후 `/wp-content/plugins/` 디렉토리에 복사합니다.
2. "워드프레스 관리자페이 > 왼쪽 네비게이션 메뉴 플러그인 > 설치 된 플러그인" 페이지에서 "아임포트 블록" 플러그인을 활성화합니다.
4. 아임포트 관리자페이지에서 회원가입을 합니다. 로그인 하면 "시스템 설정" 탭에 가맹점 정보("가맹점 식별코드", "REST API키", "REST API Secret")가 설정되어있는 것을 확인할 수 있습니다.
5. "워드프레스 관리자페이지 > 왼쪽 네비게이션 메뉴 아임포트 결제설정" 페이지에서 위 가맹점 정보를 그대로 입력 후 저장합니다.


== Changelog ==
= 0.9.0 =
* 아임포트 블록 플러그인 최초 배포
* 일반결제 기능 제공
