import { Form, Input } from 'antd';

const { __ } = wp.i18n;
const { Item } = Form;

function FileField({ label, name, required, getFieldDecorator }) {
  return (
    <Item label={label}>
      {getFieldDecorator(name, {
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

export default FileField;
