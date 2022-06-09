import { Router } from 'express';
import cors from 'cors';
import { SmartMeterController } from './controllers/SmartMeterController';

const router = Router();

const smartMeterController = new SmartMeterController();

router.get('/api/v1/meterdata/measurement', smartMeterController.getMeasurementsByDay);

export { router };
