import { Request, Response } from 'express';
import SmartMetersService from '../services/SmartMetersService';

const createSmartMeter = async (req: Request, res: Response) => {
  try {
    const result = await SmartMetersService.createSmartMeter();

    res.json(result);
  } catch (e) {
    console.log(e);

    res.status(500).send();
  }
};

const getSmartMeters = async (req: Request, res: Response) => {
  try {
    const smartMeters = await SmartMetersService.getSmartMeters();

    res.json(smartMeters);
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
};

export default { createSmartMeter, getSmartMeters };
