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
