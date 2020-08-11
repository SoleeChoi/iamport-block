import { Form, Input } from 'antd';

const { __ } = wp.i18n;
const { Item } = Form;

function InputField({
  label,
  name,
  ref,
  type,
  placeholder,
  required,
  disabled = false,
  getFieldDecorator,
}) {
  const rules = [{ required, message: __('필수 입력입니다', 'iamport-block') }];
  if (type === 'email') {
    rules.push({ type: 'email', message: __('이메일 주소가 올바르지 않습니다', 'iamport-block') });
  }

  function getInputType() {
    if (!type || type === 'email') {
      return 'text';
    }
    return type;
  }

  return (
    <Item label={label}>
      {getFieldDecorator(name, { rules })(
        <Input
          size="large"
          ref={ref}
          type={getInputType()}
          disabled={disabled}
          placeholder={placeholder}  
        />,
      )}
    </Item>
  );
}

export default InputField;
