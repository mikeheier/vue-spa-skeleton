import '@hs-vue/style';
import '@/style/index.scss';
import { createApp } from 'vue';
import App from '@/App.vue';
import plugins from '@/plugins/_index.js';
import components from '@/components.js';
import { divId } from '@/environment.js';

const app = createApp(App);
const options = {};

app.use(plugins, options);
app.use(components, options);

app.mount(`#${divId}`);
