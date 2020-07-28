import { Form, Input, Select, Icon } from 'antd';

import { PAY_METHODS, CURRENCY_OPTIONS } from '../constants';

const { __ } = wp.i18n;
const { Item } = Form;
const { Option } = Select;

function BasicFields({ show, getFieldDecorator, attributes }) {
  const { payMethods, amountType, amountOptions, currency } = attributes;

  return (
    <div style={{ display: show ? 'block' : 'none' }}>
      <Item label={__('결제수단','iamport-block')}>
        {getFieldDecorator('pay_method')(
          <Select size="large" suffixIcon={<Icon type="caret-down" />}>
            {payMethods.map(method =>
              <Option value={method}>{PAY_METHODS[method]}</Option>  
            )}
          </Select>,
        )}
      </Item>
      {
        amountType === 'selection' ?
        <Item label={__('결제 금액', 'iamport-block')}>
          <Input.Group compact>
            <Input
              size="large"
              key="currency"
              style={{ width: '10%' }}
              defaultValue={CURRENCY_OPTIONS[currency]}  
            />
            {getFieldDecorator('amount', {
              rules: [{ required: true, message: __('필수선택입니다', 'iamport-block') }],
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
        </Item> :
        <Item label={__('결제 금액', 'iamport-block')}>
          {getFieldDecorator('amount', {
            rules: [{ required: true, message: __('필수입력입니다', 'iamport-block') }],
          })(
            <Input
              size="large"
              addonBefore={CURRENCY_OPTIONS[currency]}
              disabled={amountType === 'fixed'}
            />,
          )}
        </Item>
      }
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