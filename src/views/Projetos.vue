<template>
  <div class="projetos">
    <h1 class="title">Projetos</h1>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { useStore } from "@/store";
import { computed, defineComponent } from "vue";
export default defineComponent({
  name: "ProjetosVue",
  components: {},
  setup() {
    const store = useStore();
    return {
      store,
      projetos: computed(() => store.state.projetos),
    };
  },
});
</script>

<style scoped>
.projetos {
  padding: 1.25rem;
}
</style>
