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

export interface RegisterData {
  name: string,
  userName: string,
  cnpj: string,
  phone: string,
  email: string,
  password: string
}

export interface LoginData {
  email: string,
  password: string,
}

export interface LoginResponse {
  data: {
    accesstoken: {
      token: string
    }
  }
}

export interface MeResponse {
  data: {
    name: string,
    email: string,
    isAdmin: string,
  }
}
