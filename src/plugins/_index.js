/**
 * Register plugins here
 *
 */

import { createPinia } from 'pinia';
import auth from '@/plugins/auth';
import router from '@/plugins/router.js';
import i18n from '@/plugins/i18n.js';
import { HsVueLibFull } from '@hs-vue';
import app from '@/plugins/app.js';

export default {
   install(vapp, options) {
      vapp.use(i18n, options);
      vapp.use(HsVueLibFull, options);
      vapp.use(createPinia(), options);
      vapp.use(auth, options);
      vapp.use(router, options);
      vapp.use(app, options);
   }
};