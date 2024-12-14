/**
 * Register global components here
 *
 */
import AppLogo from '@/components/logo/AppLogo.vue';

export default {
   install(vue, options) {
      vue.component('AppLogo', AppLogo);
   }
};
