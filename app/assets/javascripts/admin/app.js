
// init main modules
angular.module('ParkingSpaceAdmin.controllers', []);


angular.module('ParkingSpaceAdmin', [
    'ui.router',
    'ParkingSpaceAdmin.controllers',
    'ParkingSpaceMobile.controllers',
    'ParkingSpace'])

    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('main', {url: '/'})
            .state('login', {
                url: '/login',
                views: {
                    'content': {
                        templateUrl: 'login.html'
                    }
                }
            })
            .state('sensor-fleet', {
                url: '/sensor-fleet',
                views: {
                    'content': {
                        templateUrl: 'sensor-fleet.html'
                    }
                },
                params: {
                    locationId: null
                }
            })
            .state('sensor-fleet.sensor', {
                url: '/sensor?sensorId',
                views: {
                    'detail': {
                        templateUrl: 'sensor-edit.html'
                    }
                },
                params: {
                    sensorId: null
                }
            })
            .state('locations', {
                url: '/location?locationId',
                views: {
                    'content': {
                        templateUrl: 'location.html'
                    }
                },
                params: {
                    locationId: null
                }
            })
            .state('locations.sensor', {
                url: '/sensor?sensorId',
                views: {
                    'detail': {
                        templateUrl: 'sensor-edit.html'
                    }
                },
                params: {
                    sensorId: null
                }
            })
            .state('locations.section', {
                url: '/section?sectionId',
                views: {
                    'detail': {
                        templateUrl: 'section-edit.html'
                    }
                },
                params: {
                    section: null
                }
            })
            .state('locations.section.perimeter', {
                url: '/section/perimeter',
                views: {
                    'detail': {
                        templateUrl: 'perimeter-edit.html'
                    }
                }
            })
            .state('locations.section.upload', {
                url: '/section/upload',
                views: {
                    'detail': {
                        templateUrl: 'section-upload.html'
                    }
                }
            })
            .state('users', {
                url: "/users",
                views: {
                    'content': {
                        templateUrl: 'users.html'
                    }
                },
            })
            .state('users.rights', {
                url: "/rights",
                views: {
                    'details': {
                        templateUrl: 'users-rights.html'
                    }
                }
            })
            .state('users.spaces', {
                url: "/spaces?userId",
                views: {
                    'menu': {
                        templateUrl: 'users-spaces.html'
                    }
                }
            })
            .state('users.spaces.edit', {
                url: "/edit?userId",
                views: {
                    'details': {
                        templateUrl: '../app/templates/post-space.html'
                    }
                }
            })
            .state('users.offers', {
                url: "/offers?userId",
                views: {
                    'details': {
                        templateUrl: 'users-offers.html'
                    }
                }
            })
            .state('users.accounts', {
                url: "/accounts?userId",
                views: {
                    'details': {
                        templateUrl: 'users-accounts.html'
                    }
                }
            })
            .state('users.details', {
                url: "/details?userId",
                views: {
                    'details': {
                        templateUrl: 'users-details.html'
                    }
                }
            })


        $urlRouterProvider.otherwise('/')
    }])
