import { Form, Select, Icon } from 'antd';

const { __ } = wp.i18n;
const { Item } = Form;
const { Option } = Select;

function DropdownField({ label, name, options, required, getFieldDecorator }) {
  return (
    <Item label={label}>
      {getFieldDecorator(name, {
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

export default DropdownField;
