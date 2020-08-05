import { Form, Row, Col, Input, Checkbox } from 'antd';

import { DEFAULT_BUYER_OPTIONS } from './constants';

const { __ } = wp.i18n;
const { Item } = Form;

export function BuyerFields({ getFieldDecorator }) {
  return (
    <div>
      <h3>{__('구매자 필드', 'iamport-block')}</h3>
      {Object.keys(DEFAULT_BUYER_OPTIONS).map((option, index) => 
        <Row gutter={[8, 0]}>
          <Col span={7}>
            <Item label={index === 0 && __('입력 유형', 'iamport-block')}>
              {getFieldDecorator(`buyerOptions.${option}.checked`, {
                valuePropName: 'checked',
              })(
                <Checkbox disabled={option !== 'address'}>
                  {DEFAULT_BUYER_OPTIONS[option].label}
                </Checkbox>
              )}
            </Item>
          </Col>
          <Col span={7}>
            <Item label={index === 0 && __('입력 라벨', 'iamport-block')}>
              {getFieldDecorator(
                `buyerOptions.${option}.label`,
                { rules: [{ required: true, message: __('필수 입력입니다', 'iamport-block') }] }
              )(
                <Input size="large" />
              )}
            </Item>
          </Col>
          {
            option !== 'address' &&
            <Col span={10}>
              <Item label={index === 0 && __('입력 힌트', 'iamport-block')}>
                {getFieldDecorator(`buyerOptions.${option}.placeholder`)(
                  <Input size="large" />
                )}
              </Item>
            </Col>
          }
        </Row>
      )}
    </div>
  );
}

export default BuyerFields;