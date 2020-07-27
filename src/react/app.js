import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'antd';
import 'antd/dist/antd.css';

import BasicFields from './BasicFields';
import CustomField from './CustomField';
import ButtonContainer from './ButtonContainer';

const { __ } = wp.i18n;

function App({ form, attributes }) {
  const { validateFields, getFieldDecorator, setFieldsValue } = form;
  const {
    userCode, buttonName, title, description, name, amountOptions, payMethods, customFields,
  } = attributes;

  const defaultFieldType = customFields.length === 0 ? 'basic' : 'custom';
  const [isOpen, setIsOpen] = useState(false);
  const [fieldType, setFieldType] = useState(defaultFieldType);
  const [loading, setLoading] = useState(false);

  const ModalTitle = () => 
    <div>
      <h3>{title}</h3>
      <h5>{description}</h5>
    </div>

  useEffect(() => {
    IMP.init(userCode);
  }, []);

  function openModal() {
    setIsOpen(true);

    setTimeout(() => {
      const [pay_method] = payMethods;
      const [{ value }] = amountOptions;

      const newFieldsValue = {
        amount: value,
        pay_method,
        // TODO: 테스트 편의를 위해 선언한 것으로 아래 내용은 향후 삭제되어야 함
        buyer_name: '홍길동',
        buyer_tel: '01012341234',
        buyer_email: 'example@example.com',
      };
      customFields.forEach(({ label, type, options }) => {
        // default값을 갖을 수 있는 입력 필드의 경우, default값을 설정
        const [defaultValue] = options;
        if (type === 'checkbox') {
          newFieldsValue[label] = [defaultValue]
        } else if (type === 'dropdown' || type === 'radio') {
          newFieldsValue[label] = defaultValue;
        }
      });
      setFieldsValue(newFieldsValue);
    }, 0);
  }

  function onClickPayment() {
    validateFields((error, values) => {
      if (!error) {
        const paymentData = {
          name,
        };
        const custom_data = {};
        Object.keys(values).forEach(key => {
          const value = values[key];
          const [targetField] = customFields.filter(({ label }) => label === key);
          if (targetField) {
            // 커스텀 입력 필드
            const { type } = targetField;
            const customValue = getCustomValue(value, type);
            if (customValue) {
              // 값이 입력된 경우에만 집어 넣기
              custom_data[key] = value;
            }
          } else if (value) {
            // 기본 입력 필드. 값이 입력된 경우에만 집어 넣기
            paymentData[key] = value;
          }
        });
        IMP.request_pay({ ...paymentData, custom_data }, response => {
          console.log(response);
          setLoading(false);
          setIsOpen(false);
        });
        setLoading(true);
      }
    });
  }

  function getCustomValue(value, type) {
    if (type === 'address') {
      // 주소 입력 필드
      let fullAddress;
      Object.keys(value).forEach(addressKey => {
        const addressValue = value[addressKey];
        if (addressValue) {
          fullAddress += `${addressValue} `;
        }
      });
      return fullAddress;
    }
    return value;
  }

  return (
    <div>
      <Button size="large" type="primary" onClick={openModal}>{buttonName}</Button>
      {
        isOpen &&
        <Modal
          visible
          title={<ModalTitle />}
          footer={null}
          onCancel={() => {
            setIsOpen(false);
            setFieldType(defaultFieldType);
          }}
        >
          <Form layout="vertical" onSubmit={onClickPayment}>
            <div style={{ display: fieldType === 'custom' ? 'block' : 'none' }}>
              {customFields.map(field =>
                <CustomField
                  key={field.label}
                  field={field}
                  getFieldDecorator={getFieldDecorator}
                  onChangeAddress={addressObj => setFieldsValue(addressObj)}
                />
              )}
            </div>
            <BasicFields
              getFieldDecorator={getFieldDecorator}
              attributes={attributes} 
              show={fieldType === 'basic'}
            />
          </Form>
          <ButtonContainer
            loading={loading}
            fieldType={fieldType}
            defaultFieldType={defaultFieldType}
            onChangeFieldType={value => setFieldType(value)}
            onCloseModal={() => setIsOpen(false)}
            onPayment={onClickPayment}
          />
        </Modal>
      }
    </div>
  );
}

const WrappedApp = Form.create({ name: 'iamport-payment-modal' })(App);
export default WrappedApp;