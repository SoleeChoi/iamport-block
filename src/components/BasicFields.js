import { Form, Row, Col, Input, Checkbox } from 'antd';

// import PaymentAmount from './PaymentAmount';

import { PAY_METHODS } from '../constants';

const { __ } = wp.i18n;
const { Item } = Form;

export function BasicFields({ getFieldDecorator }) {
  return (
    <div>
      <h3>{__('기본 입력 필드', 'iamport-block')}</h3>
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
    </div>
  );
}

export default BasicFields;