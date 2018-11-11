/*
Stated goal - this module will have all services and route resolvers in the app 
it will also configure global error handling
and set up our fake backend
https://blog.realworldfullstack.io/real-world-angular-part-7-lazy-coding-load-splitting-4552f5f54ef7
//https://alligator.io/angular/providers-shared-modules/
*/
import { NgModule, ModuleWithProviders, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule, BaseRequestOptions, Http } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { testApiProvider } from '../../api/test-api';

//services
import { UserService } from './services/user-service';
import { OrderService } from './services/order-service';
import { ValidationService } from './services/validation-service';
import { AuthGuard } from './services/auth-guard-service';

//resolvers
import { UserDetailsResolve } from './resolvers/user-details.resolve'
import { OrderHistoryResolve } from './resolvers/order-history.resolve'
import { OrderProductsListResolve } from './resolvers/order-products-list.resolve'
import { OrderConfirmationResolve } from './resolvers/order-confirmation.resolve';

//global error handler
import { AppErrorHandler } from './services/app-error-handler';


//Auth Http JWT
import { AuthHttp, AUTH_PROVIDERS, provideAuth, AuthConfig } from 'angular2-jwt/angular2-jwt';
export function getAuthHttp(http) {
  return new AuthHttp(new AuthConfig({
    tokenName: 'token'
  }), http);
}


@NgModule({
  declarations: [],
  imports:[ CommonModule, HttpModule],
  exports: []
})
export class CoreModule
{
  static forRoot(): ModuleWithProviders
  {
    return {
      ngModule: CoreModule,
      providers: [
        UserService,
        OrderService,
        ValidationService,
        AuthGuard,
        UserDetailsResolve,
        OrderHistoryResolve,
        OrderConfirmationResolve,
        OrderProductsListResolve,

        //auth http
        AuthHttp,
        {
          provide: AuthHttp,
          useFactory: getAuthHttp,
          deps: [Http]
        },

        //custom error handler
        AppErrorHandler,
        {
          provide: ErrorHandler,
          useClass: AppErrorHandler
        },

        //fake backend
        testApiProvider,
        MockBackend,
        BaseRequestOptions
        ]};
  }
}
