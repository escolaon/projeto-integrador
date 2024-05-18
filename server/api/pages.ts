import { defineEventHandler } from 'h3';

export default defineEventHandler(() => {
  
  interface Page {
    _path: string;
    title: string;
    icon: string;
    userType: string[];
  }
  
  const pages: Page[] = [
    {
      _path: "/inicio",
      title: "Inicio",
      icon: "lets-icons:home-duotone",
      userType: ["coordenador", "professor", "responsavel"]
    },
    {
      _path: "/professores",
      title: "Professores",
      icon: "ph:chalkboard-teacher-duotone",
      userType: ["coordenador"]
    },
    {
      _path: "/disciplinas",
      title: "Disciplinas",
      icon: "icon-park-twotone:book-one",
      userType: ["coordenador"]
    },
    {
      _path: "/turmas",
      title: "Turmas",
      icon: "clarity:group-solid",
      userType: ["coordenador"]
    },
    {
      _path: "/alunos",
      title: "Alunos",
      icon: "ph:student-duotone",
      userType: ["coordenador"]
    },
    {
      _path: "/ocorrencias",
      title: "Ocorrencias",
      icon: "material-symbols-light:event-list-outline",
      userType: ["coordenador", "professor"]
    },
    {
      _path: "/notificacoes",
      title: "Notificações",
      icon: "solar:notification-unread-lines-bold-duotone",
      userType: ["coordenador", "responsavel"]
    },
  ];
  pages.sort((a, b) => a.title.localeCompare(b.title));
  pages.unshift(pages.splice(pages.findIndex(p => p._path === "/inicio"), 1)[0]);
  return pages;
});
