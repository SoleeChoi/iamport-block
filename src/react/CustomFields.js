import { Form, Row, Col, Checkbox, Radio, Select, Input } from 'antd';

const { __ } = wp.i18n;
const { Item } = Form;
const { Option } = Select;

function CustomFields({ getFieldDecorator, attributes }) {
  const { customFields } = attributes;
  return (
    customFields.map(field => {
      const { label, type, options, agreementOptions, required } = field;
      switch(type) {
        case 'checkbox': {
          return (
            <Item label={label}>
              {getFieldDecorator(label, {
                rules: [{ required, message: __('필수 선택입니다', 'iamport-block') }],
              })(
                <Checkbox.Group>
                  <Row>
                    {options.map(option =>
                      <Col key={option} md={12} lg={8} xl={6}>
                        <Checkbox value={option}>{option}</Checkbox>
                      </Col>
                    )}
                  </Row>
                </Checkbox.Group>,
              )}
            </Item>
          );
        }
        case 'radio': {
          return (
            <Item label={label}>
              {getFieldDecorator(label, {
                rules: [{ required, message: __('필수 선택입니다', 'iamport-block') }],
              })(
                <Radio.Group>
                  <Row>
                    {options.map(option =>
                      <Col key={option} md={12} lg={8} xl={6}>
                        <Radio value={option}>{option}</Radio>
                      </Col>
                    )}
                  </Row>
                </Radio.Group>,
              )}
            </Item>
          );
        }
        case 'dropdown': {
          return (
            <Item label={label}>
              {getFieldDecorator(label, {
                rules: [{ required, message: __('필수 선택입니다', 'iamport-block') }],
              })(
                <Select
                  size="large"
                  style={{ width: '100%' }}
                >
                  {options.map(eachOption =>
                    <Option value={eachOption} key={eachOption}>{eachOption}</Option>
                  )}
                </Select>,
              )}
            </Item>
          );
        }
        case 'agreement': {
          return (
            <Item label={label}>
              {getFieldDecorator(label, {
                valuePropName: 'checked',
                rules: [{ required, message: __('필수 선택입니다', 'iamport-block') }],
              })(
                <Checkbox>{agreementOptions.label}</Checkbox>,
              )}
              <a href={agreementOptions.link} target="_blank">
                {__('약관 보기', 'iamport-block')}
              </a>
            </Item>
          );
        }
        default: {
          return (
            <Item label={label}>
              {getFieldDecorator(label, {
                rules: [{ required, message: __('필수 입력입니다', 'iamport-block') }],
              })(
                <Input size="large" />,
              )}
            </Item>
          );
        }
      }
    })
  );
}

export default CustomFields;