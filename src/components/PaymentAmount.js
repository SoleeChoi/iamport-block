import { Form, Row, Col, Input, Select, Icon, Button } from 'antd';

import { AMOUNT_TYPES } from '../constants';

const { Item } = Form;
const { Option } = Select;
const { __ } = wp.i18n;

export function PaymentAmount({
  getFieldDecorator, amountType, amountOptions, onChange, onAdd, onDelete
}) {
  return (
    <div>
      <h3>{__('결제 금액 필드', 'iamport-block')}</h3>
      <Row gutter={[8, 0]}>
        <Col span={11}>
          <Item label={__('금액 유형','iamport-block')}>
            {getFieldDecorator('amountType')(
              <Select
                size="large"
                style={{ width: '100%' }}
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
        <Col span={11}>
          <Item label={__('면세 금액','iamport-block')}>
            {getFieldDecorator('taxFreeAmount')(
              <Input
                size="large"
                type="number"
                style={{ width: '100%' }}
                placeholder={__('예) 1000', 'iamport_block')}
              />,
            )}
          </Item>
        </Col>
      </Row>
      {
        amountType !== 'variable' && amountOptions &&
        amountOptions.map((option, index) => 
          <div>
            {
              index === 0 &&
              <Row gutter={[8, 0]}>
                <Col span={11}>
                  <div class="imp-label-container">{__('금액 라벨', 'iamport_block')}</div>
                </Col>
                <Col span={13}>
                  <div class="imp-label-container">{__('결제 금액', 'iamport_block')}</div>
                </Col>
              </Row>
            }
            <Row gutter={[8, 0]}>
              <Col span={11}>
                <Item>
                  {getFieldDecorator(`amountOptions[${index}].label`, {
                    rules: [{ required: true, message: __('필수 입력입니다', 'iamport-block') }],
                  })(
                    <Input
                      size="large"
                      style={{ width: '100%' }}
                      placeholder={__('예) 1000원(어린이)', 'iamport_block')}
                    />
                  )}
                </Item>
              </Col>
              <Col span={11}>
                <Item>
                  {getFieldDecorator(`amountOptions[${index}].value`, {
                    rules: [{ required: true, message: __('필수 입력입니다', 'iamport-block') }],
                  })(
                    <Input
                      size="large"
                      type="number"
                      style={{ width: '100%' }}
                      placeholder={__('예) 1000', 'iamport_block')}
                    />
                  )}
                </Item>
              </Col>
              <Col span={2}>
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
        <Row>
          <Col span={24}>
            <Button
              size="large"
              type="dashed"
              icon="plus"
              style={{ width: '100%' }}
              onClick={onAdd}
            />
          </Col>
        </Row>
      }
    </div>
  );
}

export default PaymentAmount;
