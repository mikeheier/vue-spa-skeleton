import { createRouter, createWebHistory } from 'vue-router';
import middleware from '@/middleware/_index.js';
import routes from '@/routes/_index.js';
// import { initRouteUtil } from '@oti/fcc-vue3/util/routeutil';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default {
  install(app, options) {
    app.use(router);

    // initRouteUtil({ router });

    // register each middleware with the router
    middleware(app, options)
      .forEach((handler) => {
        router.beforeEach(handler);
      });
  }
};
