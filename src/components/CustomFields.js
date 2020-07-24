import { useState, useEffect } from 'react';
import { Form, Row, Col, Select, Input, Checkbox, Icon, Button, Divider } from 'antd';

const { Item } = Form;
const { Option } = Select;

const { __ } = wp.i18n;

export function CustomFields({
  field, index, getFieldDecorator, onAddOption, onDeleteOption, onDeleteCustomField,
}) {
  const { label, type, required, options } = field;
  const defaultOptionVisible = options !== undefined && type !== 'text';
  const [optionVisible, setOptionVisible] = useState(defaultOptionVisible);

  useEffect(() => {
    setOptionVisible(options !== undefined && type !== 'text');
  });

  const LabelComponent = () =>
    <div class="imp-custom-field-label-container">
      <span>{__('입력 라벨', 'iamport-block')}</span>
      <Item>
        {getFieldDecorator(
          `customFields[${index}].required`,
          {
            valuePropName: 'checked',
            initialValue: required,
          },
        )(<Checkbox>{__('필수 입력 여부', 'iamport-block')}</Checkbox>)}
      </Item>
    </div>

  return (
    <div className="imp-custom-fields-container">
      <Row>
        <Col span={12}>
          <Item label={<LabelComponent />}>
            {getFieldDecorator(
              `customFields[${index}].label`,
              {
                initialValue: label,
              },
            )(
              <Input
                size="large"
                style={{ width: '100%' }}
              />
            )}
          </Item>
        </Col>
        <Col span={12}>
          <Button
            type="danger"
            size="large"
            icon="close"
            shape="circle"
            onClick={onDeleteCustomField}
          />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Item label={__('입력 유형', 'iamport-block')}>
            {getFieldDecorator(
              `customFields[${index}].type`,
              {
                initialValue: type,
              },
            )(
              <Select
                size="large"
                style={{ width: '100%' }}
                suffixIcon={<Icon type="caret-down" />}
                onChange={value => setOptionVisible(value !== 'text')}
              >
                <Option value="text">{__('텍스트', 'iamport-block')}</Option>
                <Option value="checkbox">{__('복수선택', 'iamport-block')}</Option>
                <Option value="radio">{__('단일선택 (라디오)', 'iamport-block')}</Option>
                <Option value="dropdown">{__('단일선택 (드롭다운)', 'iamport-block')}</Option>
              </Select>
            )}
          </Item>
        </Col>
        <Col span={12}></Col>
      </Row>
      {
        optionVisible &&
        <Row>
          <div class="ant-col ant-form-item-label ant-form-item-label-left">
            <label>{__('입력 옵션', 'iamport_block')}</label>
          </div>
          {options.map((eachOption, optionIndex) =>
            <Row>
              <Col span={12}>
                <Item>
                  {getFieldDecorator(
                    `customFields[${index}].options[${optionIndex}]`,
                    {
                      initialValue: eachOption,
                    },
                  )(
                    <Input
                      size="large"
                      style={{ width: '100%' }}
                      placeholder={__('옵션 값을 입력해주세요', 'iamport-block')}
                    />
                  )}
                </Item>
              </Col>
              <Col span={12}>
                <Button
                  size="large"
                  icon="close"
                  shape="circle"
                  onClick={() => onDeleteOption(eachOption)}
                />
              </Col>
            </Row>
          )}
          <Row>
            <Col span={24}>
              <Button
                size="large"
                type="dashed"
                icon="plus"
                style={{ width: '100%' }}
                onClick={onAddOption}
              />
            </Col>
          </Row>
        </Row>
      }
      <Divider />
    </div>
  );
}

export default CustomFields;