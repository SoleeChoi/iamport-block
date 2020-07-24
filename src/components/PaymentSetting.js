import { useState, useEffect } from 'react';
import { Form, Button, Modal } from 'antd';

import BasicFields from './BasicFields';
import PaymentAmount from './PaymentAmount';
import CustomFields from './CustomFields';

const { __ } = wp.i18n;

export function PaymentSetting({ form, attributes, className, setAttributes }) {
  const { validateFields, getFieldDecorator, setFieldsValue } = form;
  const {
    buttonName, title, description, name, payMethods,
  } = attributes;
  const defaultAmountOption = [{ label: '', amount: 1000 }];
  const [amountType, setAmountType] = useState(attributes.amountType || 'variable');
  const [amountOptions, setAmountOptions] = useState(attributes.amountOptions || defaultAmountOption);
  const [customFields, setCustomFields] = useState(attributes.customFields || []);

  useEffect(() => {
    setTimeout(() => {
      const newFieldsValue = {
        buttonName: buttonName || __('결제하기', 'iamport-block'),
        title: title || __('참가권 결제', 'iamport-block'),
        description: description || __('아래 정보를 기입 후 결제를 진행해주세요.', 'iamport-block'),
        name: name || __('아임포트 워드프레스 결제버튼 생성 플러그인 주문', 'iamport-block'),
        amountType: amountType || 'variable',
        amountOptions: amountOptions || defaultAmountOption,
        payMethods: payMethods || [], 
      };
      setFieldsValue(newFieldsValue);
    }, 0);
  }, []);

  function onSubmit() {
    validateFields((error, values) => {
      if (!error) {
        const newAttributes = {
          customFields,
          amountType,
          amountOptions,
        };
        Object.keys(values).forEach(key => {
          const value = values[key];
          if (['buttonName', 'title', 'description', 'payMethods'].indexOf(key) !== -1) {
            newAttributes[key] = value;
          }
        });
        setAttributes(newAttributes);
        
        Modal.info({
          centered: true,
          title: __('아임포트 블록 설정', 'iamport-block'),
          content: __('아임포트 블록 설정 정보가 저장되었습니다. 우측 상단 업데이트 버튼을 눌러주세요.', 'iamport-block'),
          okText: __('확인', 'iamport-block'),
        });
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
    setAmountOptions(amountOptions.concat(defaultAmountOption));
  }

  function onDeleteAmountOptions(index) {
    // 금액 옵션 삭제했을때
    setAmountOptions(amountOptions.filter((option, optionIndex) => optionIndex !== index));
  }

  function onAddCustomField() {
    // 필드 추가
    const defaultField = {
      label: '',
      type: 'text',
      options: [''],
      agreementOptions: { label: '', link: '' },
      required: false,
    };
    setCustomFields(customFields.concat(defaultField));
  }

  function onDeleteCustomField(index) {
    // customField 삭제
    Modal.confirm({
      centered: true,
      title: __('커스텀 입력필드 삭제', 'iamport-block'),
      content: __('정말로 삭제하시겠습니까?', 'iamport-block'),
      okType: 'danger',
      okText: __('삭제하기', 'iamport-block'),
      cancelText: __('취소하기', 'iamport-block'),
      onOk() {
        const newCustomFields = customFields.filter((field, fieldIndex) => fieldIndex !== index);
        setCustomFields(newCustomFields);
      },
    })
  }

  function onAddOption(index) {
    // 입력 필드 옵션 추가
    const newCustomFields = customFields.map((field, fieldIndex) => {
      const { options } = field;
      if (index === fieldIndex) {
        return {
          ...field,
          options: options.concat(['']),
        }
      }
      return field;
    });
    setCustomFields(newCustomFields);
  }

  function onDeleteOption(index, optionValue) {
    // 입력 필드 옵션 삭제
    const newCustomFields = customFields.map((field, fieldIndex) => {
      const { options } = field;
      if (index === fieldIndex) {
        return {
          ...field,
          options: options.filter(option => option !== optionValue),
        }
      }
      return field;
    });
    setCustomFields(newCustomFields);
  }

  function onChangeCustomFields(index, newCustomField) {
    // 입력 필드 옵션 수정
    const newCustomFields = customFields.map((eachCustomField, eachIndex) => {
      if (eachIndex === index) {
        return newCustomField;
      }
      return eachCustomField;
    });
    setCustomFields(newCustomFields);
  }

  return (
    <div className={className} onSubmit={onSubmit}>
      <Form layout="horizontal" labelAlign="left">
        {/* 기본 입력 필드 */}
        <BasicFields getFieldDecorator={getFieldDecorator} />
        {/* 결제 금액 필드 */}
        <PaymentAmount 
          getFieldDecorator={getFieldDecorator}
          amountType={amountType}
          amountOptions={amountOptions}
          onChange={onChangeAmountType}
          onAdd={onAddAmountOptions}
          onDelete={onDeleteAmountOptions}
        />
        <h3>{__('커스텀 필드', 'iamport-block')}</h3>
        {customFields.length === 0 && <h4>{__('설정된 커스텀 필드가 없습니다.', 'iamport-block')}</h4>}
        {customFields.map((field, index) =>
          <CustomFields
            field={field}
            onAddOption={() => onAddOption(index)}
            onDeleteOption={optionValue => onDeleteOption(index, optionValue)}
            onDeleteCustomField={() => onDeleteCustomField(index)}
            onChange={newCustomField => onChangeCustomFields(index, newCustomField)}
          />
        )}
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
          style={{ width: '100%', 'margin-top': '1rem' }}
        >{__('저장하기', 'iamport-block')}</Button>
      </Form>
    </div>
  );
}
const WrappedPaymentSetting = Form.create({ name: 'iamport-payment-setting' })(PaymentSetting);
export default WrappedPaymentSetting;