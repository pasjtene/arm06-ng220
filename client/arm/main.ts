import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ArmModule } from './arm.module';

const platform = platformBrowserDynamic();
platform.bootstrapModule(ArmModule);
