import { forwardRef } from "react";
import { View, Text, TextInput as RnTextInput, StyleSheet } from "react-native";
import type { TextInputProps } from "react-native";

export interface InputProps extends TextInputProps {
  label: string;
  error?: string;
}

export const TextInput = forwardRef<RnTextInput, InputProps>(
  ({ label, error, ...rest }, ref) => {
    return (
      <View style={styles.inputContainer}>
        <Text style={styles.label}>{label}</Text>

        <RnTextInput ref={ref} style={styles.textInput} {...rest} />

        {error && <Text style={styles.error}>{error}</Text>}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },

  label: {
    color: "#555",
    fontSize: 16,
    marginBottom: 8,
  },

  textInput: {
    width: "100%",
    height: 52,
    backgroundColor: "#FFF",
    borderRadius: 5,
    borderColor: "#AAA",
    borderWidth: 2,
  },

  error: {
    color: "#F00",
    fontSize: 12,
    marginTop: 6,
  },
});
