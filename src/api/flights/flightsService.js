export default {filterFlights};

function filterFlights(req, res) {
    let flights = req.body && req.body.flights;

    if (flights) {
        let filteredFlights = flights
            .filter(isMatchingFlight)
            .map((flight) => {
                return {
                    flight: flight.airline + flight.flightNumber,
                    origin: flight.departure && flight.departure.airport,
                    destination: flight.arrival && flight.arrival.airport,
                    departureTime: flight.departure && flight.departure.scheduled
                };
            });
        res.json({flights: filteredFlights});
    } else {
        res.status(400).json({
            "error": "Error parsing JSON",
        });
    }
}

function isMatchingFlight(flight) {
    if (!flight) {
        return false;
    }
    let departureAirport = flight.departure && flight.departure.airport;
    let arrivalAirport = flight.arrival && flight.arrival.airport;
    return flight.airline === 'QF' &&
        (departureAirport === 'SYD' || arrivalAirport === 'SYD');
}