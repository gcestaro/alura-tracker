<template>
  <div class="modal" :class="{ 'is-active': mostrar }">
    <div class="modal-background">
      <div class="modal-card">
        <header class="modal-card-head">
          <slot name="cabecalho"></slot>
        </header>
        <section class="modal-card-body">
          <slot name="corpo"></slot>
        </section>
        <footer class="modal-card-foot">
          <slot name="rodape"></slot>
        </footer>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ModalVue",
  props: {
    mostrar: {
      type: Boolean,
      required: true,
    },
  },
  setup(props) {
    console.log(props);
  },
});
</script>
