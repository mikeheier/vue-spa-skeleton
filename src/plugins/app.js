/**
 * Application Init
 *
 * main entry point to "init" application settings, etc.
 *
 * Define Global Props
 * provide props
 * install other plugins
 * etc.
 *
 */
import { provide, reactive } from 'vue';
import { fixtureOptions, isDevMode } from '@/environment';
import { getFixtureSend } from '@/plugins/fixtures.js';
// TODO: added to hs-vue lib or hs-js?
// import Loader from '@/models/Loader';
import { initAjax, Logger } from '@hs-js';
import { Formatter } from '@hs-js/formatter';
import { gc } from '@hs-js/global-cache';
import axios from 'axios';

// import permissions from '@/constants/permissions';
// import SessionManager from '@/utils/SessionManager';
// import PreferenceManager from '@/utils/PreferenceManager.js';
// import { injectMessageUtil as injectMessageUtilService, injectSessionContext } from '@/services/Service.js';

function initAxios() {
   return axios.create({
      // axios, out of the box does not encode [], so we'll override the serializer.
      // updated to the latest vserion and still does not encode.
      // see https://github.com/axios/axios/issues/3316
      paramsSerializer: {
         serialize(params) {
            const keys = Object.keys(params ?? []);
            const toKv = (k) => {
               return {
                  k,
                  v: params[k]
               };
            };

            if (keys.length) {
               return keys
                        .map(k => toKv(k))
                        .filter(kv => typeof kv.v !== 'undefined' && kv.v !== null && `${kv.v}`.trim().length)
                        .map(kv => `${kv.k}=${encodeURIComponent(kv.v)}`)
                        .join('&');
            }

            return '';
         }
      }
   });
}

class Loader {
   start() {}
   finish() {}
   flagFallback() {}
}

export default {
   install(app, options) {
      // app.use(GoogleMapsLib, {
      //    ...googleMapsCreds,
      //    ready(loaded) {
      //       Logger.info('Iot Customer Portal -> google maps loaded:', loaded);
      //       initGoogleMapsUtil();
      //    }
      // });

      // const $pm = new PreferenceManager({
      //    $sm: SessionManager
      // });
      // app.use(FccTableGlobalHooksPlugin, {
      //    stateStorageInterface: $pm.tableStateInterface
      // });

      const globalLoader = reactive(new Loader());
      const greet = (name) => {
         return `Hello ${name ?? ''}`.trim();
      };

      // Define Global Props
      app.config.globalProperties.$f = Formatter;
      app.config.globalProperties.$greet = greet;
      app.config.globalProperties.$globalLoader = globalLoader;
      app.config.globalProperties.$loggerr = Logger;

      // provides
      app.provide('greet', greet);
      gc.set('greet', greet); // access outside of vue component subtree

      // TODO: abstract via dev.js plugin
      // only define these if isDevMode
      if (isDevMode) {
         app.config.globalProperties.$isDevMode = isDevMode;
      }

      const fixtureSend = getFixtureSend({
         globalLoader,
         ...fixtureOptions
      });

      // injectSessionContext({
      //    $pm,
      //    $sm: SessionManager
      // });

      // $messageUtil will be installed when HsVue is installed
      // injectMessageUtilService(app.config.globalProperties.$messageUtil);

      // init singletons, etc.
      initAjax({
         send: fixtureOptions?.on && fixtureSend ? fixtureSend : initAxios(),
         // no need for fallback if we're only using fixtures
         fallback: !fixtureOptions?.on && fixtureSend,
         globalLoader,
         getAccessToken() {
            // should be initialized via auth.js plugin
            return app.config.globalProperties.$getAccessToken?.();
         }
      });
   }
};
