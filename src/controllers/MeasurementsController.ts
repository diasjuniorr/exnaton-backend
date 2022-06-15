import { Request, Response } from 'express';
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
    res.status(400).json({ error: 'Missing muid parameter' });
  }

  if (!start) {
    res.status(400).json({ error: 'Missing start parameter' });
  }

  if (!isDate(start as string)) {
    res.status(400).json({ error: 'Invalid start parameter' });
  }

  if (isDate(stop as string)) {
    res.status(400).json({ error: 'Invalid stop parameter' });
  }

  if (!stop) {
    res.status(400).json({ error: 'Missing stop parameter' });
  }

  try {
    const measurements = await MeasurementsService.getMeasurementsByDay(muid as string, start as string, stop as string);

    res.json(measurements);
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
};

const isDate = (date: string) => {
  return !isNaN(Date.parse(date));
};

export default { insertMeasurements, getMeasurementsByDay };
