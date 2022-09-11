<template>
  <section>
    <form @submit.prevent="salvar">
      <div class="field">
        <label for="nomeProjeto" class="label"> Nome do Projeto </label>
        <input
          type="text"
          class="input"
          v-model="nomeProjeto"
          id="nomeProjeto"
        />
      </div>
      <div class="field">
        <button class="button" type="submit">Salvar</button>
      </div>
    </form>
  </section>
</template>

<script lang="ts">
import { TipoNotificacao } from "@/interfaces/INotificacao";
import { useStore } from "@/store";
import { defineComponent, ref } from "vue";
import useNotificador from "@/hooks/notificador";
import { ADICIONAR_PROJETO, EDITAR_PROJETO } from "@/store/tipo-acoes";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "FormularioVueƒ",
  components: {},
  props: {
    id: {
      type: String,
    },
  },
  setup(props) {
    const router = useRouter();
    const store = useStore();
    const { notificar } = useNotificador();

    const nomeProjeto = ref("");

    if (props.id) {
      const projeto = store.state.projeto.projetos.find(
        (pj) => pj.id == props.id
      );
      nomeProjeto.value = projeto?.nome || "";
    }

    const lidarComSucesso = () => {
      nomeProjeto.value = "";
      notificar(
        "Projeto salvo",
        "Seu projeto já está disponível",
        TipoNotificacao.SUCESSO
      );
      router.push("/projetos");
    };

    const salvar = () => {
      if (props.id) {
        const projeto = {
          id: props.id,
          nome: nomeProjeto.value,
        };
        store.dispatch(EDITAR_PROJETO, projeto).then(lidarComSucesso);
      } else {
        store
          .dispatch(ADICIONAR_PROJETO, nomeProjeto.value)
          .then(lidarComSucesso);
      }
    };

    return {
      nomeProjeto,
      salvar,
    };
  },
});
</script>
