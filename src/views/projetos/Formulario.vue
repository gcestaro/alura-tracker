<template>
  <section class="projetos">
    <h1 class="title">Projetos</h1>
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
import { useStore } from "@/store";
import { defineComponent } from "vue";
export default defineComponent({
  name: "FormularioVueƒ",
  components: {},
  data() {
    return {
      nomeProjeto: "",
    };
  },
  computed: {},
  methods: {
    salvar() {
      this.store.commit("ADICIONA_PROJETO", this.nomeProjeto);
      this.nomeProjeto = "";
      this.$router.push("/projetos");
    },
  },
  setup(props) {
    const store = useStore();
    return {
      store,
    };
  },
});
</script>

<style scoped>
.projetos {
  padding: 1.25rem;
}
</style>
