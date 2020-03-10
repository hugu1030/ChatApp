import React from "react";
import Input from "../atoms/Input/Input";
import Label from "../atoms/Label/Label";

export default ({ label, value, placeholder, size, color, onChange }) => {
  return (
    <Label size={size} color={color}>
      {label}:
      <Input placeholder={placeholder} onChange={onChange} value={value} />
    </Label>
  );
};
