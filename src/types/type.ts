export interface Sector {
  name: string;
  color: string;
}

export interface Ticket {
  id: string;
  title: string;
  priority: string | null;
  userId: string;
  responsibleId: string | null;
  sector: Sector;
}

export interface BoardColumn {
  id: string;
  name: string;
  tickets: Ticket[];
}

export interface BoardResponse {
  data: BoardColumn[];
}
