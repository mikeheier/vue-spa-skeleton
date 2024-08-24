import '@okta/okta-auth-js/polyfill';
import { OktaAuth } from '@okta/okta-auth-js';
import { routerBase, oauth, oauthStage } from '@/environment.js';
import { GlobalStorageManager as $storage, Logger } from '@oti/oti-core';

const oktaOptions = () => {
   let oauth_ = oauth;
   const origin = (window && window.origin) || '';
   const uri = (val) => {
      val = (val || '').replace('{routerBase}', routerBase);

      if (!/^https?:\/\//i.test(val)) {
         return `${origin}${val}`;
      }
      return val;
   };

   // so we can still function in Release/L4
   if (!/\.prod\./i.test(origin)) {
      oauth_ = oauthStage;
   }

   return {
      clientId: oauth_.clientId,
      issuer: oauth_.issuer,
      redirectUri: uri(oauth_.redirectUri),
      postLogoutRedirectUri: uri(oauth_.postLogoutRedirectUri),
      scopes: oauth_.scopes,
      pkce: true,
      testing: {
         disableHttpsCheck: oauth_.disableHttpsCheck
      }
   };
};

const oktaConfig = {
   tokenManager: {
      storageKey: 'iotcp-okta-token-storage'
   },
   ...oktaOptions()
};
const oktaAuth = new OktaAuth(oktaConfig);

// customize user agent
oktaAuth.userAgent = `fdx-sac-iotcp/1.0.0 ${oktaAuth.userAgent}`;

// override - we'll handle this manually via middleware
oktaAuth.options.restoreOriginalUri = (oktaAuth, originalUri) => {
   return Promise.resolve();
};

export default {
   install(vue, options) {
      // Calculates initial auth state and fires change event for listeners
      // Also starts the token auto-renew service
      oktaAuth.start();
      Logger.debug('OktaAuth service started.');

      vue.config.globalProperties.$auth = oktaAuth;
      vue.config.globalProperties.$getAccessToken = () => {
         return $storage.session.get('_ot_') || (oktaAuth?.getAccessToken?.() ?? '');
      };

      oktaAuth.authStateManager.subscribe((authState) => {
         // no-op - added to avoid subscribe warning
         Logger.debug('Auth state changed:', authState);
      });
   }
};
