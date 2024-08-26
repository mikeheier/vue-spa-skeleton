import fs from 'node:fs';
const devEnvJsonFile = './dev-env.json';

const prodConfig = {
   routerBase: '/vue-spa-skeleton/',
   server: null
};

/**
 * DO NOT CHANGE values here. All changes should be done in the dev-env.json.
 * If you do not have a dev-env.json, execute "npm run dev"
 * These are the default development settings.
 */
const defaultDevConfig = {
   routerBase: prodConfig.routerBase,
   server: {
      host: 'localhost',
      port: 6300
   },
   fixtures: {
      on: false,

      // if a call fails because it does not exist, etc., then a fixture response will be used.
      // applies only if fixtures is off and running in dev mode
      fallback: true,

      // an array of fixture responses to use.  e.g. ['success', 'failure']
      // order matters.  the fixtures functionality will walk down the array
      // until it finds the response in a fixture
      responses: []
   }
};

function getDevConfig() {
   const devEnvJsonExists = fs.existsSync(devEnvJsonFile, 'utf8');

   if (!devEnvJsonExists) {
      fs.writeFileSync(devEnvJsonFile, JSON.stringify(defaultDevConfig, null, 3), { encoding: 'utf8' });
   }

   const devEnvJson = JSON.parse(fs.readFileSync(devEnvJsonFile, 'utf8'));

   return {
      ...defaultDevConfig,
      ...devEnvJson
   };
}

function addEnvVar(name, val) {
   name = name.toUpperCase();

   if (typeof val === 'object') {
      val = JSON.stringify(val);
   }

   if (val !== null && val !== undefined) {
      process.env[`VUE_APP_${name}`] = val;
      process.env[`VITE_APP_${name}`] = val;
   }
}

export function defineConfig(options) {
   const env = process.env;
   const isDev = env.NODE_ENV === 'development' || options?.isPreview;

   let config = prodConfig;

   if (isDev) {
      config = {
         ...prodConfig,
         ...getDevConfig()
      };
   }

   addEnvVar('div_id', options?.appDivId ?? 'app');
   addEnvVar('title', options?.appTitle ?? 'vue-spa-skeleton');
   addEnvVar('buildVersion', options?.buildVersion);

   if (isDev) {
      addEnvVar('fixture_options', config.fixtures);
   }

   return config;
}

export default {
   defineConfig
};
