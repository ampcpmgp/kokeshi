const decoder = new TextDecoder();

// This function is used to get the error message from the response body
export async function getErrorMessage (error) {
  const reader = await error.context.body.getReader();
  const { value } = await reader.read();
  const json = decoder.decode(value);
  const errorMessage = JSON.parse(json).error;

  return errorMessage
}