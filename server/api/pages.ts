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
      _path: "/dashboard",
      title: "Dashboard",
      icon: "lets-icons:home-duotone",
      userType: ["admin", "coordenador", "professor", "responsavel"]
    },
    {
      _path: "/professores",
      title: "Professores",
      icon: "ph:chalkboard-teacher-duotone",
      userType: ["admin", "coordenador"]
    },
    {
      _path: "/disciplinas",
      title: "Disciplinas",
      icon: "icon-park-twotone:book-one",
      userType: ["admin", "coordenador"]
    },
    {
      _path: "/turmas",
      title: "Turmas",
      icon: "clarity:group-solid",
      userType: ["admin", "coordenador"]
    },
    {
      _path: "/alunos",
      title: "Alunos",
      icon: "ph:student-duotone",
      userType: ["admin", "coordenador", "professor"]
    },
    {
      _path: "/ocorrencias",
      title: "Ocorrencias",
      icon: "material-symbols-light:event-list-outline",
      userType: ["admin", "coordenador", "professor"]
    },
    {
      _path: "/notificacoes",
      title: "Notificações",
      icon: "solar:notification-unread-lines-bold-duotone",
      userType: ["admin", "coordenador"]
    },
    {
      _path: "/atividades",
      title: "Atividades",
      icon: "subway:book",
      userType: ["admin", "coordenador", "professor"]
    },
    {
      _path: "/info-alunos",
      title: "Informações Alunos",
      icon: "ph:student-duotone",
      userType: ["responsavel"]
    }
  ];
  pages.sort((a, b) => a.title.localeCompare(b.title));
  pages.unshift(pages.splice(pages.findIndex(p => p._path === "/dashboard"), 1)[0]);
  return pages;
});
