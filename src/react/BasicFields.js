import { Form, Select, Icon } from 'antd';

import PaymentAmount from './PaymentAmount';
import AddressField from './AddressField';
import InputField from './InputField';

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
      <InputField
        label={name.label}
        name="buyer_name"
        type="email"
        required={true}
        placeholder={name.placeholder}
        getFieldDecorator={getFieldDecorator}
      />
      <InputField
        label={email.label}
        name="buyer_email"
        type="email"
        required={true}
        placeholder={email.placeholder}
        getFieldDecorator={getFieldDecorator}
      />
      <InputField
        label={phone.label}
        name="buyer_tel"
        type="number"
        required={true}
        placeholder={phone.placeholder}
        getFieldDecorator={getFieldDecorator}
      />
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