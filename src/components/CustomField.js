import { Form, Row, Col, Checkbox, Radio, Select, Input, Icon } from 'antd';

const { Item } = Form;
const { Option } = Select;

export function CustomField({ field, getFieldDecorator, onEdit, onDelete }) {
  const { type, label, options } = field;
  const labelComponent = (
    <div className="imp-label-container">
      <span>{label}</span>
      <Icon type="delete" onClick={() => onDelete(label)} />
      <Icon type="edit" onClick={onEdit} />
    </div>
  );

  switch (type) {
    case 'checkbox': {
      return (
        <Item label={labelComponent}>
          {getFieldDecorator(label)(
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
        <Item label={labelComponent}>
          {getFieldDecorator(label)(
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
        <Item label={labelComponent}>
          {getFieldDecorator(label)(
            <Select
              size="large"
              style={{ width: '100%' }}
            >
              {options.map(eachOption =>
                <Option value={eachOption} key={eachOption}>{eachOption}</Option>
              )}
            </Select>,
          )}
        </Item>
      );
    }
    default: {
      return (
        <Item label={labelComponent}>
          {getFieldDecorator(label)(
            <Input size="large" />,
          )}
        </Item>
      );
    }
  }
}

export default CustomField;