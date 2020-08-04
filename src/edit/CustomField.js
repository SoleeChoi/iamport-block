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
  const { label, type, placeholder, required, options, agreementOptions } = field;
  const labelHelp = errorField && errorField.label;

  const [placeholderVisible, setPlaceholderVisible] = useState(getPlaceholderVisible(type));
  const [optionVisible, setOptionVisible] = useState(getOptionVisible(type));
  const [agreementVisible, setAgreementVisible] = useState(getAgreementVisible(type));

  const AgreementTypeSelector = ({ optionIndex, value }) =>
    <Select
      size="large"
      style={{ width: '100px' }}
      suffixIcon={<Icon type="caret-down" />}
      value={value}
      onChange={value => onChangeAgreementOptions(value, optionIndex, 'type')}
    >
      <Option key="link">링크</Option>
      <Option key="content">전문</Option>
    </Select>

  useEffect(() => {
    setOptionVisible(getPlaceholderVisible(type));
    setOptionVisible(getOptionVisible(type));
    setAgreementVisible(getAgreementVisible(type))
  }, [field]);

  function onChangeType(value) {
    // 입력 유형 변경되었을때
    const newPlaceholderVisible = getPlaceholderVisible(value);
    setPlaceholderVisible(newPlaceholderVisible);

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

  function getPlaceholderVisible(value) {
    return value === 'text';
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
          <Item validateStatus={labelHelp && 'error'} help={labelHelp}>
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
        placeholderVisible &&
        <Item label={__('입력 힌트', 'iamport-block')}>
          <Input size="large" value={placeholder} onChange={({ target: { value } }) => onChangeCustomFields({ ...field, placeholder: value })} />
        </Item>
      }
      {
        optionVisible &&
        <div>
          <div class="iamport-label-container">{__('입력 옵션', 'iamport-block')}</div>
          {options.map((eachOption, optionIndex) => {
            const optionHelp = errorField && errorField.options[optionIndex];
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
          {agreementOptions.map(({ label, value, type }, optionIndex) => {
            const agreementError = errorField && errorField.agreementOptions[optionIndex];
            let labelHelp = '';
            let valueHelp = '';
            if (agreementError) {
              const { label, value } = agreementError;
              labelHelp = label;
              valueHelp = value;
            }
            const valuePlaceholder = type === 'link' ?
              __('예) https://admin.iamport.kr/pages/terms', 'iamport-block') :
              __('예) 본 약관은 사업자회원(이하 “회원")이 주식회사 시옷(이하 “회사")가 제공하는 아임포트 결제연동 및 결제데이터 분석 등 솔루션(이하 “솔루션")의 이용에 관한 기본적인 사항을 정함으로써 상호 간에 권리/의무 관계를 명확히 하는 것을 목적으로 합니다.', 'iamport-block');

            return (
              <div>
                {
                  optionIndex === 0 &&
                  <Row gutter={[8, 0]}>
                    <Col span={7}>
                      <div class="iamport-label-container">{__('약관 라벨', 'iamport-block')}</div>
                    </Col>
                    <Col span={17}>
                      <div class="iamport-label-container">{__('약관 내용', 'iamport-block')}</div>
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
                      validateStatus={valueHelp && 'error'}
                      help={valueHelp}
                    >
                      <Input
                        size="large"
                        placeholder={valuePlaceholder}
                        value={value}
                        addonBefore={<AgreementTypeSelector optionIndex={optionIndex} value={type} />}
                        onChange={({ target : { value } }) => onChangeAgreementOptions(value, optionIndex, 'value')}
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