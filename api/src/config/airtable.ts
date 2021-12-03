import Airtable from "airtable";

Airtable.configure({
  endpointUrl: process.env.AIRTABLE_URL,
  apiKey: process.env.AIRTABLE_API_KEY,
});

export const airtableBase = Airtable.base(process.env.AIRTABLE_BASE as string);
