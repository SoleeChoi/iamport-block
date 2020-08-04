import { Form, Input, Select, Icon } from 'antd';

import PaymentAmount from './PaymentAmount';

import { PAY_METHODS_FOR_PAYMENT } from '../constants';

const { __ } = wp.i18n;
const { Item } = Form;
const { Option } = Select;

function BasicFields({ show, getFieldDecorator, attributes }) {
  const { payMethods } = attributes;

  return (
    <div style={{ display: show ? 'block' : 'none' }}>
      <Item label={__('결제수단','iamport-block')}>
        {getFieldDecorator('pay_method')(
          <Select size="large" suffixIcon={<Icon type="caret-down" />}>
            {payMethods.map(method =>
              <Option value={method}>{PAY_METHODS_FOR_PAYMENT[method]}</Option>  
            )}
          </Select>,
        )}
      </Item>
      <PaymentAmount
        getFieldDecorator={getFieldDecorator}
        attributes={attributes}
      />
      <Item label={__('이름','iamport-block')}>
        {getFieldDecorator('buyer_name', {
          rules: [{ required: true, message: __('필수입력입니다', 'iamport-block') }],
        })(
          <Input
            size="large"
            placeholder={__('이름','iamport-block')}
          />,
        )}
      </Item>
      <Item label={__('이메일','iamport-block')}>
        {getFieldDecorator('buyer_email', {
          rules: [{
            required: true, message: __('필수입력입니다', 'iamport-block'),
            type: 'email', message: __('이메일 주소가 올바르지 않습니다', 'iamport-block'),
          }],
        })(
          <Input
            size="large"
            placeholder={__('이메일','iamport-block')}
          />,
        )}
      </Item>
      <Item label={__('전화번호','iamport-block')}>
        {getFieldDecorator('buyer_tel', {
          rules: [{ required: true, message: __('필수입력입니다', 'iamport-block') }],
        })(
          <Input
            size="large"
            type="number"
            placeholder={__('전화번호','iamport-block')}
          />,
        )}
      </Item>
    </div>
  );
}

export default BasicFields;