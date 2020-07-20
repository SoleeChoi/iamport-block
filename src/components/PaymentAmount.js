const { __ } = wp.i18n;
const { SelectControl, TextControl } = wp.components;

export function PaymentAmount({ mode, amount, onChangeMode, onChangeAmount }) {
  const PAYMENT_MODES = {
    fixed: __('고정 금액형', 'iamport-block'),
    selection: __('금액 선택형', 'iamport-block'),
    variable: __('가변형', 'iamport-block'),
    label: __('라벨형', 'iamport-block'),
  };

  return (
    <div>
      <SelectControl
        label={__('결제금액 유형', 'iamport-block')}
        options={Object.keys(PAYMENT_MODES).map(paymentMode =>
          ({
            value: paymentMode,
            label: PAYMENT_MODES[paymentMode],
          })
        )}
        value={mode}
        onChange={onChangeMode}
      />
      {mode === 'fixed' && (
        <TextControl
          type="number"
          label={__('결제금액', 'iamport-block')}
          onChange={onChangeAmount}
          value={amount}
        />
      )}
      {mode === 'label' && (
        <div>
          <TextControl
            type="string"
            onChange={onChangeAmount}
            value={amount}
          />
          <TextControl
            type="number"
            onChange={onChangeAmount}
            value={amount}
          />
        </div>
      )}
    </div>
  );
}

export default PaymentAmount;