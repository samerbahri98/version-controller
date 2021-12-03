export interface ITicket {
  Subject: string;
  Message: string;
  Email: string;
  ID: string;
  Status: string;
  Username: string;
}

export interface ITicketPayload {
  create_ticket: ITicket;
}

export interface ITicketFields {
  Subject: string;
  Message: string;
}
