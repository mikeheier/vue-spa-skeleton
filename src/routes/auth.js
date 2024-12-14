export default [
   {
      path: '/dashboard',
      name: 'dashboard',
      // route level code-splitting
      // this generates a separate chunk (HomeView.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/DashboardView.vue')
   }
];
