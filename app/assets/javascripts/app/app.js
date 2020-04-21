'use strict';

angular.module('ParkingSpaceMobile', [
    'ui.bootstrap.buttons',
    'ui.router',
    'angular.filter',
    'ParkingSpace',
    'ParkingSpaceMobile.filters',
    'ParkingSpaceMobile.controllers'])

    .run(function () {
        // install service worker
        if ('serviceWorker' in navigator) {
            // Use the window load event to keep the page load performant
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js', {scope: '/app'});
            });
        }

        window.addEventListener('beforeinstallprompt', (e) => {
            // Prevent Chrome 67 and earlier from automatically showing the prompt
            // Stash the event so it can be triggered later.
            window.installPrompt = e;
        });
    })


    .config(function () {
        window.getJsonFromUrl = function (url) {
            var result = {};
            url.split("&").forEach(function (part) {
                var item = part.split("=");
                result[item[0]] = decodeURIComponent(item[1]);
            });
            return result;
        }
    })

    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider)
    {
        $stateProvider
            .state('login', {
                url: '/login?fbLogin&lat&lng',
                views: {
                    'content': {
                        templateUrl: "templates/login.html"
                    }
                },
                params: {
                    fbLogin: null
                }
            })
            .state('register', {
                url: '/register',
                views: {
                    'content': {
                        templateUrl: "templates/register.html"
                    }
                },
                params: {
                    fromFb: false,
                    email: null,
                    firstName: null,
                    inside: null
                }
            })
            .state('confirm-phone', {
                url: '/confirm-phone',
                views: {
                    'content': {
                        templateUrl: "templates/confirm-phone.html"
                    }
                }
            })
            .state('search', {
                url: '/search?lat&lng&zoom',
                views: {
                    'content': {
                        templateUrl: "templates/search.html"
                    },
                },
                params: {
                    lat: null,
                    lng: null,
                    zoom: null
                }
            })
            .state('search.help', {
                url: '/help',
                views: {
                    'help': {
                        templateUrl: "templates/search-help.html"
                    }
                }
            })
            .state('search.instructions', {
                url: '/instructions',
                views: {
                    'help': {
                        templateUrl: "templates/search-instructions.html"
                    }
                }
            })
            .state('search.terms', {
                url: '/terms',
                views: {
                    'place-bid': {
                        templateUrl: "templates/terms.html"
                    }
                }
            })
            .state('search.post-bids', {
                url: '/post-offer?spaceId',
                views: {
                    'place-bid': {
                        templateUrl: "templates/post-offer.html"
                    }
                },
                params: {
                    spaceId: null
                }
            })
            .state('search.post-bids.pay', {
                url: '/pay',
                views: {
                    'pay': {
                        templateUrl: 'templates/pay.html'
                    }
                },
                params: {
                    offer: null,
                    space: null
                }
            })
            .state('search.review-bids', {
                url: '/review-bid?spaceId',
                views: {
                    'place-bid': {
                        templateUrl: "templates/review-offers.html"
                    }
                },
                params: {
                    spaceId: null
                }
            })
            .state('search.post', {
                url: '/post',
                views: {
                    'place-bid': {
                        templateUrl: "templates/post-space.html"
                    }
                }
            })
            .state('search.review-bids.delete', {
                url: '/delete/{parking_space_id}',
                views: {
                    'action': {
                        templateUrl: "templates/delete-post.html"
                    }
                }
            })
            .state('search.review-bids.edit', {
                url: '/edit/{parking_space_id}',
                views: {
                    'action': {
                        templateUrl: "templates/post-space.html"
                    }
                }
            })
            .state('search.myaccount', {
                url: '/myaccount',
                views: {
                    'place-bid': {
                        templateUrl: "templates/register.html"
                    }
                },
                params: {
                    inside: true
                }
            })
            .state('myposts', {
                url: '/myposts',
                views: {
                    'content': {
                        templateUrl: "templates/my-posts.html"
                    }
                }
            })
            .state('myposts.help', {
                url: '/help',
                views: {
                    'help': {
                        templateUrl: "templates/my-posts-help.html"
                    }
                }
            })
            .state('myposts.edit', {
                url: '/edit/{parking_space_id}',
                views: {
                    'edit-space': {
                        templateUrl: "templates/post-space.html"
                    }
                }
            })
            .state('myposts.delete', {
                url: '/delete/{parking_space_id}',
                views: {
                    'edit-space': {
                        templateUrl: "templates/delete-post.html"
                    }
                }
            })
            .state('myoffers', {
                url: '/myoffers',
                views: {
                    'content': {
                        templateUrl: "templates/my-offers.html"
                    },
                    'search-bar': {
                        templateUrl: "templates/search-bar.html"
                    }
                }
            })
            .state('myoffers.pay', {
                url: '/pay',
                views: {
                    'pay': {
                        templateUrl: "templates/pay.html"
                    }
                },
                params: {
                    offer: null,
                    space: null
                }
            })
            .state('account', {
                url: "/account",
                views: {
                    'content': {
                        templateUrl: "templates/account.html"
                    },
                }
            })
            .state('account.payments', {
                url: "/payments",
                views: {
                    'financial': {
                        templateUrl: "templates/payments.html"
                    }
                }
            })
            .state('account.withdrawals', {
                url: "/withdrawals",
                views: {
                    'financial': {
                        templateUrl: "templates/withdrawals.html"
                    }
                }
            });

        $urlRouterProvider.otherwise(function ($injector, $location) {
            if ($location.$$hash.indexOf("token") !== -1 && $location.$$hash.indexOf("state") !== -1) {
                let token = getJsonFromUrl($location.$$hash).access_token;
                sessionStorage.setItem("fb_token", token);
                // sucessful response from fb
                return "/login?fbLogin=ok";
            } else if ($location.absUrl().indexOf("user_denied")) {
                return "/login?fbLogin=user_denied";
            }else if ($location.absUrl().indexOf("error")) {
                return "/login?fbLogin=err";
            }

            return "/search";
        });

    }])

    .config(['$compileProvider', function ($compileProvider) {
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel):/);
    }])

    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push(function () {
            return {
                'request': function (config) {
                    let loading = $('#loading-progress');
                    loading.removeClass('loading-done');
                    loading.css('width', '100%');
                    return config;
                },
                'response': function (response) {
                    let loading = $('#loading-progress');
                    loading.addClass('loading-done');
                    setTimeout(() => {
                        loading.css('width', 0);
                    }, 500);
                    return response;
                }
            };
        });

        $httpProvider.useApplyAsync(true);
    }])

    .config(function () {
        window.isMobileOrTablet = function () {
            if (navigator.userAgent.match(/Android/i)
                || navigator.userAgent.match(/webOS/i)
                || navigator.userAgent.match(/iPhone/i)
                || navigator.userAgent.match(/iPad/i)
                || navigator.userAgent.match(/iPod/i)
                || navigator.userAgent.match(/BlackBerry/i)
                || navigator.userAgent.match(/Windows Phone/i)
            ) {
                return true;
            } else {
                return false;
            }
        };

        window.isIos = function () {
            return (
                navigator.userAgent.match(/webOS/i)
                || navigator.userAgent.match(/iPhone/i)
                || navigator.userAgent.match(/iPad/i)
                || navigator.userAgent.match(/iPod/i));
        };
    })

    .constant('currencies', [
        {
            name: 'Usd',
            label: "Usd / h",
            icon: 'fa-usd'
        },
        {
            name: 'Eur',
            label: "Eur / h",
            icon: 'fa-eur'
        },
        {
            name: 'Ron',
            label: "Ron / h",
            icon: null
        },
        {
            name: 'Rur',
            label: "Rur / h",
            icon: 'fa-rub'
        },
        {
            name: 'Gbp',
            label: "Gbp / h",
            icon: 'fa-gbp'
        },
        {
            name: 'Yen',
            label: "Yen / h",
            icon: 'fa-jpy'
        },
        {
            name: 'Inr',
            label: "Inr / h",
            icon: 'fa-inr'
        },
        {
            name: 'Ils',
            label: "Ils / h",
            icon: 'fa-ils'
        },
        {
            name: 'Try',
            label: "Try / h",
            icon: 'fa-try'
        },
        {
            name: 'Krw',
            label: "Krw / h",
            icon: 'fa-krw'
        }
    ])

;

angular.module('ParkingSpaceMobile.controllers', []);
angular.module('ParkingSpaceMobile.filters', []);

