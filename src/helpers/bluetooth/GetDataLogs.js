import { Buffer } from "buffer";
import writeLogs from "./WriteLog";

let data = "";

const GetDataLogs = (characteristics) => {
  return new Promise((resolve, reject) => {
    characteristics.notifyCharacteristic.monitor((error, notifyChar) => {
      if (error) reject(error);
      if (!notifyChar?.value) return;
      //console.log('THIS IS WHAT IM LOOKING FOR', characteristics)
      let new_line = Buffer.from(notifyChar.value, "base64").toString("ascii");
      data = data + new_line;

      if (new_line.includes("(E)xit without saving calibration.")) {
        console.log("OFFSET REMINDER");
      }

      if (new_line.includes("Download Complete")) {
        resolve(data);
      }
    });
    writeLogs("l\r", characteristics);
  });
};

export default GetDataLogs;
