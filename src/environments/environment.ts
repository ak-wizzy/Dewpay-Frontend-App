// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {

  production: false,
  baseUrl: 'https://biller-api-dev.eks-chakral.com',
  accountBaseApi: 'https://account-api-dev.eks-chakral.com',
  merchantId: '1011',
  encryptionKey: '1234567890091881abcdefghijklmhsnhehapieiooiwxj',
  clientKey: 'CHKTDP22072281191900'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
