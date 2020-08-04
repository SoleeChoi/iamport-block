import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'antd';
import 'antd/dist/antd.css';

import BasicFields from './BasicFields';
import CustomField from './CustomField';
import ButtonContainer from './ButtonContainer';

import { getButtonStyle, getDefaultFieldValues, getCustomLabels, getPaymentData, getOrderData } from './utils';
import { showLoginRequiredModal, showPaymentFailedModal } from '../utils';

const { __ } = wp.i18n;

function App({ form, type, attributes }) {
  const { validateFields, getFieldDecorator, setFieldsValue } = form;
  const {
    userCode,
    adminUrl,
    loginUrl,
    isLoginRequired,
    buttonName,
    buttonStyle,
    buttonClassName,
    modalClassName,
    title,
    description,
    amountType,
    customFields,
  } = attributes;

  const defaultFieldType = customFields && customFields.length === 0 ? 'basic' : 'custom';
  const customLabels = getCustomLabels(customFields);
  const [isOpen, setIsOpen] = useState(false);
  const [fieldType, setFieldType] = useState(defaultFieldType);
  const [loading, setLoading] = useState(false);

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
      showLoginRequiredModal(() => {
        window.location.href = loginUrl;
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
     * 기본 필드로 넘어가기 전에,
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
        const paymentData = getPaymentData(values, attributes, type);
        const orderData = getOrderData(paymentData);
        console.log(paymentData, orderData);

        jQuery.ajax({
          method: 'POST',
          url: adminUrl,
          contentType: false,
          processData: false,
          data: orderData,
        }).done(({ order_uid, thankyou_url, customer_uid }) => {
          setFieldType('custom');
          setIsOpen(false);

          // 일반결제의 결제금액이 0원인 경우, 결제창 호출하지 않고 종료
          if (amountType === 'free') {
            location.href = thankyou_url;
            return true;
          }

          setLoading(true);
          const data = {
            ...paymentData,
            merchant_uid: order_uid,
            m_redirect_url: thankyou_url,
          };
          if (type === 'subscription') {
            // 정기결제의 경우 customer_uid를 추가한다
            data.customer_uid = customer_uid;
          }
          IMP.request_pay(data, response => {
            setLoading(false);
            const { success, error_msg } = response;
            if (success) {
              location.href = thankyou_url;
            } else {
              showPaymentFailedModal(error_msg);
            }
          });
        }).fail(({ responseText }) => {
          showPaymentFailedModal(responseText);
        });
      }
    });
  }

  return (
    <div>
      <Button
        size="large"
        type="primary"
        style={getButtonStyle(buttonStyle)}
        className={buttonClassName}
        onClick={openModal}
      >{buttonName}</Button>
      {
        isOpen &&
        <Modal
          visible
          className={`iamport-block-modal ${modalClassName}`}
          centered={true}
          title={<ModalTitle />}
          footer={null}
          onCancel={() => {
            setIsOpen(false);
            setFieldType(defaultFieldType);
          }}
        >
          <Form
            layout="vertical"
            className="iamport-block-form"
            onSubmit={onClickPayment}
          >
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
            fieldType={fieldType}
            defaultFieldType={defaultFieldType}
            onChangeFieldType={value => setFieldType(value)}
            onCloseModal={() => setIsOpen(false)}
            onClickNext={onClickNext}
            onPayment={onClickPayment}
          />
        </Modal>
      }
      {loading && <div className="iamport-dimmed-background"></div>}
    </div>
  );
}

const WrappedApp = Form.create({ name: 'iamport-payment-modal' })(App);
export default WrappedApp;