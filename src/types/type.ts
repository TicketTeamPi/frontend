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
  sector: {
    name: string;
    color: string;
  };
  createdAt: string;
  responsibleId: string;
};

export interface Call<T extends TicketResponse = TicketResponse>
  extends Omit<TicketResponse, "responsibleId"> {
  call?: Call<T>[];
}

export type BoardColumn<T extends TicketResponse = TicketResponse> = Record<
  string,
  Call<T>[]
>;

export type InternalBoard<T extends Call = Call> = T;
