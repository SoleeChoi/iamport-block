import RadioField from './RadioField';
import CheckboxField from './CheckboxField';
import DropdownField from './DropdownField';
import FileField from './FileField';
import AgreementField from './AgreementField';
import AddressField from './AddressField';
import InputField from './InputField';

function CustomField({ field, getFieldDecorator, onChangeAddress }) {
  const { label, type, placeholder, options, agreementOptions, required } = field;
  const agreementLength = agreementOptions.length;

  switch(type) {
    case 'checkbox': {
      return (
        <CheckboxField
          label={label}
          name={label}
          options={options}
          required={required}
          getFieldDecorator={getFieldDecorator}
        />
      );
    }
    case 'radio': {
      return (
        <RadioField
          label={label}
          name={label}
          options={options}
          required={required}
          getFieldDecorator={getFieldDecorator}
        />
      );
    }
    case 'dropdown': {
      return (
        <DropdownField
          label={label}
          name={label}
          options={options}
          required={required}
          getFieldDecorator={getFieldDecorator}
        />
      );
    }
    case 'agreement': {
      return (
        agreementOptions.map(({ label, value, type }, index) => 
          <AgreementField
            label={index === 0 && field.label}
            className={index !== agreementLength - 1 && 'iamport-agreement-container'}
            name={`${field.label}.${label}`}
            required={required}
            agreementLabel={label}
            value={value}
            type={type}
            getFieldDecorator={getFieldDecorator}
          />
        )
      );
    }
    case 'address': {
      return (
        <AddressField
          label={label}
          name={label}
          required={required}
          getFieldDecorator={getFieldDecorator}
          onChange={onChangeAddress}  
        />
      );
    }
    case 'file': {
      return (
        <FileField
          label={label}
          name={label}
          required={required}
          getFieldDecorator={getFieldDecorator}
        />
      );
    }
    default: {
      return (
        <InputField
          label={label}
          name={label}
          placeholder={placeholder}
          required={required}
          getFieldDecorator={getFieldDecorator}
        />
      );
    }
  }
}

export default CustomField;
