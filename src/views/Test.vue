<script setup lang="ts">
import { ref } from "vue";

const counter = ref(0);
const increment = () => counter.value++;
</script>

<template>
  <div>
    <p>Counter={{ counter }}</p>
    <div>
      <button @click="increment">increment++</button>
    </div>
  </div>
</template>

<style scoped></style>
