import { useState, useEffect } from 'react';
import { Row, Col, Form, Select, Input, Checkbox, Icon, Button, Divider } from 'antd';

import { OPTION_TYPES } from './constants';

const { Item } = Form;
const { Option } = Select;
const { __ } = wp.i18n;

export function CustomField({
  field,
  errorField,
  onAddOption,
  onDeleteOption,
  onDeleteCustomField,
  onChangeCustomFields,
}) {
  const { label, type, required, options, agreementOptions } = field;
  const [optionVisible, setOptionVisible] = useState(getOptionVisible(type));
  const [agreementVisible, setAgreementVisible] = useState(getAgreementVisible(type));

  useEffect(() => {
    setOptionVisible(getOptionVisible(type));
    setAgreementVisible(getAgreementVisible(type))
  }, [field]);

  function onChangeType(value) {
    // 입력 유형 변경되었을때
    const newOptionVisible = getOptionVisible(value);
    setOptionVisible(newOptionVisible);

    const newAgreementVisible = getAgreementVisible(value);
    setAgreementVisible(newAgreementVisible);

    const newField = { ...field, type: value };
    onChangeCustomFields(newField);
  }

  function onChangeOption(value, index) {
    // 입력 옵션 값 변경되었을때
    const newOptions = options.map((eachOption, optionIndex) => {
      if (optionIndex === index) {
        return value;
      }
      return eachOption;
    });
    onChangeCustomFields({ ...field, options: newOptions });
  }

  function onChangeAgreementOptions(value, index, type) {
    // 약관 옵션 값 변경되었을때
    const newAgreementOptions = agreementOptions.map((eachOption, optionIndex) => {
      if (optionIndex === index) {
        return { ...eachOption, [type]: value };
      }
      return eachOption;
    });
    onChangeCustomFields({ ...field, agreementOptions: newAgreementOptions });
  }

  function getOptionVisible(value) {
    return value !== 'text' && value !== 'file' && value !== 'address' && !getAgreementVisible(value);
  }

  function getAgreementVisible(value) {
    return value === 'agreement';
  }

  return (
    <div className="iamport-custom-fields-container">
      <Row gutter={[8, 8]}>
        <Col span={7}>
          <div className="iamport-label-container">{__('입력 유형', 'iamport-block')}</div>
        </Col>
        <Col span={7}>
          <div className="iamport-label-container">{__('입력 라벨', 'iamport-block')}</div>
        </Col>
        <Col span={10} className="iamport-delete-field-container">
          <Button
            type="danger"
            onClick={onDeleteCustomField}
          >{__('필드삭제', 'iamport-block')}</Button>
        </Col>
      </Row>
      <Row gutter={[8, 8]}>
        <Col span={7}>
          <Select
            size="large"
            suffixIcon={<Icon type="caret-down" />}
            value={type}
            onChange={onChangeType}
          >
            {Object.keys(OPTION_TYPES).map(eachType =>
              <Option value={eachType}>{OPTION_TYPES[eachType]}</Option>
            )}
          </Select>
        </Col>
        <Col span={7}>
          <Item validateStatus={errorField.label && 'error'} help={errorField.label}>
            <Input
              size="large"
              value={label}
              onChange={({ target : { value } }) => onChangeCustomFields({ ...field, label: value })}
            />
          </Item>
        </Col>
        <Col span={10}>
          <Checkbox
              checked={required}
              onChange={({ target: { checked } }) => onChangeCustomFields({ ...field, required: checked })}
            >{__('필수 입력/선택 여부', 'iamport-block')}</Checkbox>
        </Col>
      </Row>
      {
        optionVisible &&
        <div>
          <div class="iamport-label-container">{__('입력 옵션', 'iamport-block')}</div>
          {options.map((eachOption, optionIndex) => {
            const optionHelp = errorField.options[optionIndex];
            return (
              <Row gutter={[8, 0]}>
                <Col span={21}>
                  <Item validateStatus={optionHelp && 'error'} help={optionHelp}>
                    <Input
                      size="large"
                      value={eachOption}
                      onChange={({ target : { value } }) => onChangeOption(value, optionIndex)}
                      placeholder={__('옵션 값을 입력해주세요', 'iamport-block')}
                    />
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
            );
          })}
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
          <Row></Row>
          {agreementOptions.map(({ label, link }, optionIndex) => {
            const agreementError = errorField.agreementOptions[optionIndex];
            let labelHelp = '';
            let linkHelp = '';
            if (agreementError) {
              const { label, link } = agreementError;
              labelHelp = label;
              linkHelp = link;
            }
            return (
              <div>
                {
                  optionIndex === 0 &&
                  <Row gutter={[8, 0]}>
                    <Col span={7}>
                      <div class="iamport-label-container">{__('약관 라벨', 'iamport-block')}</div>
                    </Col>
                    <Col span={17}>
                      <div class="iamport-label-container">{__('약관 링크', 'iamport-block')}</div>
                    </Col>
                  </Row>
                }
                <Row gutter={[8, 0]}>
                  <Col span={7}>
                    <Item
                      validateStatus={labelHelp && 'error'}
                      help={labelHelp}
                    >
                      <Input
                        size="large"
                        placeholder={__('예) 개인정보 이용제공 동의', 'iamport-block')}
                        value={label}
                        onChange={({ target : { value } }) => onChangeAgreementOptions(value, optionIndex, 'label')}
                      />
                    </Item>
                  </Col>
                  <Col span={14}>
                    <Item
                      validateStatus={linkHelp && 'error'}
                      help={linkHelp}
                    >
                      <Input
                        size="large"
                        placeholder={__('예) https://admin.iamport.kr/pages/terms', 'iamport-block')}
                        value={link}
                        onChange={({ target : { value } }) => onChangeAgreementOptions(value, optionIndex, 'link')}
                      />
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
              </div>
            );
          })}
          <Button
            size="large"
            type="dashed"
            icon="plus"
            style={{ width: '100%' }}
            onClick={() => onAddOption('agreementOptions')}
          />
        </div>
      }
      <Divider dashed />
    </div>
  );
}

export default CustomField;