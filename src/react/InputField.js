import { Form, Input } from 'antd';

const { __ } = wp.i18n;
const { Item } = Form;

function InputField({
  label,
  name,
  type,
  placeholder,
  required,
  disabled = false,
  customRules = [],
  addonBefore,
  getFieldDecorator,
}) {
  const rules = [{ required, message: __('필수 입력입니다', 'iamport-block') }];
  if (type === 'email') {
    rules.push({ type: 'email', message: __('이메일 주소가 올바르지 않습니다', 'iamport-block') });
  }
  if (type === 'url') {
    rules.push({ type: 'url', message: __('URL이 올바르지 않습니다', 'iamport-block') });
  }
  customRules.forEach(customRule => rules.push(customRule));

  function getInputType() {
    if (!type || type === 'email' || type === 'url') {
      return 'text';
    }
    return type;
  }

  return (
    <Item label={label}>
      {getFieldDecorator(name, { rules })(
        <Input
          size="large"
          type={getInputType()}
          disabled={disabled}
          placeholder={placeholder}  
          addonBefore={addonBefore}
        />,
      )}
    </Item>
  );
}

export default InputField;
