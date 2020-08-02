import { Form, Row, Col, Checkbox, Radio, Select, Input, Icon } from 'antd';

import AddressField from './AddressField';

const { __ } = wp.i18n;
const { Item } = Form;
const { Option } = Select;

function CustomField({ field, getFieldDecorator, onChangeAddress }) {
  const { label, type, options, agreementOptions, required } = field;
  const agreementLength = agreementOptions.length;

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
        agreementOptions.map(({ label, link }, index) => 
          <Item
            label={index === 0 && field.label}
            className={index !== agreementLength - 1 && 'iamport-agreement-container'}
          >
            <Row>
              <Col span={20}>
                {getFieldDecorator(label, {
                  valuePropName: 'checked',
                  rules: [{
                    validator:(_, value) => required && !value ? Promise.reject('약관 동의는 필수입니다') : Promise.resolve(),
                  }],
                })(
                  <Checkbox>{label}</Checkbox>,
                )}
              </Col>
              <Col span={4} className="iamport-agreement-link">
                <a
                  href={link}
                  key={link}
                  target="_blank"
                >{__('약관 보기', 'iamport-block')}</a>
              </Col>
            </Row>
          </Item>
        )
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
