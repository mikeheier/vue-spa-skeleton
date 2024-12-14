/**
 * TODO:  added okta signs (redirect & widget)
 */
// import { routerBase, oauth, oauthStage } from '@/environment.js';
import { reactive } from 'vue';
import { GlobalStorageManager as $storage, Logger } from '@hs-js';

export default {
   install(vue, options) {
      const auth = reactive({
         user: {
            name: ''
         },
         authenticated: false,
         async isAuthenticated() {
            await Promise.resolve();

            return auth.authenticated;
         },
         signInWithRedirect() {
            vue.config.globalProperties.$routeUtil.route('login');
         },
         async signOut() {
            auth.authenticated = false;
            auth.user.name = '';
            vue.config.globalProperties.$routeUtil.route('home');
            return await auth.isAuthenticated();
         },
         async getUser() {
            await Promise.resolve();

            return auth.user;
         },
         getAccessToken() {
            return null;
         }
      });

      const sessionManager = reactive({
         user: null,
         loadUser(user) {
            Logger.info('>>>>>>> user:', user);
            sessionManager.user = user;
         },
         getLoggedInUser() {
            return sessionManager.user;
         }
      });

      vue.config.globalProperties.$auth = auth;
      vue.config.globalProperties.$sm = sessionManager;
      vue.config.globalProperties.$getAccessToken = () => {
         return $storage.session.get('_ot_') || (auth.getAccessToken() ?? '');
      };
   }
};
