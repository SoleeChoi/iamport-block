import { Form, Row, Col, Input, Select, Icon, Button } from 'antd';

import { AMOUNT_TYPES } from './constants';
import { CURRENCY_OPTIONS } from '../constants';

const { Item } = Form;
const { Option } = Select;
const { __ } = wp.i18n;

export function PaymentAmount({
  getFieldDecorator,
  getFieldValue,
  amountType,
  amountOptions,
  onChange,
  onAdd,
  onDelete,
}) {
  const currency = getFieldValue('currency');

  return (
    <div>
      <h3>{__('결제 금액 필드', 'iamport-block')}</h3>
      <Row gutter={[8, 0]}>
        <Col span={7}>
          <Item label={__('금액 유형','iamport-block')}>
            {getFieldDecorator('amountType')(
              <Select
                size="large"
                suffixIcon={<Icon type="caret-down" />}
                onChange={onChange}
              >
                {Object.keys(AMOUNT_TYPES).map(eachType =>
                  <Option value={eachType}>{AMOUNT_TYPES[eachType]}</Option>
                )}
              </Select>,
            )}
          </Item>
        </Col>
        {
          amountType !== 'free' &&
          <Col span={7}>
            <Item label={__('화폐 단위','iamport-block')}>
              {getFieldDecorator('currency')(
                <Select
                  size="large"
                  suffixIcon={<Icon type="caret-down" />}
                >
                  {Object.keys(CURRENCY_OPTIONS).map(eachType =>
                    <Option value={eachType}>{CURRENCY_OPTIONS[eachType]}</Option>
                  )}
                </Select>,
              )}
            </Item>
          </Col>
        }
      </Row>
      {
        amountType !== 'variable' &&
        amountType !== 'free' &&
        amountOptions &&
        amountOptions.map((_, index) => 
          <div>
            {
              index === 0 &&
              <Row gutter={[8, 0]}>
                <Col span={7}>
                  <div class="iamport-label-container">{__('금액 라벨', 'iamport-block')}</div>
                </Col>
                <Col span={7}>
                  <div class="iamport-label-container">{__('결제 금액', 'iamport-block')}</div>
                </Col>
                <Col span={10}>
                  <div class="iamport-label-container">{__('면세 금액', 'iamport-block')}</div>
                </Col>
              </Row>
            }
            <Row gutter={[8, 0]}>
              <Col span={7}>
                <Item>
                  {getFieldDecorator(`amountOptions[${index}].label`, {
                    rules: [{ required: true, message: __('필수 입력입니다', 'iamport-block') }],
                  })(
                    <Input
                      size="large"
                      addonBefore={CURRENCY_OPTIONS[currency]}
                      placeholder={__('예) 1000(어린이)', 'iamport-block')}
                    />
                  )}
                </Item>
              </Col>
              <Col span={7}>
                <Item>
                  {getFieldDecorator(`amountOptions[${index}].value`, {
                    rules: [{
                      validator:(_, value) => {
                        if (!value) {
                          return Promise.reject(__('필수 입력입니다', 'iamport-block'));
                        }
                        if (!value.match(/^\d+$/)) {
                          return Promise.reject(__('결제 금액이 올바르지 않습니다', 'iamport-block'));
                        }
                        const taxFreeAmount = getFieldValue(`amountOptions[${index}].taxFreeAmount`);
                        if (parseInt(value, 10) < parseInt(taxFreeAmount, 10)) {
                          return Promise.reject(__('결제 금액은 면세 금액보다 큰 값이어야 합니다', 'iamport-block'));
                        }
                        return Promise.resolve();
                      },
                    }],
                  })(
                    <Input
                      size="large"
                      placeholder={__('예) 1000', 'iamport-block')}
                    />
                  )}
                </Item>
              </Col>
              <Col span={7}>
                <Item>
                  {getFieldDecorator(`amountOptions[${index}].taxFreeAmount`, {
                    rules: [{
                      validator:(_, value) => {
                        if (value && !value.match(/^\d+$/)) {
                          return Promise.reject(__('면세 금액이 올바르지 않습니다', 'iamport-block'));
                        }
                        const amount = getFieldValue(`amountOptions[${index}].value`);
                        if (parseInt(value, 10) > parseInt(amount, 10)) {
                          return Promise.reject(__('면세 금액은 결제 금액보다 작은 값이어야 합니다', 'iamport-block'));
                        }
                        return Promise.resolve();
                      },
                    }],
                  })(
                    <Input
                      size="large"
                      placeholder={__('예) 0', 'iamport-block')}
                    />
                  )}
                </Item>
              </Col>
              <Col span={3}>
                {
                  amountType === 'selection' &&
                  <Button
                    size="large"
                    icon="close"
                    shape="circle"
                    disabled={amountOptions.length === 1 && index === 0}
                    onClick={() => onDelete(index)}
                  />
                }
              </Col>
            </Row>
          </div>
        )
      }
      {
        amountType === 'selection' &&
        <Button
          size="large"
          type="dashed"
          icon="plus"
          style={{ width: '100%' }}
          onClick={onAdd}
        />
      }
    </div>
  );
}

export default PaymentAmount;
