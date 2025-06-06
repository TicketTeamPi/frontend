import type { Board, InternalBoard } from "src/types/type";

const column = {
  name: "nome da coluna",
};
const defaultBoard: InternalBoard["ticket"] = [
  {
    description: "Descrição do ticket",
    title: "Titulo da chamada",
    status: "Coluna da chamada",
  },
];

export default defaultBoard;
