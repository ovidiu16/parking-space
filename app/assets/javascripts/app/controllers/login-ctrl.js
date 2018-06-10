angular.module('ParkingSpaceMobile.controllers')
    .controller('LoginCtrl', ['$rootScope', '$stateParams', '$scope', '$http', 'parameterService', 'ENV', 'userService', 'ezfb', '$state',
        function ($rootScope, $stateParams, $scope, $http, parameterService, ENV, userService, ezfb, $state) {


            $scope.login = function () {
                if (!$scope.loginForm.$valid) {
                    $('#loginForm').addClass('was-validated');
                    return;
                }

                let user = $scope.userName;
                let password = $scope.password;

                userService.login(user, password, function () {
                    $state.go('home.search', $stateParams);
                })
            };

            $scope.lat= $stateParams.lat;
            $scope.lng= $stateParams.lng;



            $scope.recoverPassword = function () {
                if (!$scope.recoverPwForm.$valid) {
                    $('#recoverPwForm').addClass('was-validated');
                    return;
                }

                $('#recoverPassword').hide();
                userService.recoverPassword($scope.recoveryEmail, function () {
                });
            };


            $scope.loginWithFb = function () {


                ezfb.login(function (loginRes) {
                    let authResponse = loginRes.authResponse;
                    if (authResponse) {

                        ezfb.api('/me?fields=email,location{location},name', function (res) {
                            // attempt to login via fb
                            userService.loginFb(authResponse.userID, authResponse.accessToken, res.email,
                                function (resp) {
                                    // user successfully logged in
                                    $state.go('home.search', $stateParams);
                                }, function (err, status) {

                                    if (status === 422) {
                                        // user does not exist
                                        // go to additional info page
                                        $state.go("home.register", {
                                            fromFb: true,
                                            email: res.email,
                                            firstName: res.name,
                                            fbId: authResponse.userID,
                                            token: loginRes.authResponse.accessToken,
                                            lat: $stateParams.lat,
                                            lng: $stateParams.lng
                                        });

                                    } else {
                                        // display error message
                                        $rootScope.$emit('http.error',
                                            'Error while logging in with facebook. Please try again.');
                                        $state.go("home.login", {
                                            fromFb: true,
                                            lat: $stateParams.lat,
                                            lng: $stateParams.lng
                                        });
                                    }
                                });
                        });

                    } else {
                        $rootScope.$emit('http.error',
                            'Error while logging into facebook. Please try again.');
                    }
                }, {scope: 'public_profile,email,user_location'})
            };

        }]);