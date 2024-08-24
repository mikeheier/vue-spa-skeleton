import '@/style/index.scss';
import '@/environment.js';
import { createApp } from 'vue';
import App from '@/App.vue';
import plugins from '@/plugins/_index.js';
import components from '@/components.js';

const app = createApp(App);
const options = {};

app.use(plugins, options);
app.use(components, options);

app.mount('#app');
