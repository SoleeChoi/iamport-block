import { useState, useEffect } from 'react';
import { Form, Button } from 'antd';

import BasicFields from './BasicFields';
import PaymentAmount from './PaymentAmount';
import CustomFields from './CustomFields';

import { getDefaultAttributes, getNewAttributes } from './utils';
import { showSetAttributesModal } from '../utils';

import { DEFAULT_AMOUNT_OPTIONS, DEFAULT_CUSTOM_FIELD } from './constants';

const { __ } = wp.i18n;

export function PaymentSetting({ form, attributes, className, setAttributes }) {
  const { validateFields, getFieldDecorator, setFieldsValue, getFieldValue } = form;

  const [amountType, setAmountType] = useState(attributes.amountType || 'variable');
  const [amountOptions, setAmountOptions] = useState(attributes.amountOptions || DEFAULT_AMOUNT_OPTIONS);
  const [customFields, setCustomFields] = useState(attributes.customFields || []);

  useEffect(() => {
    setTimeout(() => {
      const defaultAttributes = getDefaultAttributes(attributes);
      setFieldsValue(defaultAttributes);
    }, 0);
  }, []);

  function onSubmit() {
    validateFields((error, values) => {
      if (!error) {
        const newAttributes = {
          customFields,
          amountType,
          amountOptions,
          ...getNewAttributes(values),
        };
        setAttributes(newAttributes);
        
        showSetAttributesModal();
      }
    });
  }

  function onChangeAmountType(value) {
    // 금액 옵션 변경했을때
    setAmountType(value);
    if (value === 'fixed'){
      setAmountOptions([amountOptions[0]]);
    }
  }

  function onAddAmountOptions() {
    // 금액 옵션 추가했을때
    setAmountOptions(amountOptions.concat(DEFAULT_AMOUNT_OPTIONS));
  }

  function onDeleteAmountOptions(index) {
    // 금액 옵션 삭제했을때
    setAmountOptions(amountOptions.filter((option, optionIndex) => optionIndex !== index));
  }

  function onAddCustomField() {
    // 필드 추가
    setCustomFields(customFields.concat(DEFAULT_CUSTOM_FIELD));
  }

  return (
    <div className={className} onSubmit={onSubmit}>
      <Form layout="horizontal" labelAlign="left">
        {/* 기본 입력 필드 */}
        <BasicFields
          getFieldDecorator={getFieldDecorator}
          payMethods={getFieldValue('payMethods')}
        />
        {/* 결제 금액 필드 */}
        <PaymentAmount 
          getFieldDecorator={getFieldDecorator}
          getFieldValue={getFieldValue}
          amountType={amountType}
          amountOptions={amountOptions}
          onChange={onChangeAmountType}
          onAdd={onAddAmountOptions}
          onDelete={onDeleteAmountOptions}
        />
        {/* 커스텀 입력 필드 */}
        <CustomFields
          customFields={customFields}
          setCustomFields={setCustomFields}
        />
        <Button
          size="large"
          type="primary"
          ghost
          onClick={onAddCustomField}
          style={{ width: '100%' }}
        >{__('필드추가', 'iamport-block')}</Button>
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          style={{ width: '100%', marginTop: '0.5rem' }}
        >{__('저장하기', 'iamport-block')}</Button>
      </Form>
    </div>
  );
}
const WrappedPaymentSetting = Form.create({ name: 'iamport-payment-setting' })(PaymentSetting);
export default WrappedPaymentSetting;