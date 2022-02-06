import { useRef } from "react";
import {
  Button,
  StyleSheet,
  TextInput as RnTextInput,
  View,
} from "react-native";

import { TextInputForm } from "./components/form/TextInputForm";
import { useValidateForm } from "./hooks/useValidateForm";
import { schema } from "./schema";

interface FormData {
  username: string;
  password: string;
}

export function App() {
  const usernameRef = useRef<RnTextInput>(null);
  const passwordRef = useRef<RnTextInput>(null);

  const { control, handleSubmit } = useValidateForm<FormData>({
    schema,
    onError: {
      username: () => usernameRef.current?.focus(),
      password: () => passwordRef.current?.focus(),
    },
  });

  function onSubmit(data: FormData) {
    console.log(data);
  }

  return (
    <View style={styles.container}>
      <TextInputForm
        ref={usernameRef}
        control={control}
        name="username"
        label="Username"
      />
      <TextInputForm
        ref={passwordRef}
        control={control}
        name="password"
        label="Password"
      />

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ddd",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
});
