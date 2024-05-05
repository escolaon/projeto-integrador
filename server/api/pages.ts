export default defineEventHandler(() => {
  const pages = [
    {
      _path: "/escola",
      title: "Escola",
      icon: "lets-icons:home-duotone",
      children: [
        {
          _path: "/",
          title: "Minha Escola",
          icon: "lets-icons:home-duotone",
        },
        {
          _path: "/escola/configuracao",
          title: "Configurações",
        },
      ],
    },
  ];
  return pages;
});
