const { __ } = wp.i18n;

export const PAY_METHODS = {
  'kakaopay': __('카카오페이', 'iamport-block'),
  'samsung': __('삼성페이', 'iamport-block'),
  'card': __('신용카드', 'iamport-block'),
  'vbank': __('가상계좌', 'iamport-block'),
  'trans': __('실시간 계좌이체', 'iamport-block'),
  'phone': __('휴대폰 소액결제', 'iamport-block'),
  'paypal': __('페이팔', 'iamport-block'),
};

export const AMOUNT_TYPES = {
  variable: __('가변형', 'iamport-block'),
  fixed: __('고정형', 'iamport-block'),
  selection: __('선택형', 'iamport-block'),
};

export const OPTION_TYPES = {
  text: __('텍스트', 'iamport-block'),
  file: __('파일첨부', 'iamport-block'),
  address: __('주소', 'iamport-block'),
  agreement: __('약관 동의', 'iamport-block'),
  checkbox: __('복수선택', 'iamport-block'),
  radio: __('단일선택 (라디오)', 'iamport-block'),
  dropdown: __('단일선택 (드롭다운)', 'iamport-block'),
};

export const BASIC_KEYS = [
  'name',
  'buttonName',
  'title',
  'description',
  'payMethods',
  'amountType',
  'amountOptions',
  'cardQuota',
  'vbankDue',
];

export const DEFAULT_AMOUNT_OPTIONS = [{ label: '', amount: 1000 }];

export const PGS_FOR_SAMSUNG = ['html5_inicis', 'kcp'];
export const PGS_FOR_PHONE = ['html5_inicis', 'nice', 'mobilians', 'uplus', 'danal', 'jtnet'];
export const PGS = ['html5_inicis', 'nice', 'mobilians', 'uplus', 'danal_tpay', 'jtnet'];

export const DEFAULT_PAY_METHODS = {
  kakaopay: {
    pg: 'kakaopay',
    pg_id: null,
    checked: true,
  },
  samsung: {
    pg: 'html5_inicis',
    pg_id: null,
    checked: true,
  },
  card: {
    pg: 'html5_inicis',
    pg_id: null,
    checked: true,
  },
  vbank: {
    pg: 'html5_inicis',
    pg_id: null,
    checked: true,
  },
  phone: {
    pg: 'html5_inicis',
    pg_id: null,
    checked: true,
  },
  trans: {
    pg: 'html5_inicis',
    pg_id: null,
    checked: true,
  },
  paypal: {
    pg: 'paypal',
    pg_id: null,
    checked: true,
  },
};

export const PAYMENT_DATA_KEYS = [
  'buyer_name',
  'buyer_tel',
  'buyer_email',
  'pg',
  'display',
  'vbank_due',
];