import { Router } from 'express';
import MeasurementsController from './controllers/MeasurementsController';
import { SmartMeterscontroler } from './controllers/SmartMetersController';

const router = Router();

const smartMetersControler = new SmartMeterscontroler();

router.get('/api/v1/meterdata/measurement', MeasurementsController.getMeasurementsByDay);
router.post('/api/v1/meterdata/measurement', MeasurementsController.insertMeasurements);

router.get('/api/v1/smartmeters', smartMetersControler.getSmartMeters.bind(smartMetersControler));
router.post('/api/v1/smartmeters', smartMetersControler.createSmartMeter.bind(smartMetersControler));

export { router };
