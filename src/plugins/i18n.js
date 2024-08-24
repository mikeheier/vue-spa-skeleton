import { createI18n } from 'vue-i18n';
// import { injectTranslator as injectTranslatorOldProduct } from '@/composables/product';
// import { injectTranslator } from '@/composables/productnew';
// import { injectTranslator as injectTranslatorFormatter } from '@/utils/Formatter.js';
// import { injectTranslator as injectTranslatorService } from '@/services/Service.js';

import en_US from '@/locales/en_US.json';

const i18n = createI18n({
   legacy: false,
   locale: 'en_US',
   fallbackLocale: 'en_US',
   messages: {
      en_US
   }
});

export default {
   install(vue, options) {
      vue.use(i18n);
      // injectTranslatorOldProduct(i18n.global.t);
      // injectTranslator(i18n.global.t);
      // injectTranslatorFormatter(i18n.global.t);
      // injectTranslatorService(i18n.global.t);
      // console.log('<<< $t.3 >>>', i18n.global.t('common.this'));
   }
};
