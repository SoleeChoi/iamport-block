const { __ } = wp.i18n;
const { CheckboxControl } = wp.components;

import { PAY_METHODS } from '../constants';

export function CheckboxGroup({ payMethods, onChange }) {
  return (
    <div>
      {Object.keys(PAY_METHODS).map((method, index) =>
        <CheckboxControl
          heading={index === 0 && __('선택 가능한 결제수단', 'iamport-block')}
          label={PAY_METHODS[method]}
          onChange={checked => onChange(method, checked)}
          checked={payMethods && payMethods.indexOf(method) !== -1}
        />
      )}
    </div>
  );
}

export default CheckboxGroup;