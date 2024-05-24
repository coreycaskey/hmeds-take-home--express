import { DB } from './types';

const MOCK_DB: DB = {
  availabilities: [
    {
      providerId: 'c180cf31-6f54-40ed-beb9-1a63dc2a189c',
      date: '05/26/2024',
      timeSlot: {
        startTime: '2024-05-26T06:15:00.000Z',
        endTime: '2024-05-26T06:30:00.000Z',
      },
    },
    {
      providerId: 'c180cf31-6f54-40ed-beb9-1a63dc2a189c',
      date: '05/26/2024',
      timeSlot: {
        startTime: '2024-05-26T06:30:00.000Z',
        endTime: '2024-05-26T06:45:00.000Z',
      },
    },
    {
      providerId: 'c180cf31-6f54-40ed-beb9-1a63dc2a189c',
      date: '05/26/2024',
      timeSlot: {
        startTime: '2024-05-26T06:45:00.000Z',
        endTime: '2024-05-26T07:00:00.000Z',
      },
    },
    {
      providerId: 'c180cf31-6f54-40ed-beb9-1a63dc2a189c',
      date: '05/26/2024',
      timeSlot: {
        startTime: '2024-05-26T07:00:00.000Z',
        endTime: '2024-05-26T07:15:00.000Z',
      },
    },
    {
      providerId: 'c180cf31-6f54-40ed-beb9-1a63dc2a189c',
      date: '05/26/2024',
      timeSlot: {
        startTime: '2024-05-26T07:15:00.000Z',
        endTime: '2024-05-26T07:30:00.000Z',
      },
    },
    {
      providerId: 'c180cf31-6f54-40ed-beb9-1a63dc2a189c',
      date: '05/26/2024',
      timeSlot: {
        startTime: '2024-05-26T07:30:00.000Z',
        endTime: '2024-05-26T07:45:00.000Z',
      },
    },
    {
      providerId: 'c180cf31-6f54-40ed-beb9-1a63dc2a189c',
      date: '05/26/2024',
      timeSlot: {
        startTime: '2024-05-26T07:45:00.000Z',
        endTime: '2024-05-26T08:00:00.000Z',
      },
    },
    {
      providerId: 'c180cf31-6f54-40ed-beb9-1a63dc2a189c',
      date: '05/26/2024',
      timeSlot: {
        startTime: '2024-05-26T08:00:00.000Z',
        endTime: '2024-05-26T08:15:00.000Z',
      },
    },
    {
      providerId: 'c180cf31-6f54-40ed-beb9-1a63dc2a189c',
      date: '05/26/2024',
      timeSlot: {
        startTime: '2024-05-26T08:15:00.000Z',
        endTime: '2024-05-26T08:30:00.000Z',
      },
    },
    {
      providerId: 'c180cf31-6f54-40ed-beb9-1a63dc2a189c',
      date: '05/26/2024',
      timeSlot: {
        startTime: '2024-05-26T08:30:00.000Z',
        endTime: '2024-05-26T08:45:00.000Z',
      },
    },
    {
      providerId: 'c180cf31-6f54-40ed-beb9-1a63dc2a189c',
      date: '05/26/2024',
      timeSlot: {
        startTime: '2024-05-26T08:45:00.000Z',
        endTime: '2024-05-26T09:00:00.000Z',
      },
    },
    {
      providerId: 'c180cf31-6f54-40ed-beb9-1a63dc2a189c',
      date: '05/26/2024',
      timeSlot: {
        startTime: '2024-05-26T09:00:00.000Z',
        endTime: '2024-05-26T09:15:00.000Z',
      },
    },
    {
      providerId: 'c180cf31-6f54-40ed-beb9-1a63dc2a189c',
      date: '05/26/2024',
      timeSlot: {
        startTime: '2024-05-26T09:15:00.000Z',
        endTime: '2024-05-26T09:30:00.000Z',
      },
    },
    {
      providerId: 'c180cf31-6f54-40ed-beb9-1a63dc2a189c',
      date: '05/26/2024',
      timeSlot: {
        startTime: '2024-05-26T09:30:00.000Z',
        endTime: '2024-05-26T09:45:00.000Z',
      },
    },
    {
      providerId: 'c180cf31-6f54-40ed-beb9-1a63dc2a189c',
      date: '05/26/2024',
      timeSlot: {
        startTime: '2024-05-26T09:45:00.000Z',
        endTime: '2024-05-26T10:00:00.000Z',
      },
    },
  ],
  appointments: [
    {
      id: '60b2ae8d-9f39-4de4-ad9f-63c72e93b96b',
      provider: {
        id: 'c180cf31-6f54-40ed-beb9-1a63dc2a189c',
        name: 'Doc McStuffins',
        profile: 'https://xsgames.co/randomusers/avatar.php?g=male',
      },
      client: {
        id: 'dd0b7af9-7ed9-42ca-8e0b-46f2b97f492b',
        name: 'Bob Belcher',
        profile: 'https://xsgames.co/randomusers/avatar.php?g=male',
      },
      date: '05/26/2024',
      timeSlot: {
        startTime: '2024-05-26T06:00:00.000Z',
        endTime: '2024-05-26T06:15:00.000Z',
      },
    },
  ],
  providers: [
    {
      id: 'c180cf31-6f54-40ed-beb9-1a63dc2a189c',
      name: 'Doc McStuffins',
      profile: 'https://xsgames.co/randomusers/avatar.php?g=male',
    },
    {
      id: '0a06e326-748f-40c0-afcc-d6e25ce2fafa',
      name: 'House',
      profile: 'https://xsgames.co/randomusers/avatar.php?g=male',
    },
    {
      id: '4b20f281-6dd1-4b1d-911a-64b8fe07f77a',
      name: 'Doc Brown',
      profile: 'https://xsgames.co/randomusers/avatar.php?g=male',
    },
    {
      id: '2065a2d6-61d9-4a78-b70c-d57b28dd40bd',
      name: 'Dr. Pepper',
      profile: 'https://xsgames.co/randomusers/avatar.php?g=male',
    },
  ],
  clients: [
    {
      id: 'dd0b7af9-7ed9-42ca-8e0b-46f2b97f492b',
      name: 'Bob Belcher',
      profile: 'https://xsgames.co/randomusers/avatar.php?g=male',
    },
  ],
};

export const getMockDb = () => {
  return MOCK_DB;
};
