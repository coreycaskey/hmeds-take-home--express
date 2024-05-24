import dayjs from 'dayjs';

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

export interface DB {
  availabilities: Availability[];
  appointments: Appointment[];
  providers: Provider[];
  clients: Client[];
}
