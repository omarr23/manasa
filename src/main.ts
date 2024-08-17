import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { Tooltip } from 'bootstrap';
import App from './App.vue';

/*
TIP: To get started with clean router change path to @/router/clean.ts.
 */
import router from './router';
import ElementPlus from 'element-plus';
import i18n from '@/core/plugins/i18n';

//imports for app initialization
import ApiService from '@/core/services/ApiService';
import { initToast } from '@/core/plugins/vue-toastification';
import { initApexCharts } from '@/core/plugins/apexcharts';
import { initInlineSvg } from '@/core/plugins/inline-svg';
import { initVeeValidate } from '@/core/plugins/vee-validate';
import { initKtIcon } from '@/core/plugins/keenthemes';
import { initAcl } from '@/core/plugins/acl';
import filters from '@/core/helpers/filters';

import '@/core/plugins/prismjs';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(ElementPlus);
app.config.globalProperties.$filters = filters;

ApiService.init(app);
initApexCharts(app);
initInlineSvg(app);
initKtIcon(app);
initVeeValidate();
initToast(app);
initAcl(app);

app.use(i18n);

app.directive('tooltip', (el) => {
    new Tooltip(el);
});

app.mount('#app');
