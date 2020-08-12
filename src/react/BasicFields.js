import PaymentAmount from './PaymentAmount';

import DropdownField from '../components/DropdownField';
import AddressField from '../components/AddressField';
import InputField from '../components/InputField';

import { PAY_METHODS_FOR_PAYMENT } from '../constants';

const { __ } = wp.i18n;

function BasicFields({ show, getFieldDecorator, attributes, onChangeAddress }) {
  const { amountType, payMethods, buyerOptions } = attributes;
  const { buyer_name, buyer_email, buyer_tel, buyer_addr } = buyerOptions;

  return (
    <div style={{ display: show ? 'block' : 'none' }}>
      {
        amountType !== 'free' &&
        <div>
          <DropdownField
            label={__('결제수단','iamport-block')}
            name="pay_method"
            options={payMethods}
            optionLabel={eachOption => PAY_METHODS_FOR_PAYMENT[eachOption]}
            getFieldDecorator={getFieldDecorator}
          />
          <PaymentAmount
            getFieldDecorator={getFieldDecorator}
            attributes={attributes}
          />
        </div>
      }
      <InputField
        label={buyer_name.label}
        name="buyer_name"
        required={true}
        placeholder={buyer_name.placeholder}
        getFieldDecorator={getFieldDecorator}
      />
      <InputField
        label={buyer_email.label}
        name="buyer_email"
        type="email"
        required={true}
        placeholder={buyer_email.placeholder}
        getFieldDecorator={getFieldDecorator}
      />
      <InputField
        label={buyer_tel.label}
        name="buyer_tel"
        type="number"
        required={true}
        placeholder={buyer_tel.placeholder}
        getFieldDecorator={getFieldDecorator}
      />
      {
        buyer_addr.checked &&
        <AddressField
          label={buyer_addr.label}
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