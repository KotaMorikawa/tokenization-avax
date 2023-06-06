const regValidNumber = /^[0-9]+[.]?[0-9]*$/;

export const validAmount = (amount: string) => {
  if (amount === "") {
    return false;
  }
  if (!regValidNumber.test(amount)) {
    return false;
  }
  return true;
};
