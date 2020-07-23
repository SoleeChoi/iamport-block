import { useState, useEffect } from 'react';
import { Form, Button, Modal, message } from 'antd';

import AddCustomFieldsModal from './AddCustomFieldsModal';
import BasicFields from './BasicFields';
import CustomFields from './CustomFields';

const { __ } = wp.i18n;

export function PaymentSetting({ form, attributes, className, setAttributes }) {
  const { validateFields, getFieldDecorator, setFieldsValue } = form;
  const {
    buttonName, title, description, name, mode, amount, payMethods,
  } = attributes;
  const [isOpen, setIsOpen] = useState(false);
  const [customFields, setCustomFields] = useState(attributes.customFields || []);

  useEffect(() => {
    setTimeout(() => {
      const newFieldsValue = {
        buttonName: buttonName || __('결제하기', 'iamport-block'),
        title: title || __('참가권 결제', 'iamport-block'),
        description: description || __('아래 정보를 기입 후 결제를 진행해주세요.', 'iamport-block'),
        name: name || __('아임포트 워드프레스 결제버튼 생성 플러그인 주문', 'iamport-block'),
        mode: mode || 'fixed',
        amount: amount || 1000,
        payMethods: payMethods || [], 
      };
      setFieldsValue(newFieldsValue);
    }, 0);
  }, []);

  function onSubmit() {
    validateFields((error, values) => {
      if (!error) {
        const newAttributes = { customFields: values.customFields };
        Object.keys(values).forEach(key => {
          const value = values[key];
          if (['buttonName', 'title', 'description', 'payMethods'].indexOf(key) !== -1) {
            newAttributes[key] = value;
          }
        });
        console.log(newAttributes);
        setAttributes(newAttributes);
        Modal.info({
          centered: true,
          title: __('아임포트 블록 설정', 'iamport-block'),
          content: __('아임포트 블록 설정 정보가 저장되었습니다. 우측 상단 업데이트 버튼을 눌러주세요.', 'iamport-block'),
          okText: __('확인', 'iamport-block'),
        })
      }
    });
  }

  function onAddCustomField(customField) {
    setCustomFields(customFields.concat([customField]));
    setIsOpen(false);
  }

  function onDeleteCustomField(label) {
    // customField 삭제
    Modal.confirm({
      centered: true,
      title: __('커스텀 입력필드 삭제', 'iamport-block'),
      content: __('정말로 삭제하시겠습니까?', 'iamport-block'),
      okType: 'danger',
      okText: __('삭제하기', 'iamport-block'),
      cancelText: __('취소하기', 'iamport-block'),
      onOk() {
        console.log(label);
        const newCustomFields = customFields.filter(field => field.label !== label);
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

  return (
    <div className={className} onSubmit={onSubmit}>
      <Form layout="horizontal" labelAlign="left">
        <BasicFields getFieldDecorator={getFieldDecorator} />
        <h3>
          <span>{__('커스텀 입력 필드', 'iamport-block')}</span>
          <Button
            size="large"
            type="primary"
            ghost
            onClick={() => setIsOpen(true)}
          >{__('입력 필드 추가', 'iamport-block')}</Button>
        </h3>
        {customFields.length === 0 && <h4>{__('설정된 커스텀 입력 필드가 없습니다.', 'iamport-block')}</h4>}
        {customFields.map((field, index) =>
          <CustomFields
            field={field}
            index={index}
            getFieldDecorator={getFieldDecorator}
            onAddOption={() => onAddOption(index)}
            onDeleteOption={optionValue => onDeleteOption(index, optionValue)}
          />
        )}
        <Button
          type="primary"
          htmlType="submit"
          size="large"
        >{__('저장하기', 'iamport-block')}</Button>
      </Form>
      {
        isOpen &&
        <AddCustomFieldsModal
          onOk={onAddCustomField}
          onClose={() => setIsOpen(false)}
        />
      }
    </div>
  );
}
const WrappedPaymentSetting = Form.create({ name: 'iamport-payment-setting' })(PaymentSetting);
export default WrappedPaymentSetting;