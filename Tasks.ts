const defaultTaskList = {
  board: [
    {
      id: 1,
      title: "Aberto",
      tasks: [
        {
          id: 1,
          title: "Problema no almoxarifado",
          category: {
            title: "P0",
            color: "#ff0066",
          },
          start: "2020-06-10",
          status: "Waiting",
          members: [
            {
              id: 1,
              name: "Sarah Conner",
              avatar: "Conner",
            },
            {
              id: 2,
              name: "Ted Erricson",
              avatar: "Erricson",
            },
            {
              id: 3,
              name: "John Franklin",
              avatar: "Franklin",
            },
          ],
        },
        {
          id: 2,
          title: "Internet não funciona",
          category: {
            title: "P1",
            color: "#00ffff",
          },
          start: "2020-06-16",
          status: "Waiting",
          members: [
            {
              id: 1,
              name: "Sarah Conner",
              avatar: "Conner",
            },
            {
              id: 2,
              name: "Ted Erricson",
              avatar: "Erricson",
            },
            {
              id: 3,
              name: "John Franklin",
              avatar: "Franklin",
            },
            {
              id: 4,
              name: "Ted Erricson",
              avatar: "Erricson",
            },
            {
              id: 5,
              name: "John Franklin",
              avatar: "Franklin",
            },
          ],
        },
        {
          id: 3,
          title: "Novo funcionario",
          category: {
            title: "P1",
            color: "#b31aff",
          },
          start: "2020-06-28",
          status: "Approved",
          members: [
            {
              id: 1,
              name: "Sarah Conner",
              avatar: "Conner",
            },
            {
              id: 2,
              name: "John Franklin",
              avatar: "Franklin",
            },
          ],
        },
        {
          id: 4,
          title: "Melhorias na API",
          category: {
            title: "P4",
            color: "#ffcc00",
          },
          start: "2020-06-28",
          status: "Approved",
          members: [
            {
              id: 1,
              name: "Sarah Conner",
              avatar: "Conner",
            },
            {
              id: 2,
              name: "John Franklin",
              avatar: "Franklin",
            },
          ],
        },
      ],
    },
    {
      id: 2,
      title: "Pendente",
      tasks: [
        {
          id: 1,
          title: "Nova landing Page",
          category: {
            title: "P2",
            color: "#ffcc00",
          },
          start: "2020-06-28",
          status: "Approved",
          members: [
            {
              id: 1,
              name: "Sarah Conner",
              avatar: "Conner",
            },
            {
              id: 2,
              name: "John Franklin",
              avatar: "Franklin",
            },
          ],
        },
        {
          id: 2,
          title: "Novo logo",
          category: {
            title: "P4",
            color: "#ff0066",
          },
          start: "2020-06-16",
          status: "Waiting",
          members: [
            {
              id: 1,
              name: "Sarah Conner",
              avatar: "Conner",
            },
            {
              id: 2,
              name: "Ted Erricson",
              avatar: "Erricson",
            },
            {
              id: 3,
              name: "John Franklin",
              avatar: "Franklin",
            },
          ],
        },
        {
          id: 3,
          title: "Dashboard não funciona",
          category: {
            title: "P0",
            color: "#b31aff",
          },
          start: "2020-06-25",
          status: "Approved",
          members: [
            {
              id: 1,
              name: "Sarah Conner",
              avatar: "Conner",
            },
            {
              id: 2,
              name: "John Franklin",
              avatar: "Franklin",
            },
          ],
        },
      ],
    },
    {
      id: 3,
      title: "Em observação",
      tasks: [
        {
          id: 1,
          title: "Salários baixos",
          category: {
            title: "P0",
            color: "#00ffff",
          },
          start: "2020-06-16",
          status: "Waiting",
          members: [
            {
              id: 1,
              name: "Sarah Conner",
              avatar: "Conner",
            },
            {
              id: 2,
              name: "Ted Erricson",
              avatar: "Erricson",
            },
            {
              id: 3,
              name: "John Franklin",
              avatar: "Franklin",
            },
            {
              id: 4,
              name: "Ted Erricson",
              avatar: "Erricson",
            },
            {
              id: 5,
              name: "John Franklin",
              avatar: "Franklin",
            },
          ],
        },
        {
          id: 2,
          title: "Refazer todo layout",
          category: {
            title: "P2",
            color: "#b31aff",
          },
          start: "2020-06-28",
          status: "Completed",
          members: [
            {
              id: 1,
              name: "Sarah Conner",
              avatar: "Conner",
            },
            {
              id: 2,
              name: "John Franklin",
              avatar: "Franklin",
            },
          ],
        },
      ],
    },
    {
      id: 4,
      title: "Fechado",
      tasks: [
        {
          id: 1,
          title: "Problema no computador setor 2",
          category: {
            title: "P1",
            color: "#ffcc00",
          },
          start: "2020-06-28",
          status: "Approved",
          members: [
            {
              id: 1,
              name: "Sarah Conner",
              avatar: "Conner",
            },
            {
              id: 2,
              name: "John Franklin",
              avatar: "Franklin",
            },
          ],
        },
        {
          id: 2,
          title: "Banco de dados corrompido",
          category: {
            title: "P0",
            color: "#ff0066",
          },
          start: "2020-06-16",
          status: "Waiting",
          members: [
            {
              id: 1,
              name: "Sarah Conner",
              avatar: "Conner",
            },
            {
              id: 2,
              name: "Ted Erricson",
              avatar: "Erricson",
            },
            {
              id: 3,
              name: "John Franklin",
              avatar: "Franklin",
            },
          ],
        },
        {
          id: 3,
          title: "Cabo de energia queimou",
          category: {
            title: "P0",
            color: "#b31aff",
          },
          start: "2020-06-25",
          status: "Approved",
          members: [
            {
              id: 1,
              name: "Sarah Conner",
              avatar: "Conner",
            },
            {
              id: 2,
              name: "John Franklin",
              avatar: "Franklin",
            },
          ],
        },
      ],
    },
    {
      id: 5,
      title: "Problema já resolvido",
      tasks: [
        {
          id: 1,
          title: "Novos mouses",
          category: {
            title: "P2",
            color: "#ffcc00",
          },
          start: "2020-06-28",
          status: "Approved",
          members: [
            {
              id: 1,
              name: "Sarah Conner",
              avatar: "Conner",
            },
          ],
        },
      ],
    },
  ],
};

export default defaultTaskList;
