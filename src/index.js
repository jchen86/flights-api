import express from 'express';
import bodyParser from 'body-parser';
import flightRoutes from './api/flights/flightsRoutes';
import config from './config';

const app = express();
const port = config.port || 3000;

app.use(bodyParser.json());
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        res.status(400).json({
            "error": "Error parsing JSON",
        });
    }
});

app.use('/flights', flightRoutes());

app.listen(port, () => {
    console.log(`Flights API server started on port ${port}`);
});

export default app;