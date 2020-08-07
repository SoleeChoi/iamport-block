const { __ } = wp.i18n; // Import __() from wp.i18n

export const KEYWORDS = [
  __( '아임포트 블록', 'iamport-block' ),
  __( '아임포트', 'iamport-block' ),
  __( '결제', 'iamport-block' ),
  __( '일반결제', 'iamport-block' ),
  __( '정기결제', 'iamport-block' ),
];

export const COMMON_ATTRIBUTES = {
  buttonName: { // 결제 버튼 라벨
    type: 'string',
    selector: 'button',
  },
  buttonClassName: { // 결제 버튼 클래스 이름
    type: 'string',
    selector: 'input',
  },
  buttonStyle: { // 결제 버튼 스타일
    type: 'string',
    selector: 'input',
  },
  modalClassName: { // 결제 팝업 클래스 이름
    type: 'string',
    selector: 'input',
  },
  title: { // 결제 모달 타이틀
    type: 'string',
    selector: 'input',
  },
  description: { // 결제 모달 서브 타이틀
    type: 'string',
    selector: 'input',
  },
  name: { // 주문명
    type: 'string',
    selector: 'input',
  },
  amountType: { // 결제 금액 유형
    type: 'string',
    selector: 'input',
  },
  amountOptions: { // 결제금액 정보
    type: 'array',
    selector: 'input',
  },
  buyerOptions: { // 구매자 정보
    type: 'object',
    selector: 'input',
  },
  currency: { // 화폐 단위
    type: 'string',
    selector: 'input',
  },
  payMethods: { // 결제 수단 정보
    type: 'array',
    selector: 'input',
  },
  pgs: { // 결제 수단 별 PG사 정보
    type: 'object',
    selector: 'input',
  },
  pgMids: { // 결제 수단 별 PG 상점아이디 정보
    type: 'object',
    selector: 'input',
  },
  cardQuota: { // 신용카드 할부 개월수
    type: 'number',
    selector: 'select',
  },
  digital: { // 실물 컨텐츠 여부
    type: 'boolean',
    selector: 'input',
  },
  redirectAfter: { // 결제 후 이동될 URL
    type: 'string',
    selector: 'input',
  },
  customFields: { // 커스텀 입력 필드 정보
    type: 'array',
    selector: 'input',
  },
};