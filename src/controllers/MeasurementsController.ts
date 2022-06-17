import { Request, Response } from 'express';
import MeasurementsService from '../services/MeasurementsService';
import dayjs from 'dayjs';
const customParseFormat = require('dayjs/plugin/customParseFormat');
dayjs.extend(customParseFormat);

interface PostMeasurement {
  measurement: 'string';
  '0100011D00FF': number;
  '0100021D00FF': number;
  tags: {
    muid: string;
  };
  timestamp: string;
}

const insertMeasurements = async (req: Request<PostMeasurement[]>, res: Response) => {
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

  if (!dayjs(start as string, 'YYYY-MM-DD', true).isValid()) {
    return res.status(400).json({ error: 'Start parameter should be in YYYY-MM-DD format' });
  }

  if (!stop) {
    return res.status(400).json({ error: 'Missing stop parameter' });
  }

  if (!dayjs(stop as string, 'YYYY-MM-DD', true).isValid()) {
    return res.status(400).json({ error: 'Stop parameter should be in YYYY-MM-DD format' });
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
