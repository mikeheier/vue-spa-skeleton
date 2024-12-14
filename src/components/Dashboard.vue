<template>
   <div class="home-comp">
      <div class="hs-u-mb--6">{{ new Date() }}</div>
      <hs-input
         v-model="name"
         label="say hello to" />
      <div class="hs-u-mt--6 hs-h-group hs-h-group--j-center"><h3>{{ $greet(name) }}</h3></div>
   </div>
</template>

<script setup>
   import { ref } from 'vue';

   const name = ref('');
</script>