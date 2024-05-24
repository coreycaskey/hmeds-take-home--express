# Henry Meds Assessment - Node.js Server

This repository contains the Node.js Express server for the Henry Meds assessment.

It simulates a database for the coresponding client application via `MOCK_DB` and provides some initial hardcoded data that can be expanded on.

The following API endpoints are available

- `/` : `GET`

  - Returns the entire `MOCK_DB`
  - *This endpoint was simply created and used for easy visibility in Postman testing; I would remove this endpoint before shipping this API to prod*

- `/providers` : `GET`

  - Returns all available `Provider`s

- `/providers/:provider` : `GET`

  - Returns the associated `Provider` for the given `:providerId`

- `/clients/:clientId` : `GET`

  - Returns the associated `Client` for the given `:clientId`

- `/providers/:providerId/hours` : `GET`

  - Returns the `TimeSlot` for a given `:providerId` and `:date`, or `undefined` if no schedule defined yet
  - Query Params:

    - `date`: `string` : `required` : ISO datetime

- `/providers/:providerId/hours` : `PUT`

  - Updates the `Availability` of a `:providerId` and generates all possible 15-minute time slots
  - Returns those created `Availability` slots
  - Request Body:

    - `date`: `string` : `required` : ISO datetime
    - `timeSlot`: `TimeSlot` : `required` : start and end ISO datetime for a given `:date`

- `/providers/:providerId/availability` : `GET`

  - Returns the `Availability` slots for a `:providerId` that a `Client` can select from
  - Query Params:

    - `date`: `string` : `required` : ISO datetime

- `/providers/:providerId/appointments` : `GET`

  - Returns the active `Appointment`s for a given `:providerId` and `:date`
  - Query Params:

    - `date`: `string` : `required` : ISO datetime

- `/providers/:providerId/appointments/` : `POST`

  - Creates an `Appointment` record between a `Client` and `Provider`
  - Removes the `Availability` from the DB that overlaps with this time slot
  - Returns the created `Appointment`
  - Request Body:

    - `providerId`: `string` : `required` : provider id
    - `clientId` : `string` : `required` : client id
    - `date`: `string` : `required` : ISO datetime
    - `timeSlot`: `TimeSlot` : `required` : start and end ISO datetime for a given `:date`

- `/clients/:clientId/appointments/` : `GET`

  - Returns the active `Appointment`s for a given `:clientId`, `:date`, and `:providerId`
  - Query Params:

    - `date`: `string` : `required` : ISO datetime
    - `providerId`: `string` : `required` : provider id

## Technologies

This project is built with:

- [Node.js](https://nodejs.org/en)
- [Express](https://expressjs.com/)

Node.js and Express provide a pretty simple approach to setting up a local server and API calls, which made it attractive for this assessment. Additionally, I've had some experience working with these frameworks / runtimes, and I wanted to refresh myself on implementation details, especially since Node.js is used at Henry Meds.

## Future Considerations

There are some notes sprinkled throughout the application of items I would return to in the future, but the following highlights some of the larger considerations:

- Allowing changes to an existing `Availability` if a `Provider` needs to change their schedule, and appropriately handling any cancellation / rescheduling for `Client`s
- Race conditions that may arise with many users on the platform (e.g. `Client` A confirming a time slot that `Client` B just confirmed before them)
- Integrating a SSR framework, like [Remix](https://remix.run/), which React Router is based on, to take advantage of `loader` calls that can access the DB directly, allowing this API layer to be removed completely

## Tradeoffs / Assumptions

- I only allowed availabilities to be updated once (i.e. when they weren't defined yet). The act of changing availabilities and canceling possible appointments seemed out of scope, but would be a future consideration.
- Since I simulated a DB with a `MOCK_DB` object, I wasn't really tethered to a given approach (i.e. SQL vs. NoSQL). I mirrored my DB structure and lookup more closely with SQL I think, by building arrays that I iterate through and `find` / `filter` based on a given condition (similar to a `WHERE` clause), and I think a SQL / relational approach would work well for this data since it's pretty standardized. On the other hand, had I done something similar to NoSQL with a lot of objects and key lookups, some processes may have been faster.

## Running

The following terminal commands should get you up and running. This server runs on Node v21.7.1, so the first two commands will get you on that version.

- `nvm install`
- `nvm use`
- `npm i`
- `npm run dev`

This will kick off the local server. Ensure it's running before you start the local server for the client application

[See Client Instructions]()


## Available Types

```TypeScript
export type DayJS = dayjs.Dayjs;

export interface Provider {
  id: string;
  name: string;
  profile: string;
}

export interface Client {
  id: string;
  name: string;
  profile: string;
}

export interface Availability {
  providerId: string;
  date: string;
  timeSlot: TimeSlot;
}

export interface AppointmentRequest {
  providerId: string;
  clientId: string;
  date: string;
  timeSlot: TimeSlot;
}

export interface Appointment {
  id: string;
  provider: Provider;
  client: Client;
  date: string;
  timeSlot: TimeSlot;
}

export interface TimeSlot {
  startTime: string;
  endTime: string;
}

export interface WorkHours {
  startTime: string | undefined;
  endTime: string | undefined;
}

export const Persona = {
  Provider: 'Provider',
  Client: 'Client',
} as const;

export type Persona = (typeof Persona)[keyof typeof Persona];
```

....

Happy Running! 👋
