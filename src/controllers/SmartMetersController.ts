import { Request, Response } from 'express';
import { db } from '../database';
import { SmartMeter } from '../models/SmartMeter.entity';

class SmartMeterscontroler {
  async createSmartMeter(req: Request, res: Response) {
    const created = await db.getRepository(SmartMeter).create();
    const result = await db.getRepository(SmartMeter).save(created);

    res.json(result);
  }

  async getSmartMeters(req: Request, res: Response) {
    const smartMeters = await db.getRepository(SmartMeter).find();

    res.json(smartMeters);
  }
}

export { SmartMeterscontroler };
