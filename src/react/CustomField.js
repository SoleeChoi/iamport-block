import { Form, Row, Col, Checkbox, Select, Icon } from 'antd';

import RadioField from './RadioField';
import FileField from './FileField';
import AgreementField from './AgreementField';
import AddressField from './AddressField';
import InputField from './InputField';

const { __ } = wp.i18n;
const { Item } = Form;
const { Option } = Select;

function CustomField({ field, getFieldDecorator, onChangeAddress }) {
  const { label, type, placeholder, options, agreementOptions, required } = field;
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
        <RadioField
          label={label}
          name={label}
          options={options}
          required={required}
          getFieldDecorator={getFieldDecorator}
        />
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
        agreementOptions.map(({ label, value, type }, index) => 
          <AgreementField
            label={index === 0 && field.label}
            className={index !== agreementLength - 1 && 'iamport-agreement-container'}
            name={`${field.label}.${label}`}
            required={required}
            agreementLabel={label}
            value={value}
            type={type}
            getFieldDecorator={getFieldDecorator}
          />
        )
      );
    }
    case 'address': {
      return (
        <AddressField
          label={label}
          name={label}
          required={required}
          getFieldDecorator={getFieldDecorator}
          onChange={onChangeAddress}  
        />
      );
    }
    case 'file': {
      return (
        <FileField
          label={label}
          name={label}
          required={required}
          getFieldDecorator={getFieldDecorator}
        />
      );
    }
    default: {
      return (
        <InputField
          label={label}
          name={label}
          placeholder={placeholder}
          required={required}
          getFieldDecorator={getFieldDecorator}
        />
      );
    }
  }
}

export default CustomField;
