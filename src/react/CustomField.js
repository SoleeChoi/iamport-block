import RadioField from '../components/RadioField';
import CheckboxField from '../components/CheckboxField';
import DropdownField from '../components/DropdownField';
import FileField from '../components/FileField';
import AgreementField from '../components/AgreementField';
import AddressField from '../components/AddressField';
import InputField from '../components/InputField';

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
    case 'address':
    case 'buyer_addr': {
      return (
        <AddressField
          label={label}
          name={type.startsWith('buyer') ? type : label}
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
          name={type.startsWith('buyer') ? type : label}
          placeholder={placeholder}
          required={required}
          getFieldDecorator={getFieldDecorator}
        />
      );
    }
  }
}

export default CustomField;
