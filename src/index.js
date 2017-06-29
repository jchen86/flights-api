import express from 'express';
import bodyParser from 'body-parser';
import flightRoutes from './api/flights/flightsRoutes';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json()); // TODO parser error handling

app.use('/flights', flightRoutes());

app.listen(port, () => {
    console.log(`Flights API server started on port ${port}`);
});

export default app;