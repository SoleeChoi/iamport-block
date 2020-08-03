import { useState, useEffect } from 'react';
import { Form, Button } from 'antd';

import BasicFields from './BasicFields';
import PaymentAmount from './PaymentAmount';
import CustomFields from './CustomFields';

import { getDefaultAttributes, getDefaultErrorFields, getNewAttributes } from './utils';
import { validateCustomFields } from './validation';
import { showSetAttributesModal } from '../utils';

import { DEFAULT_AMOUNT_OPTIONS, DEFAULT_CUSTOM_FIELD } from './constants';

const { __ } = wp.i18n;

export function PaymentSetting({ form, attributes, type, className, setAttributes }) {
  const { validateFields, getFieldDecorator, setFieldsValue, getFieldValue } = form;

  const defaultCustomFields = attributes.customFields || [];
  const defaultErorFields = getDefaultErrorFields(defaultCustomFields);

  const [amountType, setAmountType] = useState(attributes.amountType || 'variable');
  const [amountOptions, setAmountOptions] = useState(attributes.amountOptions || DEFAULT_AMOUNT_OPTIONS);
  const [customFields, setCustomFields] = useState(defaultCustomFields);
  const [errorFields, setErrorFields] = useState(defaultErorFields);

  useEffect(() => {
    setTimeout(() => {
      const defaultAttributes = getDefaultAttributes(type, attributes);
      setFieldsValue(defaultAttributes);
    }, 0);
  }, []);

  function onSubmit() {
    validateFields((error, values) => {
      let isAvailable = false;
      if (!error) {
        const { isValid, errorFields } = validateCustomFields(customFields);
        isAvailable = isValid;
        setErrorFields(errorFields);
      }

      if (isAvailable) {
        const newAttributes = {
          customFields,
          amountType,
          amountOptions,
          ...getNewAttributes(values),
        };
        setAttributes(newAttributes);
      }

      showSetAttributesModal(isAvailable);
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
      <Form
        layout="horizontal"
        labelAlign="left"
        className="iamport-block-form"
      >
        {/* 기본 필드 */}
        <BasicFields
          type={type}
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
          errorFields={errorFields}
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