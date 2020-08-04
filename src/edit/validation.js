const { __ } = wp.i18n;

const patternForLink = new RegExp(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/);

// 커스텀 필드 유효성 검사
export function validateCustomFields(customFields) {
  const errorFields = [];
  let isValid = true;
  customFields.forEach(customField => {
    const { type, label, options, agreementOptions } = customField;

    let labelMessage = '';
    const agreementOptionsErrors = [];
    const optionsErrors = [];
    if (!label) {
      // 라벨 값이 입력됐는지 검사한다
      labelMessage = __('필수 입력입니다', 'iamport-block');
    } else {
      // 커스텀 필드에 대해 중복된 필드가 있는지 검사한다
      const duplicateLabel = customFields.filter(field => field.label === label);
      if (duplicateLabel.length > 1) {
        labelMessage = __('라벨이 중복됩니다', 'iamport-block');
      }
    }
    isValid = isValid && !labelMessage;

    if (type === 'agreement') {
      agreementOptions.forEach(({ label, value, type }) => {
        let labelMessage = '';
        if (!label) {
          // 라벨 값이 입력됐는지 검사한다
          labelMessage = __('필수 입력입니다', 'iamport-block');
        } else {
          // 입력된 필드에 대해 중복된 필드가 있는지 검사한다
          const duplicatedAgreementLabel = agreementOptions.filter(option => option.label === label);
          if (duplicatedAgreementLabel.length > 1) {
            labelMessage = __('약관이 중복됩니다', 'iamport-block');
          }
        }
        let valueMessage = '';
        if (!value) {
          // 링크 값이 입력됐는지 검사한다
          valueMessage = __('필수 입력입니다', 'iamport-block');
        } else if (type === 'link' && !patternForLink.test(value)) {
          // 링크 값이 유효한지 검사한다
          valueMessage = __('링크가 유효하지 않습니다', 'iamport-block');
        }
        agreementOptionsErrors.push({ label: labelMessage, value: valueMessage });

        // 라벨이나 링크 둘 다 에러가 없는 경우
        isValid = isValid && !labelMessage && !valueMessage;
      });
    }
    if (type === 'radio' || type === 'checkbox' || type === 'dropdown') {
      options.forEach(eachOption => {
        let optionMessage = '';

        if (!eachOption) {
          // 옵션 값이 입력됐는지 검사한다
          optionMessage = __('필수 입력입니다', 'iamport-block');
        } else {
          // 입력된 필드에 대해 중복된 필드가 있는지 검사한다
          const duplicatedOption = options.filter(option => option === eachOption);
          if (duplicatedOption.length > 1) {
            optionMessage = __('옵션이 중복됩니다', 'iamport-block');
          }
        }
        optionsErrors.push(optionMessage);

        // 옵션에 에러가 없는 경우
        isValid = isValid && !optionMessage;
      });
    }

    errorFields.push({
      label: labelMessage,
      agreementOptions: agreementOptionsErrors,
      options: optionsErrors,
    });
  });

  return { isValid, errorFields };
}