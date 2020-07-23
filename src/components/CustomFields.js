import { useState } from 'react';
import { Form, Row, Col, Select, Input, Button, Divider } from 'antd';

const { Item } = Form;
const { Option } = Select;

const { __ } = wp.i18n;

export function CustomFields({
  field, index, getFieldDecorator, onAddOption, onDeleteOption,
}) {
  const { label, type, options } = field;
  const [optionVisible, setOptionVisible] = useState(type !== 'text');

  return (
    <div className="imp-custom-fields-container">
      {index !== 0 && <Divider />}
      <Row gutter={[8, 0]}>
        <Col span={12}>
          <Item>
            {getFieldDecorator(
              `customFields[${index}].type`,
              {
                initialValue: type,
              },
            )(
              <Select
                size="large"
                style={{ width: '100%' }}
                addonBefore={__('입력 유형', 'iamport-block')}
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
        <Col span={12}>
          <Item>
            {getFieldDecorator(
              `customFields[${index}].label`,
              {
                initialValue: label,
              },
            )(
              <Input
                addonBefore={__('입력 라벨', 'iamport-block')}
                size="large"
                style={{ width: '100%' }}
              />
            )}
          </Item>
        </Col>
      </Row>
      {
        optionVisible &&
        <Row gutter={[8, 0]}>
          {options.map((eachOption, optionIndex) =>
            <div>
              <Col span={20}>
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
              <Col span={4}>
                <Button
                  size="large"
                  onClick={() => onDeleteOption(eachOption)}
                >{__('옵션 삭제', 'iamport-block')}</Button>
              </Col>
            </div>
          )}
          <Col span={24}>
            <Button
              size="large"
              type="dashed"
              style={{ width: '100%' }}
              onClick={onAddOption}
            >{__('옵션 추가', 'iamport-block')}</Button>
          </Col>
        </Row>
      }
    </div>
  );
}

export default CustomFields;