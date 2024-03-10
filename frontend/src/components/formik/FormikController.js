import React from "react"
import Input from "./components/Input.js"
import TextArea from "./components/TextArea"
import Select from "./components/Select.js"
import RadioButtons from "./components/RadioButton.js"
import CheckBoxes from "./components/CheckBoxes.js"
import ReactDatePicker from "./components/ReactDatePicker.js"

import File from "./components/File.js"
import InputWithButton from "./components/InputWithButton.js"

function FormikController(props) {
  const { control, ...rest } = props
  switch (control) {
    case "input":
      return <Input {...rest} />
    case "select":
      return <Select {...rest} />
    case "date":
      return <ReactDatePicker {...rest} />
    default:
      return null
  }
}
export default FormikController