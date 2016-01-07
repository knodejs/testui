var app = angular.module('app', ['ui.router', 'ui.bootstrap']);

app.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('app/main');
        $stateProvider
            .state('app', {
                url: '/app',
                templateUrl: '/views/app.html'
            })
            .state('app.main', {
                url: '/main',
                templateUrl: '/views/main.html',
                controller: 'MainCtrl'
            })
            .state('app.main.dialog', {
                url: '/dialog',
                onExit: ['modalInstance', function(modalInstance) {
                    try {
                        modalInstance.dismiss();
                    } catch (e) {}
                }],
                resolve: {
                    modalInstance: [
                        '$state', '$uibModal',
                        function($state, $uibModal) {
                            var modalInstance = $uibModal.open({
                                templateUrl: '/views/dialog.html',
                                controller: 'DialogCtrl',
                                backdrop: 'static',
                                windowClass: 'modal-dialog-1',
                                size: 'lg',
                                resolve: {
                                    items: function() {
                                        return [1, 2, 3];
                                    }
                                }
                            });
                            modalInstance.result.then(
                                function(reason) {
                                    console.log("has action", reason);
                                    $state.go('^');
                                },
                                function() {
                                    console.log("no action");
                                    $state.go('^');
                                }
                            );
                            return modalInstance;
                        }
                    ]
                }
            })
    }
]);


app.controller('MainCtrl', ['$scope', function($scope) {
    console.log("init parent");
}]);



app.controller('DialogCtrl', ['$scope', '$uibModalInstance', 'items', function($scope, $uibModalInstance, items) {
    console.log("init dialog");
    $scope.items = items;
    $scope.selected = {
        item: $scope.items[0]
    };

    $scope.ok = function() {
        console.log("dialog selected ", $scope.selected.item);
        $uibModalInstance.close($scope.selected.item);
    };

    $scope.cancel = function() {
        console.log("cancel dialog");
        $uibModalInstance.dismiss('cancel');
    };
}]);
