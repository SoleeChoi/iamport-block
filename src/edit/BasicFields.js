import { Form, Row, Col, Checkbox, Select, Switch, Icon } from 'antd';

import { getPgLists, getPgLabel, getPayMethods } from './utils';

import InputField from '../react/InputField';
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
      <InputField
        label={__('결제 버튼 라벨','iamport-block')}
        name="buttonName"
        required={true}
        getFieldDecorator={getFieldDecorator}
      />
      <InputField
        label={__('결제 버튼 클래스 이름','iamport-block')}
        name="buttonClassName"
        getFieldDecorator={getFieldDecorator}
      />
      <InputField
        label={__('결제 버튼 스타일 속성','iamport-block')}
        name="buttonStyle"
        getFieldDecorator={getFieldDecorator}
      />
      <InputField
        label={__('결제 팝업 클래스 이름','iamport-block')}
        name="modalClassName"
        getFieldDecorator={getFieldDecorator}
      />
      <InputField
        label={__('결제 팝업 타이틀','iamport-block')}
        name="title"
        required={true}
        getFieldDecorator={getFieldDecorator}
      />
      <InputField
        label={__('결제 팝업 서브 타이틀','iamport-block')}
        name="description"
        getFieldDecorator={getFieldDecorator}
      />
      <InputField
        label={__('주문명','iamport-block')}
        name="name"
        required={true}
        getFieldDecorator={getFieldDecorator}
      />
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
            <InputField
              label={index === 0 && __('PG사', 'iamport-block')}
              name={`pgMids.${method}`}
              placeholder={__('PG 상점아이디', 'iamport-block')}
              getFieldDecorator={getFieldDecorator}
              addonBefore={<PgSelector method={method} />}
            />
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
      <InputField
        label={__('결제 후 이동될 URL','iamport-block')}
        name="redirectAfter"
        type="url"
        getFieldDecorator={getFieldDecorator}
      />
    </div>
  );
}

export default BasicFields;