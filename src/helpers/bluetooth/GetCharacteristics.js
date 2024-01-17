const NOTIFY_CHARACTERISTIC = "569a2000-b87f-490c-92cb-11ba5ea5167c";
const WRITE_CHARACTERISTIC = "569a2001-b87f-490c-92cb-11ba5ea5167c";

const getCharacteristics = (device) => {
  return new Promise(async (resolve, reject) => {
    let services = null;
    let notifyCharacteristic;
    let writeCharacteristic;

    device = await device.connect();
    device = await device.discoverAllServicesAndCharacteristics();
    services = await device.services();

    services.map((service) => {
      service.characteristics().then((characteristic) => {
        characteristic.map((characteristic) => {
          if (characteristic.uuid === NOTIFY_CHARACTERISTIC) {
            notifyCharacteristic = characteristic;
          }
          if (characteristic.uuid === WRITE_CHARACTERISTIC) {
            writeCharacteristic = characteristic;
          }

          if (notifyCharacteristic && writeCharacteristic) {
            return resolve({
              notifyCharacteristic,
              writeCharacteristic,
            });
          }
        });
      });
    });
  });
};

export default getCharacteristics;
