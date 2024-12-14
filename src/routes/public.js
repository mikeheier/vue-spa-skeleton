export default [
   {
      path: '/home',
      name: 'home',
      // route level code-splitting
      // this generates a separate chunk (LoggedOutView.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/public/HomeView.vue')
   },
   {
      path: '/login',
      name: 'login',
      component: () => import('@/views/public/LoginView.vue')
   }
];
