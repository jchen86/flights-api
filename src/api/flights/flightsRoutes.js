import { Router } from 'express';
import flightsController from './flightsService';

export default () => {
    let api = Router();

    api.post('/', flightsController.filterFlights);

    return api;
};
