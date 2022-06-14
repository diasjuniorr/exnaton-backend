import { Router } from 'express';
import MeasurementsController from './controllers/MeasurementsController';
import SmartMetersController from './controllers/SmartMetersController';

const router = Router();

router.get('/api/v1/meterdata/measurement', MeasurementsController.getMeasurementsByDay);
router.post('/api/v1/meterdata/measurement', MeasurementsController.insertMeasurements);

router.get('/api/v1/smartmeters', SmartMetersController.getSmartMeters);
router.post('/api/v1/smartmeters', SmartMetersController.createSmartMeter);

export { router };
