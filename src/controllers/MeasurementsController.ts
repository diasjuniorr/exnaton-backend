import { Request, Response } from 'express';
import MeasurementsService from '../services/MeasurementsService';

const insertMeasurements = async (req: Request, res: Response) => {
  try {
    const results = MeasurementsService.insertMeasurements(req.body);

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

export default { insertMeasurements, getMeasurementsByDay };
