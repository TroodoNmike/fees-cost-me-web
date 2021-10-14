// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { EnvironmentInterface } from '../app/interfaces/environment.interface';

export const environment: EnvironmentInterface = {
    production: false,
    gTag: 'G-06TQW1X0QH',
    sentryDsn:
        'https://6ce3b6f3fe0b46c5bf927ccfca9e4740@o1033932.ingest.sentry.io/6000573',
    apiHost: 'http://localhost:3000',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
