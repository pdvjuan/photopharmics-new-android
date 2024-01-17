import { Buffer } from "buffer";

const writeLogs = async (asciiMessage, characteristics) => {
  const message = Buffer.from(asciiMessage).toString("base64");
  await characteristics.writeCharacteristic.writeWithResponse(message);
};

export default writeLogs;
