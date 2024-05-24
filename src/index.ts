import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import dayjs from 'dayjs';

import { formatIsoDate } from './utils';
import { getMockDb } from './mock-db';
import {
  TimeSlot,
  Availability,
  Appointment,
  AppointmentRequest,
} from './types';

// store environment variables in .env files
dotenv.config();

const app = express();

const PORT = process.env.PORT ?? 3000;

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());

app.use(cors());

// ENDPOINTS

/*
  Simple helper endpoint to see the state of the DB

  NOTE: I would not remove this endpoint if actually sending this to prod
*/
app.get('/', (request: Request, response: Response) => {
  return response.status(200).send(getMockDb());
});

/*
  Returns all available Providers
*/
app.get('/providers', (request: Request, response: Response) => {
  return response.status(200).send(getMockDb().providers);
});

/*
  Returns the associated Provider details, or throws an error
*/
app.get('/providers/:providerId', (request: Request, response: Response) => {
  const { providerId } = request.params;

  const { providers } = getMockDb();

  const provider = providers.find(({ id }) => id === providerId);

  if (!provider) {
    return response.status(404).send({ message: 'Provider not found' });
  }

  return response.status(200).send(provider);
});

/*
  Returns the associated Client details, or throws an error
*/
app.get('/clients/:clientId', (request: Request, response: Response) => {
  const { clientId } = request.params;

  const { clients } = getMockDb();

  const client = clients.find(({ id }) => id === clientId);

  if (!client) {
    return response.status(404).send({ message: 'Client not found' });
  }

  return response.status(200).send(client);
});

/*
  Returns the specified work hours for a Provider on a specific date, or undefined
  if no schedule was set yet
*/
app.get(
  '/providers/:providerId/hours',
  (request: Request, response: Response) => {
    const { providerId: pId } = request.params;
    const { date } = request.query as { date: string };

    if (!date) {
      return response.status(400).send('An ISO date is required.');
    }

    const { availabilities } = getMockDb();

    const providerAvailability = availabilities.filter(
      ({ providerId, date: d }) =>
        providerId === pId && d === formatIsoDate(date)
    );

    if (providerAvailability.length === 0) {
      return response.status(200).send(undefined);
    }

    // sort time slots in chronological order
    providerAvailability.sort((a, b) =>
      JSON.stringify(a).localeCompare(JSON.stringify(b))
    );

    return response.status(200).send({
      startTime: providerAvailability[0].timeSlot.startTime,
      endTime:
        providerAvailability[providerAvailability.length - 1].timeSlot.endTime,
    });
  }
);

/*
  Generates an array of 15 minute interval TimeSlots based on the provided
  Provider schedule and updates the `availabilities` array
*/
app.put(
  '/providers/:providerId/hours',
  (request: Request, response: Response) => {
    const { providerId: pId } = request.params;
    const { date, timeSlot } = request.body as {
      date: string;
      timeSlot: TimeSlot;
    };

    const mockDb = getMockDb();

    const slots: Availability[] = [];

    let start = dayjs(timeSlot.startTime);
    const end = dayjs(timeSlot.endTime);

    while (start < end) {
      slots.push({
        providerId: pId,
        date: formatIsoDate(date), // we only care about the date and not the time -- simplifies string comparison
        timeSlot: {
          startTime: start.toISOString(),
          endTime: start.add(15, 'minutes').toISOString(),
        },
      });

      start = start.add(15, 'minutes');
    }

    mockDb.availabilities.push(...slots);

    return response.status(200).send(slots);
  }
);

/*
  Returns all possible time slots that a Client can book
*/
app.get(
  '/providers/:providerId/availability',
  (request: Request, response: Response) => {
    const { providerId: pId } = request.params;
    const { date } = request.query as { date: string };

    if (!date) {
      return response.status(400).send('An ISO date is required.');
    }

    const { availabilities } = getMockDb();

    const availability = availabilities.filter(
      ({ providerId, date: d }) =>
        providerId === pId && d === formatIsoDate(date)
    );

    // sort time slots in chronological order
    availability.sort((a, b) =>
      JSON.stringify(a).localeCompare(JSON.stringify(b))
    );

    // sends the empty array if no schedule set yet
    return response.status(200).send(availability);
  }
);

/*
  Returns all the appointments a Provider has currently booked for a given date
*/
app.get(
  '/providers/:providerId/appointments',
  (request: Request, response: Response) => {
    const { providerId } = request.params;
    const { date } = request.query as { date: string };

    const { appointments } = getMockDb();

    const providerAppointments = appointments.filter(
      (appt) =>
        appt.provider.id === providerId && appt.date === formatIsoDate(date)
    );

    // sort time slots in chronological order
    providerAppointments.sort((a, b) =>
      JSON.stringify(a).localeCompare(JSON.stringify(b))
    );

    // sends the empty array if no appointments booked yet
    return response.status(200).send(providerAppointments);
  }
);

/*
  Books an appointment between a Client and Provider and removes it
  from the Provider's availabilities
*/
app.post(
  '/providers/:providerId/appointments/',
  (request: Request, response: Response) => {
    const { providerId, clientId, date, timeSlot } =
      request.body as AppointmentRequest;

    const mockDb = getMockDb();

    const provider = mockDb.providers.find(({ id }) => id === providerId);

    if (!provider) {
      return response.status(404).send({ message: 'Provider not found' });
    }

    const client = mockDb.clients.find(({ id }) => id === clientId);

    if (!client) {
      return response.status(404).send({ message: 'Client not found' });
    }

    const apptResponse: Appointment = {
      id: crypto.randomUUID(),
      provider,
      client,
      date,
      timeSlot,
    };

    /*
      NOTE: before manipulating the DB, we could do another check for the 24 hour rule
      for added validity, but since the FE has a check, it could be overkill
    */

    mockDb.appointments.push(apptResponse);

    const availIndex = mockDb.availabilities.findIndex(
      (avail) =>
        avail.providerId === provider.id &&
        avail.date === formatIsoDate(date) &&
        avail.timeSlot.startTime === timeSlot.startTime
    );

    // once an appointment is booked, it should be removed from the availabilities
    mockDb.availabilities.splice(availIndex, 1);

    return response.status(200).send(apptResponse);
  }
);

/*
  Returns all the appointments a Client has currently booked for a given date
*/
app.get(
  '/clients/:clientId/appointments/',
  (request: Request, response: Response) => {
    const { clientId } = request.params;
    const { providerId, date } = request.query as {
      date: string;
      providerId: string;
    };

    const { appointments } = getMockDb();

    const clientAppointments = appointments.filter(
      (appt) =>
        appt.client.id === clientId &&
        appt.date === formatIsoDate(date) &&
        appt.provider.id === providerId
    );

    // sort time slots in chronological order
    clientAppointments.sort((a, b) =>
      JSON.stringify(a).localeCompare(JSON.stringify(b))
    );

    // sends the empty array if no appointments booked yet
    return response.status(200).send(clientAppointments);
  }
);

//

app
  .listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log('Server running at PORT :::', PORT);
  })
  .on('error', (error) => {
    throw new Error(error.message);
  });
