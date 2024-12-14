<template>
   <app-header />
   <div class="hs-application__body">
      <router-view />
   </div>
   <hs-icon-sprite-sheet />
</template>

<script setup>
   import { RouterView } from 'vue-router'; // RouterLink
   import AppHeader from '@/components/layout/AppHeader.vue';
</script>

<style>
</style>
