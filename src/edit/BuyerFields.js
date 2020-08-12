import { Form, Row, Col, Checkbox } from 'antd';

import { DEFAULT_BUYER_OPTIONS } from './constants';

import InputField from '../components/InputField';

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
                <Checkbox disabled={option !== 'buyer_addr'}>
                  {DEFAULT_BUYER_OPTIONS[option].label}
                </Checkbox>
              )}
            </Item>
          </Col>
          <Col span={7}>
            <InputField
              label={index === 0 && __('입력 라벨', 'iamport-block')}
              name={`buyerOptions.${option}.label`}
              required={true}
              getFieldDecorator={getFieldDecorator}
            />
          </Col>
          {
            option !== 'buyer_addr' &&
            <Col span={10}>
              <InputField
                label={index === 0 && __('입력 힌트', 'iamport-block')}
                name={`buyerOptions.${option}.placeholder`}
                getFieldDecorator={getFieldDecorator}
              />
            </Col>
          }
        </Row>
      )}
    </div>
  );
}

export default BuyerFields;