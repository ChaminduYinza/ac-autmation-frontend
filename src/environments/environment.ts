// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  light_measure_max: 100,
  light_measure_min: 0,
  rows: 9,
  columns: 4,
  channelValues: [10, 12],
  tableRefreshTimeInMilliseconds: 5000,
  socketUrl: 'http://localhost:3000',
  api_url: 'http://192.168.1.28:3000/'
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
