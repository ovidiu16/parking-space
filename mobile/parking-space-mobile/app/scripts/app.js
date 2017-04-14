'use strict';
angular.module('ParkingSpaceMobile.controllers', []);

angular.module('ParkingSpaceMobile', [
    'config', 'ui.router',
    'ParkingSpaceMobile.controllers',
    'ParkingSpaceMobile.directives',
    'ParkingSpaceMobile.filters',
    'ParkingSpaceMobile.services'])

    .run(function (ENV, $http) {


        // set fixed height:
        // 1. Keeps the screen from shrinking when keyboard open
        // 2. Viewport will scroll to the focused elm when keyboard opens and hides respective input
        $(document.body).css("height", $(document).height());



        function onDeviceReady() {
            if ( navigator.onLine ) {
                $http.get(ENV+'/parameters/1.json', {timeout: 3000}).then(function(){}, function() {
                    alert( "Cannot contact server! \nPress OK to exit");
                    navigator.app.exitApp();
                });
            } else {
                alert( "Internet connection not available! \nPress OK to exit");
                navigator.app.exitApp();
            }


            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        }

        if (!Array.prototype.find) {
           Array.prototype.find= function(predicate) {
                    var list = Object(this);
                    var length = list.length >>> 0;
                    var thisArg = arguments[1];
                    var value;

                    for (var i = 0; i < length; i++) {
                        if (i in list) {
                            value = list[i];
                            if (predicate.call(thisArg, value, i, list)) {
                                return value;
                            }
                        }
                    }
                    return undefined;
                }
        }



        document.addEventListener('deviceready', onDeviceReady, true);
    })

    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                url: '/home',
                abstract: true,
                templateUrl: 'templates/home.html'
            })
            .state('home.register', {
                url: '/register',
                views: {
                    'content': {
                        templateUrl: "templates/register.html"
                    }
                },
                params: {
                    hide_blanket: false
                }
            })
            .state('home.map', {
                url: '/map',
                views: {
                    'content': {
                        templateUrl: "templates/map.html"
                    }
                }
            })
            .state('home.map.search', {
                url: '/search/{parking_space_id}',
                views: {
                    'map-controls': {
                        templateUrl: "templates/search.html"
                    }
                }
            })
            .state('home.map.search.help', {
                url: '/help',
                views: {
                    'help': {
                        templateUrl: "templates/search-help.html"
                    }
                }
            })
            .state('home.map.search.bids', {
                url: '/place-bid',
                views: {
                    'place-bid': {
                        templateUrl: "templates/review-bids.html"
                    }
                }
            })
            .state('home.map.search.post', {
                url: '/place-bid',
                views: {
                    'place-bid': {
                        templateUrl: "templates/review-post.html"
                    }
                }
            })
            .state('home.myposts', {
                url: '/myposts',
                views: {
                    'content': {
                        templateUrl: "templates/my-posts.html"
                    },
                    'my-menu': {
                        templateUrl: "templates/my-menu.html"
                    }
                }
            })
            .state('home.myposts.help', {
                url: '/help',
                views: {
                    'help': {
                        templateUrl: "templates/my-posts-help.html"
                    }
                }
            })
            .state('home.myposts.bids', {
                url: '/bids/{parking_space_id}',
                views: {
                    'edit-space': {
                        templateUrl: "templates/review-bids.html"
                    }
                }
            })
            .state('home.myposts.bids.talk', {
                url: '/talk?offer',
                views: {
                    'messages': {
                        templateUrl: "templates/messages.html"
                    }
                }
            })
            .state('home.myposts.edit', {
                url: '/edit/{parking_space_id}',
                views: {
                    'edit-space': {
                        templateUrl: "templates/review-post.html"
                    }
                }
            })
            .state('home.myposts.delete', {
                url: '/delete/{parking_space_id}',
                views: {
                    'edit-space': {
                        templateUrl: "templates/delete-post.html"
                    }
                }
            })
            .state('home.myposts.user', {
                url: '/user/{user_id}',
                views: {
                    'edit-user': {
                        templateUrl: "templates/user.html"
                    }
                }
            })
            .state('home.myoffers', {
                url: '/myoffers',
                views: {
                    'content': {
                        templateUrl: "templates/my-offers.html"
                    },
                    'my-menu': {
                        templateUrl: "templates/my-menu.html"
                    }
                }
            })
            .state('home.help', {
                url: '/help',
                views: {
                    'help': {
                        templateUrl: "templates/my-offers-help.html"
                    }
                }
            })
            .state('home.talk', {
                url: '/talk?offer',
                views: {
                    'messages': {
                        templateUrl: "templates/messages.html"
                    }
                }
            });

        $urlRouterProvider.otherwise("/home/map/search/");

    })

    .config(function ($compileProvider) {
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel):/);
    })

    .constant('currencies', [
        {
            name: 'Usd',
            icon: 'fa-usd'
        },
        {
            name: 'Eur',
            icon: 'fa-eur'
        },
        {
            name: 'Ron',
            icon: null
        },
        {
            name: 'Rur',
            icon: 'fa-rub'
        },
        {
            name: 'Gbp',
            icon: 'fa-gbp'
        },
        {
            name: 'Yen',
            icon: 'fa-jpy'
        },
        {
            name: 'Inr',
            icon: 'fa-inr'
        },
        {
            name: 'Ils',
            icon: 'fa-ils'
        },
        {
            name: 'Try',
            icon: 'fa-try'
        },
        {
            name: 'Krw',
            icon: 'fa-krw'
        }
    ])

    .constant('uom', {
        metric: {
            name: 'meters',
            abr: 'm'
        },
        imperial: {
            name: 'feets',
            abr: 'ft'
        }
    }
);

