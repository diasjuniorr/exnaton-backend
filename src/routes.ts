import { Router } from 'express';
import { MeasurementsController } from './controllers/MeasurementsController';
import { SmartMeterscontroler } from './controllers/SmartMetersController';

const router = Router();

const smartMetersControler = new SmartMeterscontroler()
const measurementsController = new MeasurementsController();

router.get('/api/v1/meterdata/measurement', measurementsController.getMeasurementsByDay.bind(measurementsController));
router.post('/api/v1/meterdata/measurement', measurementsController.insertMeasurements.bind(measurementsController));

router.get("/api/v1/smartmeters", smartMetersControler.getSmartMeters.bind(smartMetersControler));
router.post("/api/v1/smartmeters", smartMetersControler.createSmartMeter.bind(smartMetersControler));

export { router };
