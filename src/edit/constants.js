const { __ } = wp.i18n;

export const AMOUNT_TYPES = {
  variable: __('가변형', 'iamport-block'),
  fixed: __('고정형', 'iamport-block'),
  selection: __('선택형', 'iamport-block'),
  free: __('무료형', 'iamport-block'),
};

export const OPTION_TYPES = {
  text: __('텍스트', 'iamport-block'),
  file: __('파일첨부', 'iamport-block'),
  address: __('주소', 'iamport-block'),
  agreement: __('약관 동의', 'iamport-block'),
  checkbox: __('복수선택', 'iamport-block'),
  radio: __('단일선택 (라디오)', 'iamport-block'),
  dropdown: __('단일선택 (드롭다운)', 'iamport-block'),
  buyer_name: __('구매자 이름', 'iamport-block'),
  buyer_email: __('구매자 이메일', 'iamport-block'),
  buyer_tel: __('구매자 전화번호', 'iamport-block'),
  buyer_addr: __('구매자 주소', 'iamport-block'),
};

export const BASIC_KEYS = [
  'name',
  'buttonName',
  'buttonClassName',
  'buttonStyle',
  'modalClassName',
  'title',
  'description',
  'payMethods',
  'pgs',
  'pgMids',
  'amountType',
  'amountOptions',
  'buyerOptions',
  'currency',
  'cardQuota',
  'vbankDue',
  'digital',
  'redirectAfter',
];

export const DEFAULT_AMOUNT_OPTIONS = [{ label: '', value: 1000, taxFreeAmount: 0 }];
export const DEFAULT_AGREEMENT_OPTIONS = [{ label: '', value: '', type: 'link' }];
export const DEFAULT_BUYER_OPTIONS = {
  name: {
    checked: true,
    label: __('이름', 'iamport-block'),
    placeholder: '',
  },
  email: {
    checked: true,
    label: __('이메일', 'iamport-block'),
    placeholder: '',
  },
  phone: {
    checked: true,
    label: __('전화번호', 'iamport-block'),
    placeholder: '',
  },
  address: {
    checked: false,
    label: __('주소', 'iamport-block'),
    placeholder: '',
  },
};

// 일반결제용 PG사
export const PGS_FOR_SAMSUNG = ['html5_inicis', 'kcp'];
export const PGS_FOR_PHONE = ['html5_inicis', 'nice', 'mobilians', 'uplus', 'danal', 'jtnet'];
export const PGS = ['html5_inicis', 'nice', 'mobilians', 'uplus', 'danal_tpay', 'jtnet'];
// 정기결제용 PG사
export const PGS_FOR_SUBSCRIPTION_BY_CARD = ['jtnet', 'nice', 'html5_inicis', 'danal_tpay', 'mobilians'];
export const PGS_FOR_SUBSCRIPTION_BY_PHONE = ['danal'];

export const DEFAULT_PGS = {
  kakaopay: 'kakaopay',
  samsung: 'html5_inicis',
  card: 'html5_inicis',
  vbank: 'html5_inicis',
  trans: 'html5_inicis',
  phone: 'danal',
  paypal: 'paypal',
};

export const DEFAULT_PG_MIDS = {
  kakaopay: null,
  samsung: null,
  card: null,
  vbank: null,
  trans: null,
  phone: null,
  paypal: null,
};

export const DEFAULT_CUSTOM_FIELD = {
  label: '',
  type: 'text',
  placeholder: '',
  options: [''],
  agreementOptions: DEFAULT_AGREEMENT_OPTIONS,
  required: false,
};
