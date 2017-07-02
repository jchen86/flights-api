import exampleRequest from '../../../examples/example-request.json';
import server from '../../../src/index';
import request from 'request';

const endpoint = 'http://localhost:3000/flights';

describe('flightsService', () => {
    let response;

    describe('filtering flights', () => {

        describe('if valid JSON is provided', () => {
            const expectedFlights = ['QF564', 'QF457', 'QF490', 'QF735', 'QF738', 'QF435', 'QF542'];
            Object.seal(expectedFlights);

            beforeEach((done) => {
                request.post(endpoint, {json: true, body: exampleRequest}, function (err, res) {
                    response = res;
                    done();
                });
            });

            it('should return a 200 response code', () => {
                expect(response.statusCode).toEqual(200);
            });

            it('should return those that are not a codeshare flight, and arrive or depart in SYD', () => {
                let filteredFlights = response.body.flights;
                expect(filteredFlights.map((flight) => flight.flight)).toEqual(expectedFlights);
            });

            describe('each flight', () => {
                let actualFlights;

                beforeEach(() => {
                    actualFlights = response.body.flights;
                });

                it('should have a flight field, which is a concatnation of airline and flightNumber e.g. QF404', () => {
                    let flights = actualFlights.map((flight) => flight.flight);
                    expect(flights).toEqual(expectedFlights);
                });

                it('should have a origin field, which is the IATA code from departure.airport', () => {
                    let origins = actualFlights.map((flight) => flight.origin);
                    expect(origins).toEqual(['PER', 'SYD', 'MEL', 'SYD', 'ADL', 'SYD', 'SYD']);
                });

                it('should have a destination field, which is the IATA code from arrival.airport', () => {
                    let destinations = actualFlights.map((flight) => flight.destination);
                    expect(destinations).toEqual(['SYD', 'MEL', 'SYD', 'ADL', 'SYD', 'MEL', 'BNE']);
                });

                it('should have a departureTime field, which is the ISO Date Time from departure.scheduled', () => {
                    let departureTimes = actualFlights.map((flight) => flight.departureTime);
                    expect(departureTimes).toEqual([
                        '2017-06-22T02:45:00Z', '2017-06-22T07:45:00Z', '2017-06-22T10:00:00Z', '2017-06-22T21:00:00Z',
                        '2017-06-22T23:45:00Z', '2017-06-23T03:00:00Z', '2017-06-23T07:30:00Z']);
                });

            });
        });

        describe('if invalid JSON is provided', () => {
            it('should return an error with an appropriate HTTP response code and a JSON response', (done) => {
                request.post(endpoint, {json: true, body: "Un-parsable JSON"}, function (error, response) {
                    expect(response.statusCode).toEqual(400);
                    expect(response.body).toEqual({
                        "error": "Error parsing JSON",
                    });
                    done();
                });
            });

        });

        describe('if body.flights is missing from request JSON', () => {
            it('should return an error with an appropriate HTTP response code and a JSON response', (done) => {
                request.post(endpoint, {json: true, body: {randomKey: []}}, function (error, response) {
                    expect(response.statusCode).toEqual(400);
                    expect(response.body).toEqual({
                        "error": "Error parsing JSON",
                    });
                    done();
                });
            });
        })

    });

});