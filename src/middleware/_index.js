/**
 * Register middleware modules here
 *
 */

// import auth from '@/middleware/auth.js';
import route from '@/middleware/route.js';

export default function (app, options) {
   // order matters as any handler can break the chain.
   return [
      // auth(app, options),
      route(app, options)
   ];
}
