var orders = [];
var activeOrder = 0;

var app = angular.module("browseDataApp", []);

app.controller("browseDataCtrl", function($scope, $http) {
    $scope.get_records = function() {
        $http({
            method: "get",
            url: "/get-records"
        }).then(function(response) {
            if (response.data.msg === "SUCCESS") {
                orders = response.data.fredData;
                activeOrder = 0;
                $scope.obj = orders[activeOrder];
                $scope.showHide();
            }
        }, function(error) {
            alert(error);
        });
    };

    $scope.get_records();

    $scope.changeRecord = function(direction) {
        activeOrder += direction;

        if (activeOrder < 0) {
            activeOrder = 0;
        }
        if (activeOrder > orders.length - 1) {
            activeOrder = orders.length - 1;
        }

        $scope.obj = orders[activeOrder];
        $scope.showHide();
    };

    $scope.showHide = function() {
        $scope.hidePrev = (activeOrder === 0);
        $scope.hideNext = (activeOrder === orders.length - 1);
    };
});
