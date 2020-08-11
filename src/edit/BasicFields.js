import { Form, Row, Col, Input, Checkbox, Select, Switch, Icon } from 'antd';

import { getPgLists, getPgLabel, getPayMethods } from './utils';
import DropdownField from '../react/DropdownField';

const { __ } = wp.i18n;
const { Item } = Form;
const { Option } = Select;

export function BasicFields({ type, payMethods, getFieldDecorator }) {
  const isCardQuotaVisible = payMethods && payMethods.indexOf('card') !== -1;
  const isVbankDueVisible = payMethods && payMethods.indexOf('vbank') !== -1;
  const isDigitalVisible = payMethods && payMethods.indexOf('phone') !== -1;

  const AllPayMethods = getPayMethods(type);
  const PgSelector = ({ method }) =>
    getFieldDecorator(`pgs.${method}`)(
      <Select
        size="large"
        style={{ width: '150px' }}
        disabled={method === 'kakaopay' || method === 'paypal'}
        suffixIcon={<Icon type="caret-down" />}
      >
        {getPgLists(method, type).map(pg =>
          <Option key={pg}>{getPgLabel(pg)}</Option>
        )}
      </Select>
    );

  return (
    <div>
      <h3>{__('기본 필드', 'iamport-block')}</h3>
      <Item label={__('결제 버튼 라벨','iamport-block')}>
        {getFieldDecorator('buttonName', {
          rules: [{ required: true, message: __('필수 입력입니다', 'iamport-block')}],
        })(<Input size="large" />)}
      </Item>
      <Item label={__('결제 버튼 클래스 이름','iamport-block')}>
        {getFieldDecorator('buttonClassName')(<Input size="large" />)}
      </Item>
      <Item label={__('결제 버튼 스타일 속성','iamport-block')}>
        {getFieldDecorator('buttonStyle')(<Input size="large" />)}
      </Item>
      <Item label={__('결제 팝업 클래스 이름','iamport-block')}>
        {getFieldDecorator('modalClassName')(<Input size="large" />)}
      </Item>
      <Item label={__('결제 팝업 타이틀','iamport-block')}>
        {getFieldDecorator('title', {
          rules: [{ required: true, message: __('필수 입력입니다', 'iamport-block') }],
        })(<Input size="large" />)}
      </Item>
      <Item label={__('결제 팝업 서브 타이틀','iamport-block')}>
        {getFieldDecorator('description')(<Input size="large" />)}
      </Item>
      <Item label={__('주문명','iamport-block')}>
        {getFieldDecorator('name', {
          rules: [{ required: true, message: __('필수 입력입니다', 'iamport-block') }],
        })(<Input size="large" />)}
      </Item>
      <Row>
        <Col span={7}>
          <Item label={__('결제 수단', 'iamport-block')}>
            {getFieldDecorator('payMethods', {
              rules: [{ required: true, message: __('필수 선택입니다', 'iamport-block') }],
            })(
              <Checkbox.Group className="iamport-pay-methods-container">
                {Object.keys(AllPayMethods).map(method =>
                  <Checkbox value={method}>{AllPayMethods[method]}</Checkbox>
                )}
              </Checkbox.Group>
            )}
          </Item>
        </Col>
        <Col span={17}>
          {Object.keys(AllPayMethods).map((method, index) =>
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
      <DropdownField
        label={__('신용카드 할부 개월수','iamport-block')}
        name="cardQuota"
        style={{ display: isCardQuotaVisible ? 'block' : 'none' }}
        options={Array(13).fill(1)}
        optionLabel={(_, index) => {
          if (index === 0) {
            return __('PG사 기본 제공 옵션', 'iamport-block');
          }
          if (index === 1) {
            return __('일시불 (할부불가)', 'iamport-block');
          }
          return  __(`최대 ${index}개월`, 'iamport-block');
        }}
        optionValue={(_, index) => index}
        getFieldDecorator={getFieldDecorator}
      />
      <DropdownField
        label={__('가상계좌 입금 기한','iamport-block')}
        name="vbankDue"
        style={{ display: isVbankDueVisible ? 'block' : 'none' }}
        options={Array(14).fill(1)}
        optionLabel={(_, index) => {
          if (index === 0) {
            return __('PG사 기본 제공 옵션', 'iamport-block');
          }
          if (index === 1) {
            return __('당일 자정까지', 'iamport-block');
          }
          return  __(`${index - 1}일 뒤 자정까지`, 'iamport-block');
        }}
        optionValue={(_, index) => index - 1}
        getFieldDecorator={getFieldDecorator}
      />
      <Item
        label={__('실물 컨텐츠 여부','iamport-block')}
        style={{ display: isDigitalVisible ? 'block' : 'none' }}
      >
        {getFieldDecorator('digital', {
          valuePropName: 'checked',
          initialValue: false,
        })(<Switch />)}
      </Item>
      <Item label={__('결제 후 이동될 URL','iamport-block')}>
        {getFieldDecorator('redirectAfter', {
          rules: [{ type: 'url', message: __('URL이 올바르지 않습니다', 'iamport-block') }],
        })(<Input size="large" />)}
      </Item>
    </div>
  );
}

export default BasicFields;