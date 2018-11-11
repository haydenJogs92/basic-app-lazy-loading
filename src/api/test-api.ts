
import { Http, BaseRequestOptions, Response, ResponseType, ResponseOptions, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { UserData, UserOrderHistory, Order, Product } from '../models/models';

/*
For Testing
When running tests we can tell angular to use this factory function to handle request

In this case, we just want to implement User Authentication
If user creds match, provide a Http Response with a JWT token
*/

class MockError extends Response implements Error {
    name:any
    message:any
}


export function testApiFactory( backend: MockBackend, options: BaseRequestOptions)
{


  //user Jason Web Token - created on server
  let token:string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlRlc3QgVXNlciIsInVzZXJJRCI6MzI0MjMxfQ.RbMopua15CoY_i6-5Azmb7tf8RXsXoNmCIAAlVperxs';

  //create dummy order history
  let order1: Order = <Order>{orderID: 1223, orderName:'Product One', orderValue:120, orderUnitPrice:120, orderQuantity: 1, foreignKeyUserID: 324231, orderDate: '02/23/2017'  };
  let order2: Order = <Order>{orderID: 1323, orderName:'Widget Three', orderValue:80, orderUnitPrice:40, orderQuantity: 2, foreignKeyUserID: 324231, orderDate: '07/5/2016'  };
  let order3: Order = <Order>{orderID: 5293, orderName:'Another Kind of Product', orderValue:250, orderUnitPrice:250,  orderQuantity: 1, foreignKeyUserID: 324231, orderDate: '06/4/2016'  };
  let order4: Order = <Order>{orderID: 32339, orderName:'First purchase', orderValue:20, orderUnitPrice:20, orderQuantity: 1, foreignKeyUserID: 324231, orderDate: '06/3/2015'  };
  let userOrderHistory: UserOrderHistory = {orders: [ order1, order2, order3, order4 ]};


  let userData: UserData = {
      userID: 324231,
      nameFirst: 'Test',
      nameLast:'User',
      email:'test@test.com',
      phone: '8883334444' };

  //listen for http requests
  backend.connections.subscribe(( connection: MockConnection ) => {

    //simulate server response of two seconds
    setTimeout(() => {


      let connectionUrl = connection.request.url;
      if ( connection.request.method === RequestMethod.Post )
      {
        switch ( connectionUrl )
        {


          //match for login api request
          case '/api/user-login':
            //get request body
            let body = JSON.parse( connection.request.getBody() );
              //if creds match, mock a response
              if (body.email === 'test@test.com' && body.password === 'test')
              {
                //example JWT Token, this would be generated on server
                //you can view the content of this token here: https://jwt.io/
                //just get user ID for now
                connection.mockRespond(new Response(
                  new ResponseOptions({
                    status: 200,
                    //pass down the token, as well as any non-token user info email, ect.
                    body: { jwtToken: token, data: userData.userID }
                  })));
              }
              else
              {                
                connection.mockRespond(new Response(
                  new ResponseOptions({
                    status: 200,
                    body: { error: 'InvalidLogin', message: 'We were unable to find an account matching those credentials.' }
                  })));
              }
          break;





          //match for user get details request
          case '/api/user-details':
            //if headers have jwt token
            if (connection.request.headers.get('Authorization') === 'Bearer ' + token) {
                //get the user's current data
                let body = JSON.parse( connection.request.getBody() );
                //return token and user data
                connection.mockRespond(new Response(
                    new ResponseOptions({ status: 200, body: { jwtToken: token, data: userData } })
                ));
            } else {
                connection.mockRespond(new Response(
                    new ResponseOptions({ status: 401 })
                ));
            }
          break;





          case '/api/user-update':
            //if headers have jwt token
            if (connection.request.headers.get('Authorization') === 'Bearer ' + token) {
              //update the user data
                let body = JSON.parse( connection.request.getBody() );
                //update the user data
                userData = <UserData>{
                    nameFirst: body.sFirstName,
                    userID: 324231,
                    nameLast: body.sLastName,
                    email: body.sEmail,
                    phone: body.sPhone };
                //return token and user data
                connection.mockRespond(new Response(
                    new ResponseOptions({ status: 200, body: { jwtToken: token, data: userData } })
                ));
            } else {
                connection.mockRespond(new Response(
                    new ResponseOptions({ status: 401 })
                ));
            }

          break;


          //match for user get order history  api request
          case '/api/user-order-history':
            //if headers have jwt token
            if (connection.request.headers.get('Authorization') === 'Bearer ' + token) {
              //update the user data
                let body = JSON.parse( connection.request.getBody() );

                //return token and user order history
                connection.mockRespond(new Response(
                    new ResponseOptions({ status: 200, body: { jwtToken: token, data: userOrderHistory } })
                ));
            } else {
                connection.mockRespond(new Response(
                    new ResponseOptions({ status: 401 })
                ));
            }
          break;




          //get all available products
          case '/api/get-products':
            //if headers have jwt token
            if (connection.request.headers.get('Authorization') === 'Bearer ' + token) {

              let prod1: Product =  {productID: 1223, productName:'Widget 1', productPrice:120};
              let prod2: Product =  {productID: 4233, productName:'Widget 2', productPrice:70};
              let prod3: Product =  {productID: 12333, productName:'Cool New Product', productPrice:20};
              let prod4: Product =  {productID: 2233, productName:'Widget 3', productPrice:50};

              let products = [ prod1, prod2, prod3, prod4,];
                //return token and available products
                connection.mockRespond(new Response(
                    new ResponseOptions({ status: 200, body: { jwtToken: token, data: products } })
                ));
            } else {
                connection.mockRespond(new Response(
                    new ResponseOptions({ status: 401 })
                ));
            }
          break;






          //place order
          case '/api/submit-order':
          //if headers have jwt token
          if (connection.request.headers.get('Authorization') === 'Bearer ' + token) {

              let body = JSON.parse( connection.request.getBody() );

              //set transaction date
              var today = new Date();
              var dd = today.getDate();
              var mm = today.getMonth()+1; //January is 0!
              var yyyy = today.getFullYear();

              var sToday = mm+'/'+dd+'/'+yyyy;
              body.orderDate = sToday;
              body.foreignKeyUserID = 1;
              body.orderID = Math.floor( Math.random() * 90000 ) + 10000;

              //complete order and add to history
              userOrderHistory.orders.unshift( body );

              //return token and available products
              connection.mockRespond(new Response(
                  new ResponseOptions({ status: 200, body: { jwtToken: token, data: body } })
              ));
          } else {
              connection.mockRespond(new Response(
                  new ResponseOptions({ status: 401 })
              ));
          }


          break;



          //get info for order confirmation page
          case '/api/order-confirmation':
            //if headers have jwt token
            if (connection.request.headers.get('Authorization') === 'Bearer ' + token) {

                let iOrderNumber = parseInt( JSON.parse( connection.request.getBody() ).orderID );
                let oReturn = null;
                //get order from user order history
                for ( let order of userOrderHistory.orders )
                {
                    if ( order.orderID === iOrderNumber )
                    {
                      oReturn = order;
                    }
                }
                //return token and available products
                connection.mockRespond(new Response(
                    new ResponseOptions({ status: 200, body: { jwtToken: token, data: oReturn } })
                ));
            } else {
                connection.mockRespond(new Response(
                    new ResponseOptions({ status: 401 })
                ));
            }

          break;

          //how to mock error
          //https://stackoverflow.com/questions/35436261/how-to-mock-http-error-for-angular2-testing#answer-39863549
          default:
          let opts = {type:ResponseType.Error, status:404, body: ''};
          let responseOpts = new ResponseOptions(opts);
          connection.mockError(new MockError(responseOpts));




        }
      }









    }, 500)
  });

  //return an Http Object with Response
  return new Http(backend, options);
}


//wehenever injecting http, use this factory function to handle that request
export let testApiProvider = {
    provide: Http,
    useFactory: testApiFactory,
    deps: [MockBackend, BaseRequestOptions]
};
