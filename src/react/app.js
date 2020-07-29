import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'antd';
import 'antd/dist/antd.css';

import BasicFields from './BasicFields';
import CustomField from './CustomField';
import ButtonContainer from './ButtonContainer';

import { getDefaultFieldValues, getCustomLabels, getPaymentData, getOrderData } from './utils';

const { __ } = wp.i18n;

function App({ form, attributes }) {
  const { validateFields, getFieldDecorator, setFieldsValue } = form;
  const {
    userCode,
    adminUrl,
    loginUrl,
    isLoginRequired,
    buttonName,
    title,
    description,
    customFields,
  } = attributes;

  const defaultFieldType = customFields.length === 0 ? 'basic' : 'custom';
  const customLabels = getCustomLabels(customFields);
  const [isOpen, setIsOpen] = useState(false);
  const [fieldType, setFieldType] = useState(defaultFieldType);
  // const [loading, setLoading] = useState(false);

  const ModalTitle = () => 
    <div>
      <h3>{title}</h3>
      <h5>{description}</h5>
    </div>

  useEffect(() => {
    IMP.init(userCode);
  }, []);

  function openModal() {
    if (isLoginRequired) {
      Modal.confirm({
        centered: true,
        title: __('로그인 필요', 'iamport-block'),
        content: __('결제 기능을 이용하기 위해서는 로그인이 필요합니다', 'iamport-block'),
        okType: 'danger',
        okText: __('로그인하기', 'iamport-block'),
        cancelText: __('닫기', 'iamport-block'),
        onOk() {
          window.location.href = loginUrl;
        },
      });
    } else {
      setIsOpen(true);

      setTimeout(() => {
        const defaultFieldValues = getDefaultFieldValues(attributes);
        setFieldsValue(defaultFieldValues);
      }, 0);
    }
  }

  function onClickNext() {
    /**
     * 기본 입력 필드로 넘어가기 전에,
     * 커스텀 입력 필드에 대해 validation 체크를 한다
     */
    validateFields(customLabels, error => {
      if (error) {
        return false;
      }
      setFieldType('basic');
    });
  }

  function onClickPayment() {
    validateFields((error, values) => {
      if (!error) {
        const paymentData = getPaymentData(values, attributes);
        const orderData = getOrderData(paymentData);

        jQuery.ajax({
          method: 'POST',
          url: adminUrl,
          contentType: false,
          processData: false,
          data: orderData,
        }).done(({ order_uid, thankyou_url }) => {
          setIsOpen(false);
          setFieldType('basic');

          const data = {
            ...paymentData,
            merchant_uid: order_uid,
            m_redirect_url: thankyou_url,
          };
          console.log(data);
          IMP.request_pay(data, response => {
            console.log(response);
            const { success, error_msg } = response;
            if (success) {
              location.href = thankyou_url;
            } else {
              Modal.error({
                centered: true,
                title: __('결제 실패', 'iamport-block'),
                content: error_msg,
                okType: 'danger',
                okText: __('닫기', 'iamport-block'),
              });
            }
          });
        }).fail(({ responseText }) => {
          alert(responseText);
        });
      }
    });
  }

  return (
    <div>
      <Button size="large" type="primary" onClick={openModal}>{buttonName}</Button>
      {
        isOpen &&
        <Modal
          visible
          centered={true}
          title={<ModalTitle />}
          footer={null}
          onCancel={() => {
            setIsOpen(false);
            setFieldType(defaultFieldType);
          }}
        >
          <Form layout="vertical" onSubmit={onClickPayment}>
            <div style={{ display: fieldType === 'custom' ? 'block' : 'none' }}>
              {customFields.map(field =>
                <CustomField
                  key={field.label}
                  field={field}
                  getFieldDecorator={getFieldDecorator}
                  onChangeAddress={addressObj => setFieldsValue(addressObj)}
                />
              )}
            </div>
            <BasicFields
              getFieldDecorator={getFieldDecorator}
              attributes={attributes} 
              show={fieldType === 'basic'}
            />
          </Form>
          <ButtonContainer
            // loading={loading}
            fieldType={fieldType}
            defaultFieldType={defaultFieldType}
            onChangeFieldType={value => setFieldType(value)}
            onCloseModal={() => setIsOpen(false)}
            onClickNext={onClickNext}
            onPayment={onClickPayment}
          />
        </Modal>
      }
    </div>
  );
}

const WrappedApp = Form.create({ name: 'iamport-payment-modal' })(App);
export default WrappedApp;