import { useState, useEffect } from 'react';
import { Row, Col, Select, Input, Checkbox, Icon, Button, Divider } from 'antd';

import { OPTION_TYPES } from '../constants';

const { Option } = Select;
const { __ } = wp.i18n;

export function CustomFields({
  field,
  onAddOption,
  onDeleteOption,
  onDeleteCustomField,
  onChange,
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
    onChange(newField);
  }

  function onChangeOption(value, index) {
    // 입력 옵션 값 변경되었을때
    const newOptions = options.map((eachOption, optionIndex) => {
      if (optionIndex === index) {
        return value;
      }
      return eachOption;
    });
    onChange({ ...field, options: newOptions });
  }

  function onChangeAgreementOptions(value, index, type) {
    // 약관 옵션 값 변경되었을때
    const newAgreementOptions = agreementOptions.map((eachOption, optionIndex) => {
      if (optionIndex === index) {
        return { ...eachOption, [type]: value };
      }
      return eachOption;
    });
    onChange({ ...field, agreementOptions: newAgreementOptions });
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
          <div className="imp-label-container">{__('입력 유형', 'iamport-block')}</div>
        </Col>
        <Col span={7}>
          <div className="imp-label-container">{__('입력 라벨', 'iamport-block')}</div>
        </Col>
        <Col span={10} className="imp-delete-field-container">
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
          <Input
            size="large"
            value={label}
            onChange={({ target : { value } }) => onChange({ ...field, label: value })}
          />
        </Col>
        <Col span={10}>
          <Checkbox
              checked={required}
              onChange={({ target: { checked } }) => onChange({ ...field, required: checked })}
            >{__('필수 입력/선택 여부', 'iamport-block')}</Checkbox>
        </Col>
      </Row>
      {
        optionVisible &&
        <div>
          <div class="imp-label-container">{__('입력 옵션', 'iamport_block')}</div>
          {options.map((eachOption, optionIndex) =>
            <Row gutter={[8, 8]}>
              <Col span={21}>
                <Input
                  size="large"
                  value={eachOption}
                  onChange={({ target : { value } }) => onChangeOption(value, optionIndex)}
                  placeholder={__('옵션 값을 입력해주세요', 'iamport-block')}
                />
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
            style={{ width: '100%', marginTop: '4px' }}
            onClick={() => onAddOption('options')}
          />
        </div>
      }
      {
        agreementVisible &&
        <div>
          <Row gutter={[8, 8]}>
            <Col span={7}>
              <div class="imp-label-container">{__('약관 라벨', 'iamport_block')}</div>
            </Col>
            <Col span={17}>
              <div class="imp-label-container">{__('약관 링크', 'iamport_block')}</div>
            </Col>
          </Row>
          {agreementOptions.map(({ label, link }, optionIndex) =>
            <Row gutter={[8, 8]}>
              <Col span={7}>
                <Input
                  size="large"
                  placeholder={__('예) 개인정보 이용제공 동의', 'iamport_block')}
                  value={label}
                  onChange={({ target : { value } }) => onChangeAgreementOptions(value, optionIndex, 'label')}
                />
              </Col>
              <Col span={14}>
                <Input
                  size="large"
                  placeholder={__('예) https://admin.iamport.kr/pages/terms', 'iamport_block')}
                  value={link}
                  onChange={({ target : { value } }) => onChangeAgreementOptions(value, optionIndex, 'link')}
                />
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

export default CustomFields;