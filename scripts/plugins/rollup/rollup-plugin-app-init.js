import { logger } from '@mikeheier/hs-js/node-util';

export default function init(rollupBuild) {
   return {
      name: 'app-init',
      buildStart(options) {
         logger.info('AppInit::BuildStart ->', new Date());
      }
   };
};
