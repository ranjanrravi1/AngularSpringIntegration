var userApp = angular.module("myApp", [ 'ngRoute', 'ngResource' ]);

userApp.config(function($routeProvider) {
	
	$routeProvider.when('/addProduct', {
		controller : 'newProductCntrl',
		templateUrl : 'pages/newProducts.html'
	}).when('/product/list', {
		controller : 'productListCntrl',
		templateUrl : 'pages/viewProducts.html'
	}).when('/product/:pId', {
		controller : 'productByIdCntrl',
		templateUrl : 'pages/viewProductDetails.html'
	}).otherwise({
		controller : 'homeController',
		templateUrl : 'pages/home.html'
	});
	
});

userApp.factory( 'userservice', [ '$resource', function( $resource ){
	return new Product( $resource );
}] );
 
function Product( resource ) {
 
	this.resource = resource; 
 
	this.addProduct = function ( product, scope ) {
		// 
		// Save Action Method
		//
		var Product = resource('addProduct');		
		Product.save(product, function(response){
			scope.message = response.message;
//			alert("message"+scope.message);
			
		});
//		alert("product "+product);
//		scope.message = "New product added.";
	};
 
	this.getProduct = function (id, scope){
		//
		// GET Action Method
		//
		var Product = resource('product/:pId', {pId:'@pId'});
		Product.get({pId:id},function(product){
			scope.product = product;
		});
//		alert("id "+id);
		/*scope.products = [ {
			'id':1,
			'name' : 'TCS Mastercraft',
			'owner' : 'TCS',
			'price' : '1000'
		}, {
			'id':2,
			'name' : 'Websphere',
			'owner' : 'IBM',
			'price' : '2000'
		},{
			'id':3,
			'name':'Weblogic',
			'owner' : 'Oracle',
			'price' : '1500'
		}];
		
		scope.product = scope.products[id-1];*/
	};
	
	this.getProducts = function( scope ) {
		//
		// Query Action Method
		//
		var Products = resource('product/list');
		Products.query(function(products){
			scope.products = products;
		});
		/*scope.products = [ {
			'id':1,
			'name' : 'TCS Mastercraft',
			'owner' : 'TCS',
			'price' : '1000'
		}, {
			'id':2,
			'name' : 'Websphere',
			'owner' : 'IBM',
			'price' : '2000'
		},{
			'id':3,
			'name':'Weblogic',
			'owner' : 'Oracle',
			'price' : '1500'
		}];*/
	};
};