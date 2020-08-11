import { Form, Row, Col, Radio } from 'antd';

const { __ } = wp.i18n;
const { Item } = Form;

function RadioField({ label, name, options, required, getFieldDecorator }) {
  return (
    <Item label={label}>
      {getFieldDecorator(name, {
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

export default RadioField;
