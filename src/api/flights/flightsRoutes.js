import { Router } from 'express';
import flightsService from './flightsService';

export default () => {
    let api = Router();

    api.post('/', flightsService.filterFlights);

    return api;
};
