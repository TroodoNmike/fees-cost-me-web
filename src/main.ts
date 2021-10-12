import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import * as Sentry from '@sentry/angular';
import { Integrations } from '@sentry/tracing';

if (environment.production) {
    enableProdMode();
}
Sentry.init({
    dsn: 'https://6ce3b6f3fe0b46c5bf927ccfca9e4740@o1033932.ingest.sentry.io/6000573',
    integrations: [
        new Integrations.BrowserTracing({
            // @todo add correct origin
            tracingOrigins: ['localhost', 'https://yourserver.io/api'],
            routingInstrumentation: Sentry.routingInstrumentation,
        }),
    ],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
});

platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch((err) => console.error(err));
