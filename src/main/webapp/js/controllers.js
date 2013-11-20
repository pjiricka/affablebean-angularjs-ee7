'use strict';

// main entry page:
function MainController($scope) {
}

// shopping department:
function DepartmentController($scope, $routeParams, Shop, Cart) {
    
    // scope init:
    $scope.products = Shop.query({departmentId: $routeParams.departmentId});
    $scope.category = $routeParams.departmentId;

    // adds the product to the cart:
    $scope.addToCart = function(product) {
        Cart.add(product);
    };
}

// shopping cart:
function CartController($scope, $location, Cart) {
    
    updateScope();

    // scope update:
    function updateScope() {
        $scope.cartContent = Cart.getProducts();
        $scope.total = Cart.getTotal();
        if (Cart.size() == 0) {
            $location.path( "/main" );
        }
    }
    
    // removes the product from the cart:
    $scope.remove = function(product) {
        Cart.remove(product);
        updateScope();
    };
    
    // empty shopping cart:
    $scope.removeAll = function() {
        Cart.removeAll();
        updateScope();
        $location.path( "/category/1" );
    };
}


// shopping cart status:
function CartStatusController($scope, Cart) {
    
    // listener on the cart content
    Cart.addListener(function() {
        updateCartContentScope();
    });
    
    updateCartContentScope();
    
    // scope update:
    function updateCartContentScope() {
        if (Cart.size() == 0) {
            $scope.content = "Your cart is empty";
        } else {
            $scope.content = Cart.size() + " items in the cart";
        }
    }
    
}

// checkout process:
function CheckoutController($scope, $location, Cart, Purchase) {
    
    // init scope:
    $scope.subtotal = Cart.getTotal();
    $scope.surcharge = 3;
    $scope.total = 3 + parseFloat(Cart.getTotal());

    // make purchase:
    $scope.submitPurchase = function(invalid) {
        if (invalid) {
            // form is not valid - show validation errors:
            $scope.showError = true;
            return;
        }
        // create new Purchase service:
        var newPurchase = new Purchase();
        // initialize it with data:
        newPurchase.name = $scope.purchase.name;
        newPurchase.email = $scope.purchase.email;
        newPurchase.phone = $scope.purchase.phone;
        newPurchase.address = $scope.purchase.address;
        newPurchase.ccNumber = $scope.purchase.cc;
        newPurchase.cart = Cart.getProducts();
        newPurchase.surCharge = 3;
        // and persist it:
        newPurchase.$save(function success(data) {
            // empty the cart:
            Cart.removeAll();
            // init scope with purchase confirmation number:
            $scope.orderId = data.orderId;
        });
        
    }

    // cancel purchase:
    $scope.cancelPurchase = function() {
        Cart.removeAll();
        $location.path( "/main" );
    }
    
    // start shopping again:
    $scope.startShoppingAgain = function() {
        $location.path( "/main" );
    }
}
