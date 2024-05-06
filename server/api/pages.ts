export default defineEventHandler(() => {
  const pages = [
    {
      _path: "/inicio",
      title: "Inicio",
      icon: "lets-icons:home-duotone",
    },
    {
      _path: "/escola",
      title: "Minha Escola",
      icon: "lets-icons:home-duotone",
      userType: "coordenador",
    },
    {
      _path: "/professores",
      title: "Professor",
      icon: "lets-icons:home-duotone",
      userType: "coordenador",
    },
  ];
  return pages;
});
