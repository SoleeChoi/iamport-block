import { Form, Row, Col, Input, Checkbox, Select, Icon } from 'antd';

import { PAY_METHODS } from '../constants';

const { __ } = wp.i18n;
const { Item } = Form;

export function BasicFields({ getFieldDecorator, payMethods }) {
  const isCardQuotaVisible = payMethods && payMethods.indexOf('card') !== -1;
  const isVbankDueVisible = payMethods && payMethods.indexOf('vbank') !== -1;

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
      <Item label={__('결제수단','iamport-block')}>
        {getFieldDecorator('payMethods', {
          rules: [{ required: true, message: '필수 선택입니다' }],
        })(
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
    </div>
  );
}

export default BasicFields;