import React from 'react'
import Select from 'react-select'

export default function SelectField(FieldProps) {
  return (
    <Select
      options={FieldProps.options}
      isMulti={FieldProps.isMulti}
      isClearable={FieldProps.isClearable}
      values={FieldProps.value}
      {...FieldProps.field}
      onChange={option => FieldProps.form.setFieldValue(FieldProps.field.name, option)}
    />
  )
}