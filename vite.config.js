import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import { defineConfig as defineAppConfig } from './app.config.js';
import { dumpEnvVars, logger, yankArgs } from '@mikeheier/hs-js/node-util';
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import eslint from 'vite-plugin-eslint';
import appInit from './scripts/plugins/rollup/rollup-plugin-app-init.js';
import mkcert from 'vite-plugin-mkcert';
import autoprefixer from 'autoprefixer';
import postcssDiscardComments from 'postcss-discard-comments'

// ---outputDir:manualDist
const cargs = yankArgs();
const appConfig = defineAppConfig(cargs);

logger.info('NODE_ENV:', process.env.NODE_ENV);
logger.info('Vite Environment Variables');
dumpEnvVars(/^vite_/i);
logger.info('Application Config\n', appConfig);

const isDevMode = /development/i.test(process.env.NODE_ENV);
const plugins = [
   appInit(),
   vue(),
   vueDevTools(),
   eslint()
];

if (isDevMode) {
   logger.info('DEVELOPMENT');

   if (appConfig?.server?.https) {
      plugins.unshift(mkcert());
   }
}
else {
   logger.info('PRODUCTION');
}

// https://vitejs.dev/config/
export default defineConfig({
   server: appConfig.server,
   base: cargs?.routerBase ?? appConfig.routerBase,
   // transpileDependencies: true,
   plugins,
   build: {
      outDir: cargs?.outputDir || 'dist',
   },
   // for development related variables, see iot.config.js
   // does not seem to work...
   // define: {
   //    VITE_APP_BUILDVERSION: `'${ cargs?.buildVersion ?? '' }'`
   // },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
   css: {
      preprocessorOptions: {
         scss: {
            // prevents sass waring "Deprecation Warning: The selector "+ .oti-ui-c-compare-table__thead__th__th" is invalid CSS." from preventing app from running 
            quietDeps: true,
            /**
             * Do not add core scss file here.  This will cause
             * multiple injections of css.  One per SFC style definition. This
             * will cause unwanted overrides of custom styles in SFC's.
             * Instead, we'll import the core css via component-lib.js and
             * main.js for the core explorer styles
             */
            additionalData: `
            `
         }
      },
      postcss: {
         sourceMap: true,
         plugins: [
            autoprefixer({ grid: true }),
            postcssDiscardComments()
         ]
      }
   }
})
