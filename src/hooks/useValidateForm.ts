import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useRef } from "react";
import type {
  FieldValues,
  UseFormProps,
  UseFormReturn,
  FieldError,
} from "react-hook-form";
import { useForm } from "react-hook-form";
import type * as yup from "yup";

type Error = Record<string, FieldError>;

export type onErrorType<T> = { [key in keyof T]?: () => void } | (() => void);

type SchemaError<Fields> = {
  field: Fields;
  message?: string;
  errorsFields: Fields[];
};

function getSchemaErrors<Fields = string>(errors: Error = {}) {
  const hasErrors = Object.keys(errors).length;

  if (hasErrors) {
    const [error] = Object.keys(errors).map((key) => {
      return {
        field: key,
        message: errors[key].message,
      };
    });

    return {
      ...error,
      errorsFields: Object.keys(errors),
    } as unknown as SchemaError<Fields>;
  }

  return undefined;
}

interface UseValidateFormProps<T extends FieldValues = FieldValues>
  extends Omit<UseFormProps<T>, "resolver"> {
  schema?: yup.ObjectSchema<{ [key in keyof T]?: any }>;
  onError?: onErrorType<T>;
}

interface UseValidateFormReturn<T extends FieldValues = FieldValues>
  extends UseFormReturn<T> {
  schemaError?: {
    field: keyof T;
    message?: string;
    errorsFields: Array<keyof T>;
  };
}

export function useValidateForm<T extends FieldValues = FieldValues>({
  schema,
  onError,
  ...params
}: UseValidateFormProps<T> = {}): UseValidateFormReturn<T> {
  const resolver = schema ? yupResolver(schema) : undefined;

  const prevSubmitCount = useRef(0);

  const response = useForm<T>({
    resolver,
    ...params,
  });

  const { errors, submitCount } = response.formState;

  const schemaError = getSchemaErrors<keyof T>(errors as Error);

  useEffect(() => {
    if (schemaError && submitCount > prevSubmitCount.current) {
      if (onError) {
        if (typeof onError === "function") {
          onError();
        } else {
          const calledFunction = onError[schemaError.field];

          if (calledFunction) {
            calledFunction();
          }
        }
      }
    }

    prevSubmitCount.current = submitCount;
  }, [schemaError, submitCount, onError]);

  return {
    ...response,
    schemaError,
  };
}
