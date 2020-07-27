import { Form, Row, Col, Checkbox, Radio, Select, Input, Icon } from 'antd';

import AddressField from './AddressField';

const { __ } = wp.i18n;
const { Item } = Form;
const { Option } = Select;

function CustomField({ field, getFieldDecorator, onChangeAddress }) {
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
              suffixIcon={<Icon type="caret-down" />}
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
          <Row>
            <Col span={20}>
              {getFieldDecorator(label, {
                valuePropName: 'checked',
                rules: [{ required, message: __('필수 선택입니다', 'iamport-block') }],
              })(
                <Checkbox key={agreementOptions.label}>{agreementOptions.label}</Checkbox>,
              )}
            </Col>
            <Col span={4} style={{ 'textAlign': 'right' }}>
              <a
                href={agreementOptions.link}
                key={agreementOptions.link}
                target="_blank"
              >{__('약관 보기', 'iamport-block')}</a>
            </Col>
          </Row>
        </Item>
      );
    }
    case 'address': {
      return (
        <AddressField
          label={label}
          required={required}
          getFieldDecorator={getFieldDecorator}
          onChange={onChangeAddress}  
        />
      );
    }
    case 'file': {
      return (
        <Item label={label}>
          {getFieldDecorator(label, {
            valuePropName: 'filelist',
            getValueFromEvent: ({ target: { files } }) => {
              const [file] = files;
              return file;
            },
            rules: [{ required, message: __('필수 선택입니다', 'iamport-block') }],
          })(
            <Input size="large" type="file" />
          )}
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
}

export default CustomField;
