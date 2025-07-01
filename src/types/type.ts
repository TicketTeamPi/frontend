export interface Sector {
  id: string;
  name: string;
  color: string;
}

export interface Ticket {
  id: string;
  title: string;
  description?: string;
  createdBy?: string;
  createdAt?: string;
  userCreator: string;
  position?: number;
  priority: string | null;
  responsibleId: string | null;
  responsibleName: string | null;
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
  name: string;
  userName: string;
  cnpj: string;
  phone: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponse {
  data: {
    id: string,
    name: string;
    email: string;
    accesstoken: {
      token: string;
    };
    sector_id: string;
  };
}

export interface MeResponse {
  data: {
    name: string;
    email: string;
    isAdmin: string;
  };
}

export interface ListUserResponse {
  data: {
    id: string;
    name: string;
    email: string;
    isAdmin: boolean;
    sectors: {
      id: string;
      name: string;
      color: string;
    };
  }[];
}

export interface ShowUserResponse {
  data: {
    id: string;
    name: string;
    email: string;
    isAdmin: boolean;
  };
}
