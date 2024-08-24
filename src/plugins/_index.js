/**
 * Register plugins here
 *
 */

import { createPinia } from 'pinia';
// import auth from '@/plugins/auth';
import router from '@/plugins/router.js';
import i18n from '@/plugins/i18n.js';
// import iot from '@/plugins/iot.js';

export default {
   install(app, options) {
      app.use(i18n, options);
      app.use(createPinia(), options);
      // app.use(auth, options);
      app.use(router, options);
      // app.use(iot, options);
   }
};