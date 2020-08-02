import { useRef } from 'react';
import { Form, Input } from 'antd';

const { __ } = wp.i18n;

const { Item } = Form;
const { Search } = Input;

export function AddressField({ label, required, getFieldDecorator, onChange }) {

  // 우편번호 찾기 찾기 화면을 넣을 element
  const wrapRef = useRef(null);
  const detailAddressRef = useRef(null);

  function hideIframe() {
    // iframe을 넣은 element를 안보이게 한다.
    wrapRef.current.style.display = 'none';
  }

  function searchZipcode() {
    // 현재 scroll 위치를 저장해놓는다.
    const currentScroll = Math.max(document.body.scrollTop, document.documentElement.scrollTop);

    new daum.Postcode({
      oncomplete: ({
        userSelectedType,
        roadAddress,
        jibunAddress,
        bname,
        buildingName,
        apartment,
        zonecode,
      }) => {
        /**
         * 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.
         * 
         * 각 주소의 노출 규칙에 따라 주소를 조합한다.
         * 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
         */

        /**
         * 사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
         * 사용자가 도로명 주소를 선택했을 경우
         * 사용자가 지번 주소를 선택했을 경우(J)
         */
        const addr = userSelectedType === 'R' ? roadAddress : jibunAddress;

        let extraAddr = ''; // 참고항목 변수
        // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
        if (userSelectedType === 'R') {
          // 법정동명이 있을 경우 추가한다. (법정리는 제외)
          // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
          if (bname !== '' && /[동|로|가]$/g.test(bname)) {
            extraAddr += bname;
          }
          // 건물명이 있고, 공동주택일 경우 추가한다.
          if (buildingName !== '' && apartment === 'Y') {
            extraAddr += (extraAddr !== '' ? `, ${buildingName}` : buildingName);
          }
          // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
          if (extraAddr !== '') {
            extraAddr = ` (${extraAddr})`;
          }
        }

        onChange({
          [label]: {
            address: addr,
            zipcode: zonecode,
            extraAddress: extraAddr,
          },
        });
        detailAddressRef.current.input.focus();

        /**
         * iframe을 넣은 element를 안보이게 한다.
         * (autoClose:false 기능을 이용한다면, 아래 코드를 제거해야 화면에서 사라지지 않는다.)
         */
        wrapRef.current.style.display = 'none';

        // 우편번호 찾기 화면이 보이기 이전으로 scroll 위치를 되돌린다.
        document.body.scrollTop = currentScroll;
      },
      onresize : ({ height }) => {
        /**
         * 우편번호 찾기 화면 크기가 조정되었을때 실행할 코드를 작성하는 부분.
         * iframe을 넣은 element의 높이값을 조정한다.
         */
        wrapRef.current.style.height = `${height}px`;
      },
      width : '100%',
      height : '100%',
    }).embed(wrapRef.current);

    // iframe을 넣은 element를 보이게 한다.
    wrapRef.current.style.display = 'block';
  }

  return (
    <div className="iamport-address-container">
      <Item label={label}>
        {getFieldDecorator(`${label}.zipcode`, {
          rules: [{ required, message: __('필수 입력입니다', 'iamport-block') }],
        })(
          <Search
            size="large"
            key={`${label}.zipcode`}
            placeholder={__('우편번호', 'iamport-block')}
            enterButton={__('우편번호 찾기', 'iamport-block')}
            onSearch={searchZipcode}
          />,
        )}
      </Item>
      <Item>
        {getFieldDecorator(`${label}.address`, {
          rules: [{ required, message: __('필수 입력입니다', 'iamport-block') }],
        })(
          <Input
            size="large"
            placeholder={__('주소', 'iamport-block')}
            disabled  
          />,
        )}
      </Item>
      <Item>
        {getFieldDecorator(`${label}.extraAddress`)(
          <Input
            size="large"
            placeholder={__('참고항목', 'iamport-block')}  
          />
        )}
      </Item>
      <Item>
        {getFieldDecorator(`${label}.detailAddress`)(
          <Input
            size="large"
            ref={detailAddressRef}
            placeholder={__('상세주소', 'iamport-block')}  
          />
        )}
      </Item>
      <div
        id="wrap"
        style={{
          display: 'none',
          border: '1px solid',
          width: '100%',
          height: '300px',
          margin: '5px 0',
          position: 'relative'
        }}
        ref={wrapRef}
      >
        <img
          src="//t1.daumcdn.net/postcode/resource/images/close.png"
          style={{
            cursor: 'pointer',
            position: 'absolute',
            right: 0,
            top: '-1px',
            zIndex: 1,
          }}
          onClick={hideIframe}
          alt="접기 버튼"  
        />
      </div>
    </div>
  );
}

export default AddressField;