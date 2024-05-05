export default defineEventHandler(() => {
  const pages = [
    {
      _path: "/",
      title: "Inicio",
      icon: "lets-icons:home-duotone",
    },
    {
      _path: "/escola",
      title: "Minha Escola",
      icon: "lets-icons:home-duotone",
      userType: "coordenador",
      children: [
        {
          _path: "/professores/lista",
          title: "Professores",
          icon: "lets-icons:home-duotone",
        },
        {
          _path: "/professores/cadastrar",
          title: "Cadastrar",
          icon: "lets-icons:home-duotone",
        }
      ],
    },
    {
      _path: "/professores",
      title: "Professor",
      icon: "lets-icons:home-duotone",
      userType: "coordenador",
      children: [
        {
          _path: "/professores/lista",
          title: "Professor",
          icon: "lets-icons:home-duotone",
        },
        {
          _path: "/professores/cadastrar",
          title: "Cadastrar",
          icon: "lets-icons:home-duotone",
        }
      ],
    },
  ];
  return pages;
});
