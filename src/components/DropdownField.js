import { Form, Select, Icon } from 'antd';

const { __ } = wp.i18n;
const { Item } = Form;
const { Option } = Select;

function DropdownField({
  label,
  name,
  style,
  options,
  optionValue = eachOption => eachOption,
  optionLabel = eachOption => eachOption,
  required,
  initialValue,
  onChange,
  getFieldDecorator,
}) {
  return (
    <Item label={label} style={style}>
      {getFieldDecorator(name, {
        initialValue,
        rules: [{ required, message: __('필수 선택입니다', 'iamport-block') }],
      })(
        <Select
          size="large"
          suffixIcon={<Icon type="caret-down" />}
          style={{ width: '100%' }}
          onChange={onChange}
        >
          {options.map((eachOption, index) => {
            const value = optionValue(eachOption, index);
            const label = optionLabel(eachOption, index);
            return (
              <Option value={value} key={value}>{label}</Option>
            );
          })}
        </Select>,
      )}
    </Item>
  );
}

export default DropdownField;
