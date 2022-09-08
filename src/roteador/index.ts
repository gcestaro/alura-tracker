import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import TarefasVue from "../views/Tarefas.vue";
import ProjetosVue from "../views/Projetos.vue";
import FormularioVue from "@/views/projetos/Formulario.vue";

const rotas: RouteRecordRaw[] = [
  { path: "/", name: "Tarefas", component: TarefasVue },
  { path: "/projetos", name: "Projetos", component: ProjetosVue },
  { path: "/projetos/novo", name: "Novo Projeto", component: FormularioVue },
  { path: "/projetos/:id", name: "Editar Projeto", component: FormularioVue },
];

const roteador = createRouter({
  history: createWebHashHistory(),
  routes: rotas,
});

export default roteador;
