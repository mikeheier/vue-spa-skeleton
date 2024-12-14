// import AuthCallBack from '@/views/_authcallback.vue';
// import NotFound from '@/views/_notFound.vue';
import AuthRoutes from '@/routes/auth.js';
import PublicRoutes from '@/routes/public.js';

export default [
   {
      // will match everything and put it under `$route.params.pathMatch`
      // see https://router.vuejs.org/guide/essentials/dynamic-matching.html#catch-all-404-not-found-route
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      // component: NotFound
      redirect: '/'
   },
   {
      path: '/',
      name: 'default',
      redirect: '/home'
   },
   // {
   //    path: '/authorization-code/callback',
   //    name: 'authcallback',
   //    component: AuthCallBack
   // },
   ...AuthRoutes.map((r) => {
      r.meta = {
         requiresAuth: true,
         ...r.meta
      };

      return r;
   }),
   ...PublicRoutes
];
