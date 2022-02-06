import { forwardRef } from "react";
import { Controller, UseControllerProps } from "react-hook-form";
import { TextInput as RnTextInput } from "react-native";

import { InputProps, TextInput } from "../../TextInput";

type InputFormProps = InputProps & UseControllerProps<any>;

export const TextInputForm = forwardRef<RnTextInput, InputFormProps>(
  ({ control, name, defaultValue, shouldUnregister, rules, ...rest }, ref) => {
    return (
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        shouldUnregister={shouldUnregister}
        rules={rules}
        render={({ field, fieldState }) => {
          return (
            <TextInput
              {...rest}
              ref={ref}
              value={field.value}
              onBlur={field.onBlur}
              onChangeText={field.onChange}
              error={fieldState?.error?.message}
            />
          );
        }}
      />
    );
  }
);
