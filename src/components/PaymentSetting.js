import { useState, useEffect } from 'react';
import { Form, Row, Col, Input, Checkbox, Button, Modal } from 'antd';

// import PaymentAmount from './PaymentAmount';
import AddCustomFieldsModal from './AddCustomFieldsModal';
import CustomField from './CustomField';

import { PAY_METHODS } from '../constants';

const { __ } = wp.i18n;
const { Item } = Form;

export function PaymentSetting({ form, attributes, className, setAttributes }) {
  const { validateFields, getFieldDecorator, setFieldsValue } = form;
  const {
    buttonName, title, description, name, mode, amount, payMethods,
  } = attributes;
  const [isOpen, setIsOpen] = useState(false);
  const [customFields, setCustomFields] = useState(attributes.customFields || []);

  useEffect(() => {
    console.log(attributes);
    setTimeout(() => {
      // 기본 값: 버튼 라벨, 팝업 파이틀, 팝업 설명, 주문명, 결제수단, 결제금액
      const newFieldsValue = {
        buttonName: buttonName || __('결제하기', 'iamport-block'),
        title: title || __('참가권 결제', 'iamport-block'),
        description: description || __('아래 정보를 기입 후 결제를 진행해주세요.', 'iamport-block'),
        name: name || __('아임포트 워드프레스 결제버튼 생성 플러그인 주문', 'iamport-block'),
        mode: mode || 'fixed',
        amount: amount || 1000,
        payMethods: payMethods || [], 
      };

      // 커스텀 입력 필드
      customFields.forEach(({ label, value }) => {
        newFieldsValue[label] = value;
      });
      setFieldsValue(newFieldsValue);
    }, 0);
  }, []);

  function onSubmit() {
    validateFields((error, values) => {
      if (!error) {
        // 기본 값: 버튼 라벨, 팝업 파이틀, 팝업 설명, 주문명, 결제수단, 결제금액
        const newAttributes = {};
        Object.keys(values).forEach(key => {
          const value = values[key];
          if (['buttonName', 'title', 'description', 'payMethods'].indexOf(key) !== -1) {
            newAttributes[key] = value;
          }
        });

        // 커스텀 입력 필드
        const newCustomFields = customFields.map(field => {
          return {
            ...field,
            value: values[field.label],
          };
        });
        newAttributes.customFields = newCustomFields;
        console.log(newAttributes);
        setAttributes(newAttributes);
      }
    });
  }

  function onAddCustomField(customField) {
    setCustomFields(customFields.concat([customField]));
    setIsOpen(false);
  }

  function onEditCustomField() {
    // customField 수정
  }

  function onDeleteCustomField(label) {
    // customField 삭제
    Modal.confirm({
      centered: true,
      title: __('커스텀 입력필드 삭제', 'iamport-block'),
      content: __('정말로 삭제하시겠습니까?', 'iamport-block'),
      okType: 'danger',
      okText: __('삭제하기', 'iamport-block'),
      cancelText: __('취소하기', 'iamport-block'),
      onOk() {
        console.log(label);
        const newCustomFields = customFields.filter(field => field.label !== label);
        setCustomFields(newCustomFields);
      },
    })
  }

  return (
    <div className={className} onSubmit={onSubmit}>
      <Form layout="horizontal" labelAlign="left">
        <h3>기본 입력 필드</h3>
        <Item label={__('결제 버튼 라벨','iamport-block')}>
          {getFieldDecorator('buttonName')(
            <Input size="large" />,
          )}
        </Item>
        <Item label={__('결제 팝업 타이틀','iamport-block')}>
          {getFieldDecorator('title')(
            <Input size="large" />,
          )}
        </Item>
        <Item label={__('결제 팝업 설명','iamport-block')}>
          {getFieldDecorator('description')(
            <Input size="large" />,
          )}
        </Item>
        <Item label={__('주문명','iamport-block')}>
          {getFieldDecorator('name')(
            <Input size="large" />,
          )}
        </Item>
        <Item label={__('결제수단','iamport-block')}>
          {getFieldDecorator('payMethods')(
            <Checkbox.Group>
              <Row>
                {Object.keys(PAY_METHODS).map(method =>
                  <Col key={method} md={12} lg={8} xl={6}>
                    <Checkbox value={method}>{PAY_METHODS[method]}</Checkbox>
                  </Col>
                )}
              </Row>
            </Checkbox.Group>
          )}
        </Item>
        {/* 결제금액 */}
        {/* <PaymentAmount
          mode={mode}
          amount={amount}
          onChangeMode={mode => setAttributes({ mode })}
          onChangeAmount={amount => setAttributes({ amount })}
        /> */}
        <h3>
          <span>커스텀 입력 필드</span>
          <Button size="large" onClick={() => setIsOpen(true)}>추가하기</Button>
        </h3>
        {customFields.length === 0 && <h4>설정된 커스텀 입력 필드가 없습니다.</h4>}
        {customFields.map(field =>
          <CustomField
            field={field}
            getFieldDecorator={getFieldDecorator}
            onEdit={onEditCustomField}
            onDelete={onDeleteCustomField}
          />
        )}
        <Button
          type="primary"
          htmlType="submit"
          size="large"
        >{__('저장하기', 'iamport-block')}</Button>
      </Form>
      {
        isOpen &&
        <AddCustomFieldsModal
          onOk={onAddCustomField}
          onClose={() => setIsOpen(false)}
        />
      }
    </div>
  );
}
const WrappedPaymentSetting = Form.create({ name: 'iamport-payment-setting' })(PaymentSetting);
export default WrappedPaymentSetting;