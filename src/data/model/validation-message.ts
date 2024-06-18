export type ValidationMessage = {
  message: string;
  name: (string | number)[]; // name keys in input
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isValidationMessage(object: any): object is ValidationMessage {
  return 'message' in object;
}
