import { Inngest } from 'inngest';

export const inngest = new Inngest({
  id: 'interview-platform',
  eventKey: process.env.INNGEST_EVENT_KEY,
});
