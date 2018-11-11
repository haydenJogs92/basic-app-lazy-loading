

//Not Found Page
import { NotFoundComponent } from '../modules/shared/not-found/not-found.component';

//resolvers
import{ UserDetailsResolve } from '../modules/core/resolvers/user-details.resolve';
import{ OrderHistoryResolve } from '../modules/core/resolvers/order-history.resolve';
import { OrderProductsListResolve } from '../modules/core/resolvers/order-products-list.resolve';
import { OrderConfirmationResolve } from '../modules/core/resolvers/order-confirmation.resolve';

//authguard
import { AuthGuard } from '../modules/core/services/auth-guard-service';

export const routes = [
  {path: '',  loadChildren: '../modules/home/home.module#HomeModule' },
  {path: 'login',  loadChildren: '../modules/login/login.module#LoginModule' },
  {
    path: 'user/:id',
    loadChildren: '../modules/user-details/user-details.module#UserDetailsModule',
    canActivate: [AuthGuard],
    resolve: { userDetails: UserDetailsResolve },
  },
  {
   path: 'user/:id/update-info',
   loadChildren: '../modules/update-details/update-details.module#UpdateDetailsModule',
   canActivate: [AuthGuard],
   resolve: { userDetails: UserDetailsResolve },
  },
  {path: 'user/:id/make-order',
   loadChildren: '../modules/make-order/make-order.module#MakeOrderModule',
   canActivate: [AuthGuard],
   resolve: { productList: OrderProductsListResolve },
  },
  {
   path: 'user/:id/order-history',
   loadChildren: '../modules/order-history/order-history.module#OrderHistoryModule',
   canActivate: [AuthGuard],
   resolve: { orderHistory: OrderHistoryResolve },
  },
  {
   path: 'user/:id/confirmation/:orderID',
   loadChildren: '../modules/order-confirmation/order-confirmation.module#OrderConfirmationModule',
   canActivate: [AuthGuard],
   resolve: { orderDetails: OrderConfirmationResolve },
  },
  //404 page
  {path: '**',  component: NotFoundComponent },
   
];
