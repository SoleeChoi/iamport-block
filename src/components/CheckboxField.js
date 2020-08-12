import { Form, Row, Col, Checkbox } from 'antd';

const { __ } = wp.i18n;
const { Item } = Form;

function CheckboxField({ label, name, options, required, getFieldDecorator }) {
  return (
    <Item label={label}>
      {getFieldDecorator(name, {
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

export default CheckboxField;
