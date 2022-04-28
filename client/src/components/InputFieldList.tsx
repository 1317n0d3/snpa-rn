import { FC } from "react";
import {
  GestureResponderEvent,
  KeyboardTypeOptions,
  StyleProp,
  TextInput,
  TextStyle,
  View,
  ViewStyle
} from "react-native";
import { FormDataType, HandleFieldChangeType } from "types";

export type FieldType = {
  placeholder: string,
  key: string,
  value: string,
}

export type FieldListProps = {
  fields: FieldType[]
  handleFieldChange: HandleFieldChangeType<FormDataType>
  styles?: ViewStyle
  fieldStyles?: StyleProp<ViewStyle | TextStyle>
}

const InputFieldList: FC<FieldListProps> = ({fields, handleFieldChange, styles, fieldStyles}) => {

  return (
    <View style={styles}>
      {fields.map(({placeholder, key, value}) => {
        const props = {
          style: fieldStyles,
          placeholder,
          value,
          onChangeText: (e: string) => handleFieldChange(key, e),
          onTouchStart: (e: GestureResponderEvent) => e.stopPropagation(),
          ...(key === 'password' && {secureTextEntry: true}),
          ...(key === 'dateOfBirth' && {keyboardType: 'numeric' as KeyboardTypeOptions}),
        }
        return (
          <TextInput key={key} {...props}/>
        )
      })}
    </View>
  )
}

export default InputFieldList