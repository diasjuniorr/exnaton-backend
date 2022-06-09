import { Request, Response } from 'express';
import importedData from '../data.json';

interface Measurement {
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

class SmartMeterController {
  async getMeasurementsByDay(req: Request, res: Response) {
    console.log("retornando: ")
    const data = importedData as Measurement[];
    const measurementsByDay = this._groupMeasurementsByDay(data);

    const formatedData = measurementsByDay.map((measurement) => {
      const measurements = measurement.measurements.reduce(this._reduceMeasurements);
      return {
        date: measurement.date,
        measurement: measurements['measurement'],
        muid: measurements['tags']['muid'],
        aETotalImport: measurements['0100011D00FF'].toFixed(4),
        aETotalExport: measurements['0100021D00FF'].toFixed(3),
        measurements: measurement.measurements.map((item) => ({
          '0100011D00FF': item['0100011D00FF'],
          '0100021D00FF': item['0100021D00FF'],
          time: item.timestamp.split("T")[1].split(".")[0],
        })),
      };
    });
    res.json("formatedData");
  }

  _groupMeasurementsByDay(data: Measurement[]) {
    const groups = data.reduce((groups: Group, measurement) => {
      const date = measurement.timestamp.split('T')[0];
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

export { SmartMeterController };
