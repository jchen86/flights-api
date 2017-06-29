Flights API
===========
This is a simple API that filters a list of flights.

Frameworks/Libraries
--------------------
- [Express](https://expressjs.com)
- ES6 support using [Babel](https://babeljs.io)
- JSON parsing using [body-parser](https://github.com/expressjs/body-parser)
- Unit and integration tests using [Jasmine](https://jasmine.github.io)

The Challenge
-------------
Using Node.js and your choice of frameworks/libraries, create an API
that accepts JSON posted to /flights , filters that data, and returns
a few fields for each flight.

From the list of flights in the request, return those that are not a
codeshare flight, and arrive or depart in SYD. A codeshare is a flight
that has an airline that is not QF.

The response should be valid JSON object with a flights key with the
filtered array of flights. Each flight should have just the following
fields from the request:
- flight - concatnation of airline and flightNumber e.g. QF404
- origin - IATA code from departure.airport
- destination - IATA code from arrival.airport
- departureTime - ISO Date + Time of departure, from departure.scheduled

Example request and response payloads are included under examples directory.

### Error handling
If invalid JSON is returned, an error will be returned with an appropriate
HTTP response code and a JSON response of:
```json
{
     "error": "Error parsing JSON",
}
```

Setup - Install Dependencies
----------------------------
```sh
npm install
```

Start Development Live-reload Server
------------------------------------
```sh
npm run dev
```

Start Production Server
-----------------------
```sh
npm start
```

Running Tests
-------------
```sh
npm test
```

Author
------
[Jimmy Chen](https://github.com/jchen86)