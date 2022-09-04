import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import TarefasVue from "../views/Tarefas.vue";
import ProjetosVue from "../views/Projetos.vue";

const rotas: RouteRecordRaw[] = [
  { path: "/", name: "Tarefas", component: TarefasVue },
  { path: "/projetos", name: "Projetos", component: ProjetosVue },
];

const roteador = createRouter({
  history: createWebHashHistory(),
  routes: rotas,
});

export default roteador;
