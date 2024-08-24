// import $lu from '@/utils/LookupUtil.js';

export default function (app, options) {
   // return async (to, from) => {
   //    if (/order|return/i.test(to?.fullPath)) {
   //       // these take some time... moving to the actual components that require them...
   //       await $lu.loadLookUps(['inventoryLocations', 'products']);
   //    }

   //    return true;
   // }

   return (to, from, next) => {
      next();
   };
}
