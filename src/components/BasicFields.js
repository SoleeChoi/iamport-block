import { Form, Row, Col, Input, Checkbox, Select, Switch, Icon } from 'antd';

import { getPgLists, getPgLabel } from './utils';
import { PAY_METHODS } from '../constants';

const { __ } = wp.i18n;
const { Item } = Form;
const { Option } = Select;

export function BasicFields({ getFieldDecorator, payMethods }) {
  const isCardQuotaVisible = payMethods && payMethods.indexOf('card') !== -1;
  const isVbankDueVisible = payMethods && payMethods.indexOf('vbank') !== -1;
  const isDigitalVisible = payMethods && payMethods.indexOf('phone') !== -1;

  const PgSelector = ({ method }) =>
    getFieldDecorator(`pgs.${method}`)(
      <Select
        size="large"
        style={{ width: '150px' }}
        disabled={method === 'kakaopay' || method === 'paypal'}
        suffixIcon={<Icon type="caret-down" />}
      >
        {getPgLists(method).map(pg => {
          return (
            <Option key={pg}>{getPgLabel(pg)}</Option>
          );
        })}
      </Select>
    );

  return (
    <div>
      <h3>{__('기본 입력 필드', 'iamport-block')}</h3>
      <Item label={__('결제 버튼 라벨','iamport-block')}>
        {getFieldDecorator('buttonName', {
          rules: [{ required: true, message: __('필수 입력입니다', 'iamport-block')}],
        })(<Input size="large" />)}
      </Item>
      <Item label={__('결제 팝업 타이틀','iamport-block')}>
        {getFieldDecorator('title', {
          rules: [{ required: true, message: __('필수 입력입니다', 'iamport-block') }],
        })(<Input size="large" />)}
      </Item>
      <Item label={__('결제 팝업 설명','iamport-block')}>
        {getFieldDecorator('description')(<Input size="large" />)}
      </Item>
      <Item label={__('주문명','iamport-block')}>
        {getFieldDecorator('name', {
          rules: [{ required: true, message: __('필수 입력입니다', 'iamport-block') }],
        })(<Input size="large" />)}
      </Item>
      <Row>
        <Col span={8}>
          <Item label={__('결제 수단', 'iamport-block')}>
            {getFieldDecorator('payMethods', {
              rules: [{ required: true, message: __('필수 선택입니다', 'iamport-block') }],
            })(
              <Checkbox.Group className="imp-pay-methods-container">
                {Object.keys(PAY_METHODS).map(method =>
                  <Checkbox value={method}>{PAY_METHODS[method]}</Checkbox>
                )}
              </Checkbox.Group>
            )}
          </Item>
        </Col>
        <Col span={16}>
          {Object.keys(PAY_METHODS).map((method, index) =>
            <Item label={index === 0 && __('PG사', 'iamport-block')}>
              {getFieldDecorator(`pgMids.${method}`)(
                <Input
                  size="large"
                  placeholder={__('PG 상점아이디', 'iamport-block')}
                  addonBefore={<PgSelector method={method} />}
                />
              )}
            </Item>
          )}
        </Col>
      </Row>
      <Item
        label={__('신용카드 할부 개월수','iamport-block')}
        style={{ display: isCardQuotaVisible ? 'block' : 'none' }}
      >
        {getFieldDecorator('cardQuota')(
          <Select
            size="large"
            style={{ width: '100%' }}
            suffixIcon={<Icon type="caret-down" />}
          >
            {Array(13).fill(1).map((value, index) => {
              let label;
              if (index === 0) {
                label = __('PG사 기본 제공 옵션', 'iamport_block');
              } else if (index === 1) {
                label = __('일시불 (할부불가)', 'iamport_block');
              } else {
                label = __(`최대 ${index}개월`, 'iamport_block');
              }

              return <Option value={index} key={index}>{label}</Option>;
            })}
          </Select>,
        )}
      </Item>
      <Item
        label={__('가상계좌 입금 기한','iamport-block')}
        style={{ display: isVbankDueVisible ? 'block' : 'none' }}
      >
        {getFieldDecorator('vbankDue')(
          <Select
            size="large"
            style={{ width: '100%' }}
            suffixIcon={<Icon type="caret-down" />}
          >
            {Array(14).fill(1).map((value, index) => {
              let label;
              if (index === 0) {
                label = __('PG사 기본 제공 옵션', 'iamport_block');
              } else if (index === 1) {
                label = __('당일 자정까지', 'iamport_block');
              } else {
                label = __(`${index - 1}일 뒤 자정까지`, 'iamport_block');
              }

              return <Option value={index -1} key={index}>{label}</Option>;
            })}
          </Select>,
        )}
      </Item>
      <Item
        label={__('실물 컨텐츠 여부','iamport-block')}
        style={{ display: isDigitalVisible ? 'block' : 'none' }}
      >
        {getFieldDecorator('digital', { valuePropName: 'checked' })(<Switch />)}
      </Item>
    </div>
  );
}

export default BasicFields;