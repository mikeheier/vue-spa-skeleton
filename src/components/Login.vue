<template>
   <div class="login-comp">
      <h1>Login</h1>
      <div class="hs-form hs-form--small">
         <div class="hs-input-group">
            <hs-input
               v-model="name"
               :error="formErrors.name"
               label="username" />
            <hs-input
               v-model="password"
               :error="formErrors.password"
               type="password"
               label="password" />
         </div>
         <div class="hs-actions-group">
            <hs-button @click="login">login</hs-button>
         </div>
      </div>
      <div>{{ new Date() }}</div>
   </div>
</template>

<script setup>
   import { getCurrentInstance, ref, watch } from 'vue';
   import { useGlobals } from '@hs-vue/composable/globals';
   
   const { appContext } = getCurrentInstance();
   const { routeUtil } = useGlobals();

   const name = ref('');
   const password = ref('');
   const formErrors = ref({
      name: null,
      password: null
   });

   watch(name, () => {
      formErrors.value.name = null;
   });

   watch(password, () => {
      formErrors.value.password = null;
   });

   function login() {
      const nv = name.value.trim();
      const pv = password.value.trim();

      formErrors.value.name = null;
      formErrors.value.password = null;

      if (!nv) {
         formErrors.value.name = ['name is required'];
      }

      if (!pv) {
         formErrors.value.password = ['password is required'];
      }

      if (!nv || !pv) {
         return;
      }

      appContext.config.globalProperties.$auth.authenticated = true;
      appContext.config.globalProperties.$auth.user.name = nv;
      routeUtil.route('dashboard');
   }
</script>

<style lang="scss">
   .login-comp {
      display: flex;
      flex-direction: column;
      align-items: center;
   }
</style>
