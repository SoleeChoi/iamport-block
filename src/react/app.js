import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'antd';
import 'antd/dist/antd.css';

import BasicFields from './BasicFields';
import CustomFields from './CustomFields';

const { __ } = wp.i18n;

function App({ form, attributes }) {
  const { validateFields, getFieldDecorator, setFieldsValue } = form;
  const {
    userCode, buttonName, title, description, name, amountOptions, payMethods, customFields,
  } = attributes;

  const [isOpen, setIsOpen] = useState(false);
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
        const [defaultValue] = options;
        if (type === 'checkbox') {
          newFieldsValue[label] = [defaultValue]
        } else {
          newFieldsValue[label] = defaultValue;
        }
      });
      setFieldsValue(newFieldsValue);
    }, 0);
  }

  function onClickPayment() {
    validateFields((error, values) => {
      if (!error) {
        const customLabels = customFields.map(({ label }) => label);
        const paymentData = {
          name,
        };
        const custom_data = {};
        Object.keys(values).forEach(key => {
          const value = values[key];
          if (customLabels.indexOf(key) === -1) {
            paymentData[key] = value;
          } else {
            custom_data[key] = value;
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

  return (
    <div>
      <Button size="large" type="primary" onClick={openModal}>{buttonName}</Button>
      {
        isOpen &&
        <Modal
          visible
          title={<ModalTitle />}
          footer={null}
          onCancel={() => setIsOpen(false)}
        >
          <Form layout="vertical" onSubmit={onClickPayment}>
            <BasicFields
              getFieldDecorator={getFieldDecorator}
              attributes={attributes}  
            />
            <CustomFields
              getFieldDecorator={getFieldDecorator}
              attributes={attributes}
            />
          </Form>
          <div className="imp-btn-container">
            <Button size="large" onClick={() => setIsOpen(false)}>닫기</Button>
            <Button
              type="primary"
              size="large"
              htmlType="submit"
              loading={loading}
              onClick={onClickPayment}
            >결제하기</Button>
          </div>
        </Modal>
      }
    </div>
  );
}

const WrappedApp = Form.create({ name: 'iamport-payment-modal' })(App);
export default WrappedApp;