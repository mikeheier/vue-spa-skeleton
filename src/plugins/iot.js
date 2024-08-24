/**
 * IOT Customer Portal Init
 *
 */
import { fixtureOptions, googleMapsCreds, isDevMode, sdmode } from '@/environment';
import { getFixtureSend } from '@/plugins/fixtures.js';
import { FccTableGlobalHooksPlugin } from '@oti/fcc-vue3';
import { GoogleMapsLib, initGoogleMapsUtil } from '@oti/fcc-vue3/google-maps';
import Loader from '@/models/Loader';
import { initAjax, Logger } from '@oti/oti-core';
import { Formatter } from '@/utils/Formatter.js';
import axios from 'axios';
import { provide, reactive } from 'vue';
import permissions from '@/constants/permissions';
import SessionManager from '@/utils/SessionManager';
import PreferenceManager from '@/utils/PreferenceManager.js';
import { injectMessageUtil as injectMessageUtilService, injectSessionContext } from '@/services/Service.js';
import { gc } from '@oti/oti-core/global-cache';

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

export default {
   install(app, options) {
      app.use(GoogleMapsLib, {
         ...googleMapsCreds,
         ready(loaded) {
            Logger.info('Iot Customer Portal -> google maps loaded:', loaded);
            initGoogleMapsUtil();
         }
      });

      const $pm = new PreferenceManager({
         $sm: SessionManager
      });
      app.use(FccTableGlobalHooksPlugin, {
         stateStorageInterface: $pm.tableStateInterface
      });

      const globalLoader = reactive(new Loader());

      // Define Global Props
      app.config.globalProperties.$pm = $pm;
      app.config.globalProperties.$sm = SessionManager;
      app.config.globalProperties.$perms = permissions;
      app.config.globalProperties.$f = Formatter;
      app.config.globalProperties.$globalLoader = globalLoader;

      // provides
      provide('preferenceManager', $pm);
      gc.set('preferenceManager', $pm); // access outside of vue component subtree

      // only define these if isDevMode
      if (isDevMode) {
         app.config.globalProperties.$isDevMode = isDevMode;
         app.config.globalProperties.$sdmode = sdmode;
      }

      const fixtureSend = getFixtureSend({
         globalLoader,
         ...fixtureOptions
      });

      injectSessionContext({
         $pm,
         $sm: SessionManager
      });

      // $messageUtil will be installed when FccVue3 is installed
      injectMessageUtilService(app.config.globalProperties.$messageUtil);

      // init singletons, etc.
      initAjax({
         send: fixtureOptions?.on && fixtureSend ? fixtureSend : initAxios(),
         // no need for fallback if we're only using fixtures
         fallback: !fixtureOptions?.on && fixtureSend,
         globalLoader,
         getAccessToken() {
            return app.config.globalProperties.$getAccessToken();
         }
      });
   }
};
