import { db } from '../database';
import { SmartMeter } from '../models/SmartMeter.entity';

const createSmartMeter = async () => {
  try {
    const created = await db.getRepository(SmartMeter).create();
    const result = await db.getRepository(SmartMeter).save(created);

    return result;
  } catch (e) {
    throw Error('Error creating smart meter: ' + e);
  }
};

const getSmartMeters = async () => {
  try {
    const smartMeters = await db.getRepository(SmartMeter).find();

    return smartMeters;
  } catch (e) {
    throw Error('Error getting smart meters: ' + e);
  }
};

export default { createSmartMeter, getSmartMeters };
