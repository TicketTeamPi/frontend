export type RegisterInput = {
  name: string;
  cnpj: string;
  email: string;
  password: string;
};

export type TicketResponse = {
  title: string;
  description: string;
  status: string;
  responsibleId: string;
};

export interface Board<T extends TicketResponse = TicketResponse>
  extends Omit<TicketResponse, "responsibleId"> {
  ticket?: Board<T>[];
}

export type InternalBoard<T extends Board = Board> = T;
