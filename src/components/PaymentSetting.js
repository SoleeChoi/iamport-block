import { useEffect } from 'react';
import CheckboxGroup from './CheckboxGroup';
import PaymentAmount from './PaymentAmount';

const { __ } = wp.i18n;
const { TextControl } = wp.components;

export function PaymentSetting({ attributes, className, setAttributes }) {
  const {
    buttonName, title, description, name, mode, amount, payMethods,
  } = attributes;

  useEffect(() => {
    let newAttributes = {};
    if (buttonName === undefined) {
      newAttributes.buttonName = __('결제하기', 'iamport-block');
    }
    if (title === undefined) {
      newAttributes.title = __('참가권 결제', 'iamport-block');
    }
    if (description === undefined) {
      newAttributes.description = __('아래 정보를 기입 후 결제를 진행해주세요.', 'iamport-block');
    }
    if (name === undefined) {
      newAttributes.undefined = __('아임포트 워드프레스 결제버튼 생성 플러그인 주문', 'iamport-block');
    }
    if (mode === undefined) {
      newAttributes.undefined = 'fixed';
    }
    if (amount === undefined) {
      newAttributes = 1000;
    }
    if (payMethods === undefined) {
      newAttributes.payMethods = [];
    }
    setAttributes(attributes);
  }, []);

  function onChangePayMethod(method, checked) {
    if (checked) {
      // 넣기
      setAttributes({ payMethods: payMethods.concat([method]) });
    } else {
      // 빼기
      setAttributes({ payMethods: payMethods.filter(key => key !== method) });
    }
  }

  return (
    <div className={className}>
      <TextControl
        type="text"
        label={__('결제 버튼 라벨','iamport-block')}
        onChange={buttonName => setAttributes({ buttonName })}
        value={buttonName}
      />
      <TextControl
        type="text"
        label={__('결제 모달 타이틀', 'iamport-block')}
        onChange={title => setAttributes({ title })}
        value={title}
      />
      <TextControl
        type="text"
        label={__('결제 모달 설명','iamport-block')}
        onChange={description => setAttributes({ description })}
        value={description}
      />
      <TextControl
        type="text"
        label={__('주문명', 'iamport-block')}
        onChange={name => setAttributes({ name })}
        value={name}
      />
      {/* 결제수단 */}
      <CheckboxGroup payMethods={payMethods} onChange={onChangePayMethod} />
      {/* 결제금액 */}
      <PaymentAmount
        mode={mode}
        amount={amount}
        onChangeMode={mode => setAttributes({ mode })}
        onChangeAmount={amount => setAttributes({ amount })}
      />
    </div>
  );
}

export default PaymentSetting;