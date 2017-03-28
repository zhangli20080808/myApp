//路由模块
angular.module('guidePage.route', ['guidePage.controller','guidePage.services'])

    .config(function($stateProvider, $urlRouterProvider) {

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider

        // setup an abstract state for t he tabs directive
        //单独一个路由,我们就这样写
            .state('guidePage', {
                url: '/guidePage',
                templateUrl: 'areas/guidePage/guidePage.html',
                controller: 'GuidePageCtrl'
            })
    });


//路由的定义:  1.通过angular.module.config去定义一个路由模块  2.引入两个服务
