import { useState } from 'react';
import { Modal, Row, Col, Select, Input, Button } from 'antd';

const { __ } = wp.i18n;
const { Option } = Select;

export function AddCustomFieldsModal({ onOk, onClose }) {
  const [type, setType] = useState();
  const [label, setLabel] = useState();
  const [options, setOptions] = useState(['']);

  function onChangeOption(value, index) {
    const newOptions = [];
    options.forEach((eachOption, i) => {
      newOptions.push(i === index ? value : eachOption);
    });
    setOptions(newOptions);
  }

  return (
    <Modal
      title={__('커스텀 입력 필드 추가', 'iamport-block')}
      visible
      centered
      okText={__('추가', 'iamport-block')}
      cancelText={__('취소', 'iamport-block')}
      okButtonProps={{
        size: 'large',
      }}
      cancelButtonProps={{
        size: 'large',
      }}
      onOk={() => onOk({ type, label, options })}
      onCancel={onClose}
    >
      <Row gutter={[8, 8]}>
        <Col span={12}>
          <Select
            placeholder={__('입력 유형 선택', 'iamport-block')}
            value={type}
            size="large"
            style={{ width: '100%' }}
            onChange={value => setType(value)}
          >
            <Option value="text">{__('텍스트', 'iamport-block')}</Option>
            <Option value="checkbox">{__('복수선택', 'iamport-block')}</Option>
            <Option value="radio">{__('단일선택 (라디오)', 'iamport-block')}</Option>
            <Option value="dropdown">{__('단일선택 (드롭다운)', 'iamport-block')}</Option>
          </Select>
        </Col>  
        <Col span={12}>
          <Input
            value={label}
            size="large"
            style={{ width: '100%' }}
            placeholder={__('입력 라벨', 'iamport-block')}
            onChange={({ target: { value } }) => setLabel(value)}  
          />
        </Col>
      </Row>
      {
        type && type !== 'text' &&
        <Row gutter={[8, 8]}>
          {options.map((eachOption, index) =>
            <Col span={24}>
              <Input
                value={eachOption}
                size="large"
                style={{ width: '100%' }}
                placeholder={__('옵션 값을 입력해주세요', 'iamport-block')}
                onChange={({ target: { value }}) => onChangeOption(value, index)}  
              />
            </Col>
          )}
          <Col span={24}>
            <Button
              size="large"
              type="dashed"
              style={{ width: '100%' }}
              onClick={() => setOptions(options.concat(['']))}
            >{__('옵션 추가', 'iamport-block')}</Button>
          </Col>
        </Row>
      }
    </Modal>
  );
}
export default AddCustomFieldsModal;