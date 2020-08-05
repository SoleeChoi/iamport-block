import { Form, Input, Select, Icon } from 'antd';

import PaymentAmount from './PaymentAmount';
import AddressField from './AddressField';

import { PAY_METHODS_FOR_PAYMENT } from '../constants';

const { __ } = wp.i18n;
const { Item } = Form;
const { Option } = Select;

function BasicFields({ show, getFieldDecorator, attributes, onChangeAddress }) {
  const { amountType, payMethods, buyerOptions } = attributes;
  const { email, name, phone, address } = buyerOptions;

  return (
    <div style={{ display: show ? 'block' : 'none' }}>
      {
        amountType !== 'free' &&
        <div>
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
        </div>
      }
      <Item label={name.label}>
        {getFieldDecorator('buyer_name', {
          rules: [{ required: true, message: __('필수입력입니다', 'iamport-block') }],
        })(
          <Input
            size="large"
            placeholder={name.placeholder}
          />,
        )}
      </Item>
      <Item label={email.label}>
        {getFieldDecorator('buyer_email', {
          rules: [{
            required: true, message: __('필수입력입니다', 'iamport-block'),
            type: 'email', message: __('이메일 주소가 올바르지 않습니다', 'iamport-block'),
          }],
        })(
          <Input
            size="large"
            placeholder={email.placeholder}
          />,
        )}
      </Item>
      <Item label={phone.label}>
        {getFieldDecorator('buyer_tel', {
          rules: [{ required: true, message: __('필수입력입니다', 'iamport-block') }],
        })(
          <Input
            size="large"
            type="number"
            placeholder={phone.placeholder}
          />,
        )}
      </Item>
      {
        address.checked &&
        <AddressField
          label={address.label}
          name="buyer_addr"
          required={true}
          getFieldDecorator={getFieldDecorator}
          onChange={onChangeAddress}  
        />
      }
    </div>
  );
}

export default BasicFields;