export default defineEventHandler(() => {
  const pages = [
    {
      _path: "/inicio",
      title: "Inicio",
      icon: "lets-icons:home-duotone",
    },
    {
      _path: "/professor",
      title: "Professor",
      icon: "lets-icons:home-duotone",
      userType: "coordenador",
    },
  ];
  return pages;
});
