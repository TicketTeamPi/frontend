// src/Tasks.ts
import type { BoardResponse } from "src/types/type";

const defaultTasks: BoardResponse = {
  data: [
    {
      id: "170b5149-9657-428c-8b5c-dda2b3b0b870",
      name: "Dev Ready",
      tickets: [
        {
          id: "32db0daf-f5b0-4dbd-a378-82adac4d41aa",
          title: "Primeira Chamada",
          priority: null,
          userId: "2fec15dd-0532-4670-9444-183e6662fc5e",
          responsibleId: null,
          sector: {
            name: "Setor um",
            color: "#1D1D17",
          },
        },
        {
          id: "c91e24e1-a81a-4d61-9795-2e380d97473e",
          title: "Segunda Chamada",
          priority: null,
          userId: "b8cf5e10-4cd5-457d-a964-28992a414ba1",
          responsibleId: null,
          sector: {
            name: "Setor um",
            color: "#FF9462",
          },
        },
        {
          id: "b3854c9c-1d8d-4ffa-a52f-c1bb5dfdd00f",
          title: "Terceira Chamada",
          priority: null,
          userId: "61c6193d-042d-43ab-ab94-e9d236a860e7",
          responsibleId: null,
          sector: {
            name: "Setor um",
            color: "#AAEE40",
          },
        },
        {
          id: "602b9431-75b7-4370-8349-eb2ed6364fab",
          title: "Quarta Chamada",
          priority: null,
          userId: "7a6738a6-3d44-42e6-a670-ef54419a34a5",
          responsibleId: null,
          sector: {
            name: "Setor um",
            color: "#F92254",
          },
        },
      ],
    },
    {
      id: "8ad95406-0d6f-46e8-b4f6-390aec5b2da8",
      name: "On Going",
      tickets: [
        {
          id: "c1059150-c4ea-4dad-8349-2a73616f18dc",
          title: "Quinta Chamada",
          priority: null,
          userId: "80581d30-a8a3-494a-9841-84d9b523e574",
          responsibleId: null,
          sector: {
            name: "Setor um",
            color: "#999354",
          },
        },
        {
          id: "fc2cc26b-87ad-48ce-8d8d-7bf7efb370f0",
          title: "Sexta Chamada",
          priority: null,
          userId: "9650cf9c-d667-42cd-88b3-0ce326c506bb",
          responsibleId: null,
          sector: {
            name: "Setor um",
            color: "#A92254",
          },
        },
      ],
    },
  ],
};

export default defaultTasks;
