angular.module('app', ['ui.router']);


angular.module('app').config(config);

config.$inject = [
    '$stateProvider',
    '$urlRouterProvider'
]

function config($stateProvider, $urlRouterProvider) {

    /* 
     Index Page
     user can enter ip address and channel number
    */
    var indexState = {
        name: 'index',
        url: '/index?uuid&brokerHost&brokerPort&username&password&ssl',
        params: {
            uuid : {
                dynamic: false
            },
            brokerHost: {
                dynamic: false
            },
            brokerPort: {
                dynamic: false
            },
            username: {
                dynamic : false
            },
            password: {
                dynamic : false
            },
            ssl:{
                dynamic : false
            }

        },
        templateUrl: 'app/States/index/indexView.html',
        controller: 'IndexViewCtrl',
        controllerAs: 'indexView',
        resolve: {
            broker: ['$stateParams','brokerDetails', function ($stateParams,brokerDetails) {
            
                if($stateParams.uuid) brokerDetails.UUID = $stateParams.uuid;
                if($stateParams.brokerHost) brokerDetails.HOST = $stateParams.brokerHost;
                if($stateParams.brokerPort) brokerDetails.PORT = $stateParams.brokerPort;
                if($stateParams.username) brokerDetails.USERNAME = $stateParams.username;
                if($stateParams.password) brokerDetails.PASSWORD = $stateParams.password;
                if($stateParams.ssl) brokerDetails.SSL = ($stateParams.ssl.toLowerCase() == 'true');
            }]
        }
    }

    /*
     Car Control Page
     User can control the cars throttle
    */
    var carControlState = {
        name: 'carControl',
        url: '/control',
        templateUrl: 'app/States/raceState/raceStateView.html',
        controller: 'raceStateViewCtrl',
        controllerAs: 'raceStateView',
        params: {
            channel: null,
            ip_address: null
        },
        //resolve used to check if transition contains channel and ipaddress params
        resolve: {
            parameters: ['$q', '$state','$stateParams', function ($q, $state,$stateParams) {
                var deferred = $q.defer();
               
                if ($stateParams.channel === null) {
                    $state.transitionTo('index', {});
                }else{
                    deferred.resolve();
                }

                return deferred.promise;
            }]
        }
    };

    $stateProvider.state(indexState);
    $stateProvider.state(carControlState);

    $urlRouterProvider.otherwise('/index');
}

angular.module('app').run(run);
run.$inject = [
]

function run() {
    console.log('version 1.0.0 Yusof Bandar');
}
