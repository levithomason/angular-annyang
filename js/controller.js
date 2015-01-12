(function(angular) {
    'use strict';

    function MyController(AnnyangService, $scope) {
        var vm = this;

        vm.init = function() {
            vm.clearResults();

            AnnyangService.addCommand('*allSpeech', function(allSpeech) {
                console.debug(allSpeech);
                vm.addResult(allSpeech);
            });
            
            AnnyangService.start();
        };
        
        vm.addResult = function(result) {
            vm.results.push({
                content: result,
                date: new Date()
            });
        };
        
        vm.clearResults = function() {
            vm.results = [];
        };

        vm.init();
    }

    angular.module('myApp')
        .controller('MyController', MyController);

}(window.angular));
