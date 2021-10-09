import googleLibphonenumber from 'google-libphonenumber';

const phoneUtil = googleLibphonenumber.PhoneNumberUtil.getInstance();

const message = 'Invalid phone number';

export const phoneValidation = (value: string | undefined, helpers: { error: (arg0: string) => any; }) => {
  try {
    const tel = phoneUtil.parse(value);
    if (phoneUtil.isValidNumber(tel)) {
      return value;
    }
  } catch (e) {
    console.log(e);
  }
  return helpers.error(message);
};

export const phoneOptionalValidation = (value: string | undefined, helpers: { error: (arg0: string) => any; }) => {
  return value === undefined ? value : phoneValidation(value, helpers);
};
