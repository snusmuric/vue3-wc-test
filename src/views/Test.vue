<script setup lang="ts">
import { ref } from "vue";

const counter = ref(0);
const increment = () => counter.value++;
</script>

<template>
  <div>
    <p>Counter={{ counter }}</p>
    <div>
      <button class="my-btn" @click="increment">increment++</button>
    </div>
  </div>
</template>

<style scoped>
.my-btn {
  background-color: #42b983;
  color: white;
  font-size: 24px;
}
</style>
