import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Select, Button } from 'antd';
import 'antd/dist/antd.css';

import { PAY_METHODS } from '../constants';

const { __ } = wp.i18n;
const { Item } = Form;
const { Option } = Select;

function App({ form, attributes }) {
  console.log(attributes);
  const { validateFields, getFieldDecorator, setFieldsValue } = form;
  const {
    userCode, buttonName, title, description, name, mode, amount, payMethods,
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
      setFieldsValue({ amount, pay_method });
    }, 0);
  }

  function onClickPayment() {
    validateFields((error, values) => {
      if (!error) {
        console.log(values);
        IMP.request_pay({
          name,
          ...values,
        }, response => alert(JSON.stringify(response)));
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
            <Item label={__('결제수단','iamport-block')}>
              {getFieldDecorator('pay_method')(
                <Select size="large">
                  {payMethods.map(method =>
                    <Option value={method}>{PAY_METHODS[method]}</Option>  
                  )}
                </Select>,
              )}
            </Item>
            <Item label={__('결제금액','iamport-block')}>
              {getFieldDecorator('amount', {
                rules: [{ required: true, message: __('필수입력입니다', 'iamport-block') }],
              })(
                <Input
                  size="large"
                  placeholder={__('결제금액','iamport-block')}
                  disabled={mode === 'fixed'}
                />,
              )}
            </Item>
            <Item label={__('결제자 이름','iamport-block')}>
              {getFieldDecorator('buyer_name', {
                rules: [{ required: true, message: __('필수입력입니다', 'iamport-block') }],
              })(
                <Input
                  size="large"
                  placeholder={__('결제자 이름','iamport-block')}
                />,
              )}
            </Item>
            <Item label={__('결제자 이메일','iamport-block')}>
              {getFieldDecorator('buyer_email', {
                rules: [{
                  required: true, message: __('필수입력입니다', 'iamport-block'),
                  type: 'email', message: __('이메일 주소가 올바르지 않습니다', 'iamport-block'),
                }],
              })(
                <Input
                  size="large"
                  placeholder={__('결제자 이메일','iamport-block')}
                />,
              )}
            </Item>
            <Item label={__('결제자 전화번호','iamport-block')}>
              {getFieldDecorator('buyer_tel', {
                rules: [{ required: true, message: __('필수입력입니다', 'iamport-block') }],
              })(
                <Input
                  size="large"
                  type="number"
                  placeholder={__('결제자 전화번호','iamport-block')}
                />,
              )}
            </Item>
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