import { Modal } from 'antd';

import CustomField from './CustomField';

import { getDefaultOptions } from './utils';

const { __ } = wp.i18n;

export function CustomFields({ customFields, setCustomFields, getFieldDecorator, getFieldValue }) {
  function onAddOption(index, type = 'options') {
    // 입력 필드 옵션 추가
    const currentCustomFields = getFieldValue('customFields');
    const newCustomFields = currentCustomFields.map((field, fieldIndex) => {
      if (index === fieldIndex) {
        const defaultOptions = getDefaultOptions(type);
        return {
          ...field,
          [type]: field[type].concat(defaultOptions),
        };
      }
      return field;
    });
    setCustomFields(newCustomFields);
  }

  function onDeleteOption(index, optionIndex, type = 'options') {
    // 입력 필드 옵션 삭제
    const currentCustomFields = getFieldValue('customFields');
    const newCustomFields = currentCustomFields.map((field, fieldIndex) => {
      if (index === fieldIndex) {
        return {
          ...field,
          [type]: field[type].filter((option, eachOptionIndex) => eachOptionIndex !== optionIndex),
        };
      }
      return field;
    });
    setCustomFields(newCustomFields);
  }

  function onChangeCustomFields(index, newCustomField) {
    // 입력 필드 옵션 수정
    const currentCustomFields = getFieldValue('customFields');
    const newCustomFields = currentCustomFields.map((eachCustomField, eachIndex) => {
      if (eachIndex === index) {
        return newCustomField;
      }
      return eachCustomField;
    });
    setCustomFields(newCustomFields);
  }

  function onDeleteCustomField(index) {
    const currentCustomFields = getFieldValue('customFields');
    // customField 삭제
    Modal.confirm({
      centered: true,
      title: __('커스텀 입력필드 삭제', 'iamport-block'),
      content: __('정말로 삭제하시겠습니까?', 'iamport-block'),
      okType: 'danger',
      okText: __('삭제하기', 'iamport-block'),
      cancelText: __('취소하기', 'iamport-block'),
      onOk() {
        const newCustomFields = currentCustomFields.filter((field, fieldIndex) => fieldIndex !== index);
        setCustomFields(newCustomFields);
      },
    })
  }

  return (
    <div>
      <h3>{__('커스텀 필드', 'iamport-block')}</h3>
      {customFields && customFields.length === 0 && <h4>{__('설정된 커스텀 필드가 없습니다.', 'iamport-block')}</h4>}
      {customFields && customFields.map((field, index) =>
        <CustomField
          field={field}
          index={index}
          getFieldDecorator={getFieldDecorator}
          onAddOption={type => onAddOption(index, type)}
          onDeleteOption={(optionIndex, type) => onDeleteOption(index, optionIndex, type)}
          onChangeCustomFields={newCustomField => onChangeCustomFields(index, newCustomField)}
          onDeleteCustomField={() => onDeleteCustomField(index)}
        />
      )}
    </div>
  );
}

export default CustomFields;