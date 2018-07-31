import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';
import { enableProdMode } from '../../node_modules/@angular/core';

enableProdMode();
platformBrowserDynamic().bootstrapModule(AppModule);



