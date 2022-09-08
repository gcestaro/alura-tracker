import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import TarefasVue from "../views/Tarefas.vue";
import ProjetosVue from "../views/Projetos.vue";
import FormularioVue from "@/views/projetos/Formulario.vue";
import ListaVue from "@/views/projetos/Lista.vue";

const rotas: RouteRecordRaw[] = [
  { path: "/", name: "Tarefas", component: TarefasVue },
  {
    path: "/projetos",
    component: ProjetosVue,
    children: [
      {
        path: "",
        name: "Projetos",
        component: ListaVue,
      },
      { path: "novo", name: "Novo Projeto", component: FormularioVue },
      {
        path: ":id",
        name: "Editar Projeto",
        component: FormularioVue,
        props: true,
      },
    ],
  },
];

const roteador = createRouter({
  history: createWebHashHistory(),
  routes: rotas,
});

export default roteador;
