import React from 'react'
import Select from 'react-select'



export default function SelectField(fieldProps) {
  return (
    <Select
      options={fieldProps.options}
      isMulti={fieldProps.isMulti}
      isClearable={fieldProps.isClearable}
      placeholder={fieldProps.placeholder}
      value={fieldProps.value}
      {...fieldProps.field}
      onChange={option => fieldProps.form.setFieldValue(fieldProps.field.name, option)}
    />
  )
}