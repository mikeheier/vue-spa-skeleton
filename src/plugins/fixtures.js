import { isDevMode, routerBase } from '@/environment';

function getFixtureQuery() {
   const q = window?.location?.search ?? '';
   const fixtures = q.replace(/.*(?:fxtr|fixture)=([\w,]+).*/i, '$1');

   if (fixtures) {
      return fixtures.split(',').map(s => s.trim());
   }
}

export function getFixtureSend(options) {
   const ops = options ?? {};

   if (!isDevMode || (!ops.on && !ops.fallback)) {
      return false;
   }

   const globalLoader = ops.globalLoader ?? {
      start() {},
      finish() {}
   };

   return (req) => {
      // TODO - add ability to permanently add/remove fixture via url
      const responseKeys = getFixtureQuery() ?? (ops.responses?.length ? ops.responses : null) ?? ['success'];

      if (!/get/i.test(req.method)) {
         return new Promise((resolve, reject) => {
            setTimeout(() => {
               resolve({});
            }, 1369);
         });
      }

      return new Promise((resolve, reject) => {
         if (req?.fixture) {
            if (!req.isBackgroundRequest) {
               globalLoader.start();
            }

            fetch(`${routerBase}fixtures/${req.fixture}.json`.replace(/\.json\.json$/i, '.json'))
               .then(async (resp) => {
                  const json = await resp.json();
                  let data = null;

                  for (let i = 0; i < responseKeys.length; i++) {
                     const key = responseKeys[i];
                     data = json[key];

                     if (data) {
                        break;
                     }
                  }

                  setTimeout(() => {
                     if (!req.isBackgroundRequest) {
                        globalLoader.finish();
                     }

                     resolve({ data: data ?? json.success });
                  }, 369);
               })
               .catch((e) => {
                  if (!req.isBackgroundRequest) {
                     globalLoader.finish();
                  }
                  reject(new Error('fixture-dne'));
               });
         }
         else {
            reject(new Error('no-fixture'));
         }
      });
   };
}
