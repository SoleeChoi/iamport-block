import { useState, useEffect } from 'react';
import { Row, Col, Form, Select, Input, Checkbox, Icon, Button, Divider } from 'antd';

import { OPTION_TYPES } from '../constants';

const { Item } = Form;
const { Option } = Select;
const { __ } = wp.i18n;

export function CustomField({
  field,
  index,
  getFieldDecorator,
  onAddOption,
  onDeleteOption,
  onDeleteCustomField,
  onChangeCustomFields,
}) {
  const { type, required, options, agreementOptions } = field;
  const [optionVisible, setOptionVisible] = useState(getOptionVisible(type));
  const [agreementVisible, setAgreementVisible] = useState(getAgreementVisible(type));

  useEffect(() => {
    setOptionVisible(getOptionVisible(type));
    setAgreementVisible(getAgreementVisible(type))
  }, [field]);

  const DeleteFieldButton = () =>
    <Button
      type="danger"
      onClick={onDeleteCustomField}
    >{__('필드삭제', 'iamport-block')}</Button>

  function onChangeType(value) {
    // 입력 유형 변경되었을때
    const newOptionVisible = getOptionVisible(value);
    setOptionVisible(newOptionVisible);

    const newAgreementVisible = getAgreementVisible(value);
    setAgreementVisible(newAgreementVisible);

    const newField = { ...field, type: value };
    if (newOptionVisible && Object.keys(newField).indexOf('options') === -1) {
      newField.options = [''];
    }
    if (newAgreementVisible && Object.keys(newField).indexOf('agreementOptions') === -1) {
      newField.agreementOptions = [{ label: '', link: '' }];
    }
    onChangeCustomFields(newField);
  }

  function getOptionVisible(value) {
    return value !== 'text' && value !== 'file' && value !== 'address' && !getAgreementVisible(value);
  }

  function getAgreementVisible(value) {
    return value === 'agreement';
  }

  return (
    <div className="imp-custom-fields-container">
      <Row gutter={[8, 8]}>
        <Col span={7}>
          <Item label ={__('입력 유형', 'iamport-block')}>
            {getFieldDecorator(`customFields[${index}].type`)(
              <Select
                size="large"
                suffixIcon={<Icon type="caret-down" />}
                onChange={onChangeType}
              >
                {Object.keys(OPTION_TYPES).map(eachType =>
                  <Option value={eachType}>{OPTION_TYPES[eachType]}</Option>
                )}
              </Select>
            )}
          </Item>
        </Col>
        <Col span={7}>
          <Item label={__('입력 라벨', 'iamport-block')}>
            {getFieldDecorator(`customFields[${index}].label`, {
              rules: [{ required: true, message: __('필수 입력입니다', 'iamport-block' )}],
            })(<Input size="large" />)}
          </Item>
        </Col>
        <Col span={10}>
          <Item label={<DeleteFieldButton />}>
            {getFieldDecorator(`customFields[${index}].required`)(
              <Checkbox checked={required}>{__('필수 입력/선택 여부', 'iamport-block')}</Checkbox>
            )}
          </Item>
        </Col>
      </Row>
      {
        optionVisible &&
        <div>
          {options && options.map((_, optionIndex) =>
            <Row>
              <Col span={21}>
                <Item label={optionIndex === 0 && __('입력 옵션', 'iamport_block')}>
                  {getFieldDecorator(`customFields[${index}].options[${optionIndex}]`, {
                    rules: [{ required: true, message: __('필수 입력입니다', 'iamport-block' )}],
                  })(
                    <Input
                      size="large"
                      placeholder={__('옵션 값을 입력해주세요', 'iamport-block')}
                    />
                  )}
                </Item>
              </Col>
              <Col span={3}>
                <Button
                  size="large"
                  icon="close"
                  shape="circle"
                  disabled={optionIndex === 0 && options.length === 1}
                  onClick={() => onDeleteOption(optionIndex)}
                />
              </Col>
            </Row>
          )}
          <Button
            size="large"
            type="dashed"
            icon="plus"
            style={{ width: '100%' }}
            onClick={() => onAddOption('options')}
          />
        </div>
      }
      {
        agreementVisible &&
        <div>
          {agreementOptions && agreementOptions.map((_, optionIndex) =>
            <Row gutter={[8, 8]}>
              <Col span={7}>
                <Item label={optionIndex === 0 && __('약관 라벨', 'iamport_block')}>
                  {getFieldDecorator(`customFields[${index}].agreementOptions[${optionIndex}].label`, {
                    rules: [{ required: true, message: __('필수 입력입니다', 'iamport-block' )}],
                  })(
                    <Input
                      size="large"
                      placeholder={__('예) 개인정보 이용제공 동의', 'iamport_block')}
                    />
                  )}
                </Item>
              </Col>
              <Col span={14}>
                <Item label={optionIndex === 0 && __('약관 링크', 'iamport_block')}>
                  {getFieldDecorator(`customFields[${index}].agreementOptions[${optionIndex}].link`, {
                    rules: [{
                      required: true, message: __('필수 입력입니다', 'iamport-block'),
                    }, {
                      type: 'url', message: __('링크가 올바르지 않습니다', 'iamport-block'),
                    }],
                  })(
                    <Input
                      size="large"
                      placeholder={__('예) https://admin.iamport.kr/pages/terms', 'iamport_block')}
                    />
                  )}
                </Item>
              </Col>
              <Col span={3}>
                <Button
                  size="large"
                  icon="close"
                  shape="circle"
                  disabled={optionIndex === 0 && agreementOptions.length === 1}
                  onClick={() => onDeleteOption(optionIndex, 'agreementOptions')}
                />
              </Col>
            </Row>
          )}
          <Button
            size="large"
            type="dashed"
            icon="plus"
            style={{ width: '100%', marginTop: '4px' }}
            onClick={() => onAddOption('agreementOptions')}
          />
        </div>
      }
      <Divider dashed />
    </div>
  );
}

export default CustomField;