const { __ } = wp.i18n;

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
  'pgs',
  'pgMids',
  'amountType',
  'amountOptions',
  'currency',
  'cardQuota',
  'vbankDue',
  'digital',
  'redirectAfter',
];

export const DEFAULT_AMOUNT_OPTIONS = [{ label: '', value: 1000, taxFreeAmount: 0 }];
export const DEFAULT_AGREEMENT_OPTIONS = [{ label: '', link: '' }];

export const PGS_FOR_SAMSUNG = ['html5_inicis', 'kcp'];
export const PGS_FOR_PHONE = ['html5_inicis', 'nice', 'mobilians', 'uplus', 'danal', 'jtnet'];
export const PGS = ['html5_inicis', 'nice', 'mobilians', 'uplus', 'danal_tpay', 'jtnet'];

export const DEFAULT_PGS = {
  kakaopay: 'kakaopay',
  samsung: 'html5_inicis',
  card: 'html5_inicis',
  vbank: 'html5_inicis',
  trans: 'html5_inicis',
  phone: 'html5_inicis',
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
  options: [''],
  agreementOptions: DEFAULT_AGREEMENT_OPTIONS,
  required: false,
};
