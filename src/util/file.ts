export const getBase64FileRepresentation = async (file: File): Promise<string> => {
  return await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      let result = reader.result;
      // if (typeof result === 'string') {
      //   const firstCommaIndex = result.indexOf(',');
      //   result = result.slice(firstCommaIndex + 1);
      // }
      resolve(result as string);
    };
    reader.onerror = (e) => reject(e);
  });
};
