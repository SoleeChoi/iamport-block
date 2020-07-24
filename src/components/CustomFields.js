import { useState } from 'react';
import { Row, Col, Select, Input, Checkbox, Icon, Button, Divider } from 'antd';

import { OPTION_TYPES } from '../constants';

const { Option } = Select;
const { __ } = wp.i18n;

export function CustomFields({
  field, onAddOption, onDeleteOption, onDeleteCustomField, onChange,
}) {
  const { label, type, required, options, agreementOptions } = field;
  const [optionVisible, setOptionVisible] = useState(getOptionVisible(type));
  const [agreementVisible, setAgreementVisible] = useState(getAgreementVisible(type));

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

  function onChangeAgreementOptions(value, type) {
    // 약관 옵션 값 변경되었을때
    const newAgreementOptions = { ...agreementOptions, [type]: value };
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
      <Button
        type="danger"
        onClick={onDeleteCustomField}
      >
        {__('필드삭제', 'iamport-block')}
      </Button>
      <Row gutter={[8, 8]}>
        <Col span={11}>
          <div class="imp-label-container">
            {__('입력 유형', 'iamport-block')}
            <Checkbox
              checked={required}
              onChange={({ target: { checked } }) => onChange({ ...field, required: checked })}
            >{__('필수 입력/선택 여부', 'iamport-block')}</Checkbox>
          </div>
          <Select
            size="large"
            style={{ width: '100%' }}
            suffixIcon={<Icon type="caret-down" />}
            value={type}
            onChange={onChangeType}
          >
            {Object.keys(OPTION_TYPES).map(eachType =>
              <Option value={eachType}>{OPTION_TYPES[eachType]}</Option>
            )}
          </Select>
        </Col>
        <Col span={11}>
          <div class="imp-label-container">
            {__('입력 라벨', 'iamport-block')}
          </div>
          <Input
            size="large"
            value={label}
            onChange={({ target : { value } }) => onChange({ ...field, label: value })}
            style={{ width: '100%' }}
          />
        </Col>
        <Col span={2}></Col>
      </Row>
      {
        optionVisible &&
        <div>
          <div class="imp-label-container">
            {__('입력 옵션', 'iamport_block')}
          </div>
          {options.map((eachOption, optionIndex) =>
            <Row gutter={[8, 8]}>
              <Col span={22}>
                <Input
                  size="large"
                  style={{ width: '100%' }}
                  value={eachOption}
                  onChange={({ target : { value } }) => onChangeOption(value, optionIndex)}
                  placeholder={__('옵션 값을 입력해주세요', 'iamport-block')}
                />
              </Col>
              <Col span={2}>
                <Button
                  size="large"
                  icon="close"
                  shape="circle"
                  disabled={optionIndex === 0 && options.length === 1}
                  onClick={() => onDeleteOption(eachOption)}
                />
              </Col>
            </Row>
          )}
          <Row gutter={[8, 8]}>
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
        </div>
      }
      {
        agreementVisible &&
        <Row gutter={[8, 8]}>
          <Col span={11}>
            <div class="imp-label-container">
              {__('약관 라벨', 'iamport_block')}
            </div>
            <Input
              size="large"
              style={{ width: '100%' }}
              placeholder={__('예) 개인정보 이용제공 동의', 'iamport_block')}
              value={agreementOptions.label}
              onChange={({ target : { value } }) => onChangeAgreementOptions(value, 'label')}
            />
          </Col>
          <Col span={11}>
            <div class="imp-label-container">
              {__('약관 링크', 'iamport_block')}
            </div>
            <Input
              size="large"
              style={{ width: '100%' }}
              placeholder={__('예) https://admin.iamport.kr/pages/terms', 'iamport_block')}
              value={agreementOptions.link}
              onChange={({ target : { value } }) => onChangeAgreementOptions(value, 'link')}
            />
          </Col>
          <Col span={2}></Col>
        </Row>
      }
      <Divider />
    </div>
  );
}

export default CustomFields;