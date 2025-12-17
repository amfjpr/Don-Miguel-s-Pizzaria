/*Store the JavaScript in a file named view-data.js */

// here we have the JSON data in string format (for example)
// var data = '[{"orderID":"ORD-1001","customer":"Agenor","pizza":"Margherita","size":"Medium","price":14.99},' +
//           '{"orderID":"ORD-1002","customer":"Mike","pizza":"Pepperoni","size":"Large","price":18.50},' +
//           '{"orderID":"ORD-1003","customer":"Heloisa","pizza":"Four Cheese","size":"Small","price":12.00},' +
//           '{"orderID":"ORD-1004","customer":"John","pizza":"Hawaiian","size":"Medium","price":15.25},' +
//           '{"orderID":"ORD-1005","customer":"Francisco","pizza":"Veggie","size":"Large","price":17.75}]';

// global object that will hold the list of orders
var jsonObject = [];

var app = angular.module("viewDataApp", []);

app.controller("viewDataCtrl", function($scope, $http) {

    $scope.orders = [];
    $scope.selectedType = "ALL";

    //===========================================================
    // GET: get all records (default)
    //===========================================================
    $scope.get_records = function() {
        $http({
            method: "get",
            url: "/get-records"
        }).then(function(response) {
            if (response.data.msg === "SUCCESS") {
                jsonObject = response.data.fredData;
                $scope.orders = jsonObject;
            } else {
                alert(response.data.msg);
            }
        }, function(error) {
            alert(error);
        });
    };

    //===========================================================
    // GET: get records by type (category)
    //===========================================================
    $scope.getByType = function() {
        $http({
            method: "get",
            url: "/get-recordsByType",
            params: { type: $scope.selectedType }
        }).then(function(response) {
            if (response.data.msg === "SUCCESS") {
                jsonObject = response.data.fredData;
                $scope.orders = jsonObject;
            } else {
                alert(response.data.msg);
            }
        }, function(error) {
            alert(error);
        });
    };

    //===========================================================
    // DELETE: delete-record
    //===========================================================
    $scope.deleteRecord = function(deleteID) {
        $http({
            method: "delete",
            url: "/delete-record",
            params: { recordID: deleteID }
        }).then(function(response) {
            if (response.data.msg === "SUCCESS") {
                $scope.getByType();   // refresh current filter
            } else {
                alert(response.data.msg);
            }
        }, function(error) {
            alert(error);
        });
    };

    //===========================================================
    // PUT: update-record
    //===========================================================
    $scope.updateRecord = function(orderObj) {
        $http({
            method: "put",
            url: "/update-record",
            data: orderObj
        }).then(function(response) {
            if (response.data.msg === "SUCCESS") {
                $scope.getByType();   // refresh current filter
            } else {
                alert(response.data.msg);
            }
        }, function(error) {
            alert(error);
        });
    };

    // initial load
    $scope.get_records();
});
