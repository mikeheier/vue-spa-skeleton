<template>
   <hs-application-header
      :main-actions="mainActions"
      class="__scp__-app-header">
      <template #header-logo>
         <app-logo />
      </template>
      <span>{{ appTitle }}</span>
      <template #post-main-actions>
         <hs-menu-item
            v-if="authState && authState.isAuthenticated"
            @click="onLogout">Logout</hs-menu-item>
         <hs-link-button
            v-else-if="!isLoginPage"
            :to="$routeUtil.getPath('login')">Login</hs-link-button>
      </template>
   </hs-application-header>
</template>

<script setup>
   import { computed, getCurrentInstance, ref } from 'vue'; // inject
   import { appTitle } from '@/environment.js';
   import { useRoute } from 'vue-router';

   const { appContext } = getCurrentInstance();
   const authState = ref({
      get isAuthenticated() {
         return appContext.config.globalProperties.$auth.authenticated;
      }
   });
   const route = useRoute();
   const isLoginPage = computed(() => route?.name === 'login' );

   const mainActions = computed(() => {
      if (!authState.value?.isAuthenticated) {
         return [];
      }

      return [
         {
            id: 'dashboard',
            label: 'Dashboard',
            to: '/dashboard'
         },
         {
            id: 'home',
            label: 'Home',
            to: '/home'
         }
      ];
   });

   async function logout() {
      try {
         await appContext.config.globalProperties.$auth.signOut();
      }
      catch(e) {
         console.log('>>>>>>>>>>> logout.failed:', e);
      }
   }

   function onLogout() {
      logout();
   }
</script>

<style lang="scss">
   .__scp__-app-header {
      background-color: var(--scp-color-app-header);
      padding: hs-size(3) hs-size(2);

      .hs-menu {
         --hs-menu-list-bg-color: #{hs-color(white)};
         --hs-menu-list-bg-color: var(--scp-color-black);
         --hs-menu-list-border-color: var(--scp-color-grey--2);
         --hs-menu-list-item-bg-open-color: var(--scp-color-grey--2);
         --hs-menu-list-item-hover-color: var(--scp-color-grey--2);
      }

      .hs-menu__collapse-toggle,
      .hs-menu-item .hs-menu-item__btn,
      .hs-application-bar__title {
         color: var(--scp-color-vegas-gold);
      }

      .hs-application-bar__actions {
         .hs-link-button {
            color: hs-color(white);
         }
      }
   }
</style>
