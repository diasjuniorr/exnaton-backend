import { Request, Response } from 'express';
import SmartMetersService from '../services/SmartMetersService';

const createSmartMeter = async (req: Request, res: Response) => {
  try {
    const result = await SmartMetersService.createSmartMeter();

    return res.json(result);
  } catch (e) {
    console.log(e);

    return res.status(500).send();
  }
};

const getSmartMeters = async (req: Request, res: Response) => {
  try {
    const smartMeters = await SmartMetersService.getSmartMeters();

    return res.json(smartMeters);
  } catch (e) {
    console.log(e);
    return res.status(500).send();
  }
};

export default { createSmartMeter, getSmartMeters };
