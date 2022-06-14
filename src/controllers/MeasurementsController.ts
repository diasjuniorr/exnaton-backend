import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import { db } from '../database';
import { Measurement } from '../models/Measurement.entity';

interface PostMeasurement {
  measurement: 'string';
  '0100011D00FF': number;
  '0100021D00FF': number;
  tags: {
    muid: string;
  };
  timestamp: string;
}

interface Group {
  [key: string]: Measurement[];
}

class MeasurementsController {
  async insertMeasurements(req: Request, res: Response) {
    const results = await db
      .createQueryBuilder()
      .insert()
      .into('measurements')
      .values(
        req.body.map((item: PostMeasurement) => ({
          id: uuid(),
          muid: item.tags.muid,
          measurement: item.measurement,
          '0100011D00FF': item['0100011D00FF'] ? item['0100011D00FF'] : 0,
          '0100021D00FF': item['0100021D00FF'] ? item['0100021D00FF'] : 0,
          timestamp: item.timestamp,
        })),
      )
      .execute();

    res.json(results);
  }

  async getMeasurementsByDay(req: Request, res: Response) {
    const { start, stop } = req.query;

    const data = await db
      .getRepository(Measurement)
      .createQueryBuilder('measurement')
      .where('measurement.timestamp between :start and :stop', { start, stop })
      .getMany();
      
    const measurementsByDay = this._groupMeasurementsByDay(data);

    const formatedData = measurementsByDay.map((measurement) => {
      const measurements = measurement.measurements.reduce(this._reduceMeasurements);
      return {
        date: measurement.date,
        measurement: measurements['measurement'],
        muid: measurements['muid'],
        aETotalImport: +measurements['0100011D00FF'].toFixed(3),
        aETotalExport: +measurements['0100021D00FF'].toFixed(3),
        measurements: measurement.measurements
          .map((item) => ({
            '0100011D00FF': item['0100011D00FF'],
            '0100021D00FF': item['0100021D00FF'],
            time: item.timestamp.toISOString().split('T')[1].split('.')[0],
          }))
          .reverse(),
      };
    });

    res.json(formatedData);
  }

  _groupMeasurementsByDay(data: Measurement[]) {
    const groups = data.reduce((groups: Group, measurement) => {
      const date = measurement.timestamp.toISOString().split('T')[0];
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(measurement);
      return groups;
    }, {});

    const groupArrays = Object.keys(groups).map((date) => {
      return {
        date,
        measurements: groups[date],
      };
    });

    return groupArrays.reverse();
  }

  _reduceMeasurements(a: Measurement, b: Measurement) {
    return {
      ...a,
      '0100011D00FF': a['0100011D00FF'] + b['0100011D00FF'],
      '0100021D00FF': a['0100021D00FF'] + b['0100021D00FF'],
    };
  }
}

export { MeasurementsController };
