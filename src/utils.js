import { Modal } from 'antd';

const { __ } = wp.i18n;

export function showDeleteCustomFieldModal(onOk) {
  // [edit] customField 삭제
  Modal.confirm({
    centered: true,
    title: __('커스텀 입력필드 삭제', 'iamport-block'),
    content: __('정말로 삭제하시겠습니까?', 'iamport-block'),
    okType: 'danger',
    okText: __('삭제하기', 'iamport-block'),
    cancelText: __('취소하기', 'iamport-block'),
    onOk() {
      onOk();
    },
  });
}

export function showSetAttributesModal(isAvailable) {
  if (isAvailable) {
    // [edit] 아임포트 블록 설정 정보 저장 성공
    Modal.info({
      centered: true,
      title: __('아임포트 블록 설정 완료', 'iamport-block'),
      content: __('아임포트 블록 설정 정보가 저장되었습니다. 우측 상단 업데이트 버튼을 눌러주세요.', 'iamport-block'),
      okText: __('확인', 'iamport-block'),
    });
  } else {
    // [edit] 아임포트 블록 설정 정보 저장 실패
    Modal.error({
      centered: true,
      title: __('아임포트 블록 설정 실패', 'iamport-block'),
      content: __('입력 하신 값이 유효하지 않습니다. 수정 후 다시 시도해주세요.', 'iamport-block'),
      okType: 'danger',
      okText: __('닫기', 'iamport-block'),
    });
  }
}

export function showLoginRequiredModal(onOk) {
  // [save] 로그인 필요
  Modal.confirm({
    centered: true,
    title: __('로그인 필요', 'iamport-block'),
    content: __('결제 기능을 이용하기 위해서는 로그인이 필요합니다', 'iamport-block'),
    okType: 'danger',
    okText: __('로그인하기', 'iamport-block'),
    cancelText: __('닫기', 'iamport-block'),
    onOk() {
      onOk();
    },
  });
}

export function showPaymentFailedModal(content) {
  // [save] 결제 실패
  Modal.error({
    centered: true,
    title: __('결제 실패', 'iamport-block'),
    content,
    okType: 'danger',
    okText: __('닫기', 'iamport-block'),
  });
}
