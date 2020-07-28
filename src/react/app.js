import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'antd';
import 'antd/dist/antd.css';

import BasicFields from './BasicFields';
import CustomField from './CustomField';
import ButtonContainer from './ButtonContainer';

import { getDefaultFieldValues, getCustomLabels, getPaymentData } from './utils';

function App({ form, attributes }) {
  const { validateFields, getFieldDecorator, setFieldsValue } = form;
  const { userCode, buttonName, title, description, customFields } = attributes;

  const defaultFieldType = customFields.length === 0 ? 'basic' : 'custom';
  const customLabels = getCustomLabels(customFields);
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
      const defaultFieldValues = getDefaultFieldValues(attributes);
      setFieldsValue(defaultFieldValues);
    }, 0);
  }

  function onClickNext() {
    /**
     * 기본 입력 필드로 넘어가기 전에,
     * 커스텀 입력 필드에 대해 validation 체크를 한다
     */
    validateFields(customLabels, error => {
      if (error) {
        return false;
      }
      setFieldType('basic');
    });
  }

  function onClickPayment() {
    validateFields((error, values) => {
      if (!error) {
        const paymentData = getPaymentData(values, attributes);
        IMP.request_pay(paymentData, response => {
          console.log(response);
          setLoading(false);
          setIsOpen(false);
        });
        setLoading(true);
      }
    });
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
            onClickNext={onClickNext}
            onPayment={onClickPayment}
          />
        </Modal>
      }
    </div>
  );
}

const WrappedApp = Form.create({ name: 'iamport-payment-modal' })(App);
export default WrappedApp;