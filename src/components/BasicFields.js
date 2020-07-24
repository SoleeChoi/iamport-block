import { Form, Row, Col, Input, Checkbox } from 'antd';

import { PAY_METHODS } from '../constants';

const { __ } = wp.i18n;
const { Item } = Form;

export function BasicFields({ getFieldDecorator }) {
  return (
    <div>
      <h3>{__('기본 입력 필드', 'iamport-block')}</h3>
      <Item label={__('결제 버튼 라벨','iamport-block')}>
        {getFieldDecorator(
          'buttonName',
          {
            rules: [
              {
                required: true,
                message: '필수 입력입니다',
              },
            ],
          },
        )(
          <Input size="large" />,
        )}
      </Item>
      <Item label={__('결제 팝업 타이틀','iamport-block')}>
        {getFieldDecorator(
          'title',
          {
            rules: [
              {
                required: true,
                message: '필수 입력입니다',
              },
            ],
          },
        )(
          <Input size="large" />,
        )}
      </Item>
      <Item label={__('결제 팝업 설명','iamport-block')}>
        {getFieldDecorator('description')(
          <Input size="large" />,
        )}
      </Item>
      <Item label={__('주문명','iamport-block')}>
        {getFieldDecorator(
          'name',
          {
            rules: [
              {
                required: true,
                message: '필수 입력입니다',
              },
            ],
          },
        )(
          <Input size="large" />,
        )}
      </Item>
      <Item label={__('결제수단','iamport-block')}>
        {getFieldDecorator(
          'payMethods',
          {
            rules: [
              {
                required: true,
                message: '필수 선택입니다',
              },
            ],
          },
        )(
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
    </div>
  );
}

export default BasicFields;