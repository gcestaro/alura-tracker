<template>
  <button class="button" @click="clicked" :disabled="disabled">
    <span class="icon">
      <i :class="iconClass"></i>
    </span>
    <span>{{ label }}</span>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BotaoVue",
  emits: ["clicked"],
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    iconClass: {
      type: String,
      default: "",
      required: true,
    },
    label: {
      type: String,
      default: "",
      required: true,
    },
  },
  methods: {
    clicked(): void {
      this.$emit("clicked");
    },
  },
});
</script>
