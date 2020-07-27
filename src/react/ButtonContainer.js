import { Button } from 'antd';

const { __ } = wp.i18n;

export function ButtonContainer({
  fieldType, defaultFieldType, loading, onCloseModal, onChangeFieldType, onPayment,
}) {
  if (fieldType === 'custom') {
    return (
      <div className="imp-btn-container">
        <Button
          size="large"
          onClick={onCloseModal}
        >{__('닫기', 'iamport-block')}</Button>
        <Button
          type="primary"
          size="large"
          onClick={() => onChangeFieldType('basic')}
        >{__('다음', 'iamport-block')}</Button>
      </div>
    );
  }

  return (
    <div className="imp-btn-container">
      {
        defaultFieldType === 'custom' ?
        <Button
          size="large"
          onClick={() => onChangeFieldType('custom')}
        >{__('이전', 'iamport-block')}</Button> :
        <Button
          size="large"
          onClick={onCloseModal}
        >{__('닫기', 'iamport-block')}</Button>
      }
      <Button
        type="primary"
        size="large"
        htmlType="submit"
        loading={loading}
        onClick={onPayment}
      >{__('결제하기', 'iamport-block')}</Button>
    </div>
  );
}

export default ButtonContainer;