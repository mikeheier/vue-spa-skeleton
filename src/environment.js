import { Logger } from '@mikeheier/hs-js';

const penv = import.meta.env;
const appvar = (name, isJson) => {
   name = name.toUpperCase();
   const vueprop = `VUE_APP_${name}`;
   const viteprop = `VITE_APP_${name}`;
   let val = penv[viteprop] ?? penv[vueprop] ?? penv[name];

   if (isJson && val !== null && val !== undefined) {
      val = JSON.parse(val);
   }

   return val;
};

export const isDevMode = penv.MODE === 'development';
export const routerBase = appvar('base_url');
export const fixtureOptions = appvar('fixture_options', true);
// buildVersion passed via jenkins will be formated yyyyMMddHHmmss_<build number>, we'll replace the '_' with '.'
export const buildNumber = (appvar('buildVersion') || `${isDevMode ? 'DEV-' : 'v'}${new Date().getTime()}`).replace(/_/g, '.');

if (isDevMode) {
   Logger.setLogLevel(Logger.DEBUG);
   Logger.debug('Log Level ->', Logger.getLogLevel());
   Logger.debug('Logger ->', Logger);
   Logger.debug('BUILD NUMBER ->', buildNumber);
   Logger.debug('ROUTER BASE ->', routerBase);
}
