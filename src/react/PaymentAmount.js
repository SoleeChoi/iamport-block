import { Form, Input, Select, Icon } from 'antd';

import InputField from './InputField';
import { CURRENCY_OPTIONS } from '../constants';

const { __ } = wp.i18n;
const { Item } = Form;
const { Option } = Select;

function PaymentAmount({ getFieldDecorator, attributes }) {
  const { amountType, amountOptions, currency } = attributes;

  switch (amountType) {
    case 'selection': {
      return (
        <Item label={__('결제 금액', 'iamport-block')}>
          <Input.Group compact>
            <Input
              size="large"
              key="currency"
              style={{ width: '10%' }}
              defaultValue={CURRENCY_OPTIONS[currency]}  
            />
            {getFieldDecorator('amount', {
              rules: [{ required: true, message: __('필수 선택입니다', 'iamport-block') }],
            })(
              <Select
                size="large"
                key="amount"
                style={{ width: '90%' }}
                suffixIcon={<Icon type="caret-down" />}
              >
                {amountOptions.map(({ label, value }) =>
                  <Option value={value} key={value}>{label}</Option>  
                )}
              </Select>,
            )}
          </Input.Group>
        </Item>
      );
    }
    case 'fixed': {
      return (
        <InputField
          label={__('결제 금액', 'iamport-block')}
          name="amount"
          disabled={true}
          addonBefore={CURRENCY_OPTIONS[currency]}
        />
      );
    }
    default: {
      return (
        <InputField
          label={__('결제 금액', 'iamport-block')}
          name="amount"
          customRules={[{
            pattern: /^(?:[1-9]\d*|0)?(?:\.\d+)?$/, message: __('결제 금액이 올바르지 않습니다', 'iamport-block'),
          }]}
          addonBefore={CURRENCY_OPTIONS[currency]}
        />
      );
    }
  }
}

export default PaymentAmount;