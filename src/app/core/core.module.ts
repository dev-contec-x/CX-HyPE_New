import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';

import { MonitorInterceptor } from '@core/interceptors/monitor.interceptor';

import { CoreRoutingModule } from '@core/core-routing.module';

import { EnsureModuleLoadedOnceGuard } from '@core/guards/singleton-module.base';

import { SharedModule } from '@shared/shared.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CoreRoutingModule,
    SharedModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MonitorInterceptor,
      multi: true
    }
  ]
})
export class CoreModule extends EnsureModuleLoadedOnceGuard {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    super(parentModule);
  }
}
