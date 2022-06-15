import { Request, Response } from 'express';
import dayjs from 'dayjs';
import MeasurementsService from '../services/MeasurementsService';

const insertMeasurements = async (req: Request, res: Response) => {
  try {
    const results = await MeasurementsService.insertMeasurements(req.body);

    res.json(results);
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
};

const getMeasurementsByDay = async (req: Request, res: Response) => {
  const { muid, start, stop } = req.query;
  if (!muid) {
    return res.status(400).json({ error: 'Missing muid parameter' });
  }

  if (!start) {
    return res.status(400).json({ error: 'Missing start parameter' });
  }

  if (dayjs(start as string).isValid()) {
    return res.status(400).json({ error: 'Invalid start parameter' });
  }

  if (!stop) {
    return res.status(400).json({ error: 'Missing stop parameter' });
  }

  if (dayjs(stop as string).isValid()) {
    return res.status(400).json({ error: 'Invalid stop parameter' });
  }

  try {
    const measurements = await MeasurementsService.getMeasurementsByDay(muid as string, start as string, stop as string);

    return res.json(measurements);
  } catch (e) {
    console.log(e);
    return res.status(500).send();
  }
};

export default { insertMeasurements, getMeasurementsByDay };
