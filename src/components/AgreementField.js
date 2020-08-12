import { Form, Row, Col, Checkbox, Input } from 'antd';

const { __ } = wp.i18n;
const { Item } = Form;
const { TextArea } = Input;

function AgreementField({
  label,
  className,
  name,
  required,
  agreementLabel,
  value,
  type,
  getFieldDecorator,
}) {
  return (
    <Item
      label={label}
      className={className}
    >
      <Row>
        <Col span={20}>
          {getFieldDecorator(name, {
            valuePropName: 'checked',
            rules: [{
              validator:(_, value) => required && !value ? Promise.reject('약관 동의는 필수입니다') : Promise.resolve(),
            }],
          })(
            <Checkbox>{agreementLabel}</Checkbox>,
          )}
        </Col>
        <Col span={4} className="iamport-agreement-link">
          {
            type === 'link' &&
            <a
              href={value}
              key={value}
              target="_blank"
            >{__('약관 보기', 'iamport-block')}</a>
          }
        </Col>
      </Row>
      {
        type === 'content' &&
        <Row gutter={[8, 8]}>
          <Col span={24}><TextArea value={value} /></Col>
        </Row>
      }
    </Item>
  );
}

export default AgreementField;
