export default {filterFlights};

function filterFlights(req, res) {
    let flights = req.body && req.body.flights;
    let filteredFlights = [];

    if (flights) {
        filteredFlights = flights
            .filter(isMatchingFlight)
            .map((flight) => {
                return {
                    flight: flight.airline + flight.flightNumber,
                    origin: flight.departure && flight.departure.airport,
                    destination: flight.arrival && flight.arrival.airport,
                    departureTime: flight.departure && flight.departure.scheduled
                };
            });
    }

    res.json({flights: filteredFlights});
}

//TODO make criteria configurable
function isMatchingFlight(flight) {
    if (!flight) {
        return false;
    }
    let departureAirport = flight.departure && flight.departure.airport;
    let arrivalAirport = flight.arrival && flight.arrival.airport;
    return flight.airline === 'QF' &&
        (departureAirport === 'SYD' || arrivalAirport === 'SYD');
}