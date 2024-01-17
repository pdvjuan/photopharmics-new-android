export const formatPhoneNumber = (phoneNumberString) => {
  var cleaned = ("" + phoneNumberString).replace(/\D/g, "");
  if (cleaned.length !== 10)
    throw Error("Phone number invalid. Do not enter anything but numbers");
  var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    var intlCode = "+1";
    return [intlCode, match[1], match[2], match[3]].join("");
  }
  return null;
};
