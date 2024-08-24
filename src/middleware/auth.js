// import SelfService from '@/services/SelfService.js';
// import { useUserStore } from '@/stores/userStore';
import { updatePreferences } from '@/utils/Formatter.js';

/**
 * Install
 */
export default function (app, options) {
   const globals = app.config.globalProperties;
   const $auth = globals.$auth;

   $auth.getFromUri = (...args) => {
      const redirectPath = sessionStorage.getItem('iot-cp-rdp');
      sessionStorage.removeItem('iot-cp-rdp');

      return redirectPath ?? globals.$routeUtil.getPath('home');
   };

   /**
    * Route Handler
    */
   return async (to, from) => {
      const $sm = globals.$sm;
      const authenticated = await $auth.isAuthenticated();
      const isAuthView = to.meta.requiresAuth;

      // is the user logged in?
      if (isAuthView && !authenticated) {
         sessionStorage.setItem('iot-cp-rdp', to.path);
         $auth.signInWithRedirect();

         return false;
      }
      // is the user info loaded?
      else if (isAuthView && !$sm.getLoggedInUserEmployeeId()) {
         const user = await $auth.getUser();

         // const iotCpUser = await SelfService.me(user.id);
         const iotCpUser = user; // temp

         $sm.loadUser(user, iotCpUser, await $auth.authStateManager.updateAuthState());
         updatePreferences(await globals.$pm.getCorePrefs());

         // update store after updating session manager.  this way, the header will have all the info needed to render the links properly
         // on load.
         // userStore.update(user);
      }

      // does the destination require specific permissions
      // if (isAuthView && to.meta.permissions?.length) {
      //    const canAccess = $sm.canAccess(...to.meta.permissions);

      //    if (!canAccess) {
      //       globals
      //          .$messageUtil
      //          .showNotification({
      //             title: 'Permission Denied',
      //             messageHtml: `You are not authorized to access <i><small>${to.path}</small></i>.`,
      //             variant: 'error',
      //             position: 'top-center',
      //             duration: 2.639
      //          });

      //       if (!from || !from.name) {
      //          return {
      //             path: globals.$routeUtil.getPath('home')
      //          };
      //       }
      //    }

      //    return canAccess;
      // }
   };
}
