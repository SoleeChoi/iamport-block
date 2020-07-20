import { useEffect } from 'react';
import { Form, Row, Col, Input, Checkbox, Button } from 'antd';

import PaymentAmount from './PaymentAmount';

import { PAY_METHODS } from '../constants';

const { __ } = wp.i18n;
const { Item } = Form;

export function PaymentSetting({ form, attributes, className, setAttributes }) {
  const { validateFields, getFieldDecorator, setFieldsValue } = form;
  const {
    buttonName, title, description, name, mode, amount, payMethods,
  } = attributes;

  useEffect(() => {
    setTimeout(() => {
      setFieldsValue({
        buttonName: buttonName || __('결제하기', 'iamport-block'),
        title: title || __('참가권 결제', 'iamport-block'),
        description: description || __('아래 정보를 기입 후 결제를 진행해주세요.', 'iamport-block'),
        name: name || __('아임포트 워드프레스 결제버튼 생성 플러그인 주문', 'iamport-block'),
        mode: mode || 'fixed',
        amount: amount || 1000,
        payMethods: payMethods || [], 
      });
    }, 0);
  }, []);

  function onSubmit() {
    validateFields((error, values) => {
      if (!error) {
        console.log(values);
        setAttributes(values);
      }
    });
  }

  return (
    <div className={className} onSubmit={onSubmit}>
      <Form layout="horizontal">
        <Item label={__('결제 버튼 라벨','iamport-block')}>
          {getFieldDecorator('buttonName')(
            <Input size="large" />,
          )}
        </Item>
        <Item label={__('결제 팝업 타이틀','iamport-block')}>
          {getFieldDecorator('title')(
            <Input size="large" />,
          )}
        </Item>
        <Item label={__('결제 팝업 설명','iamport-block')}>
          {getFieldDecorator('description')(
            <Input size="large" />,
          )}
        </Item>
        <Item label={__('주문명','iamport-block')}>
          {getFieldDecorator('name')(
            <Input size="large" />,
          )}
        </Item>
        <Item label={__('결제수단','iamport-block')}>
          {getFieldDecorator('payMethods')(
            <Checkbox.Group>
              <Row>
                {Object.keys(PAY_METHODS).map(method =>
                  <Col key={method} md={12} lg={8} xl={6}>
                    <Checkbox value={method}>{PAY_METHODS[method]}</Checkbox>
                  </Col>
                )}
              </Row>
            </Checkbox.Group>
          )}
        </Item>
        {/* 결제금액 */}
        {/* <PaymentAmount
          mode={mode}
          amount={amount}
          onChangeMode={mode => setAttributes({ mode })}
          onChangeAmount={amount => setAttributes({ amount })}
        /> */}
        <Button type="primary" htmlType="submit" size="large">저장하기</Button>
      </Form>
    </div>
  );
}
const WrappedPaymentSetting = Form.create({ name: 'iamport-payment-setting' })(PaymentSetting);
export default WrappedPaymentSetting;