(function(annyang) {
    'use strict';

    function AnnyangService($rootScope) {
        var service = {};
        
        // COMMANDS
        service.commands = {};

        /**
         *  annyang will capture anything after a splat (*) and pass it to the function.
         *  e.g. saying "Show me Batman and Robin" will call showFlickr('Batman and Robin');
         *
         *  service.commands['show me *term'] = function showFlickr(term) {
         *              
         *  };
         *
         *  A named variable is a one word variable, that can fit anywhere in your command.
         *  e.g. saying "calculate October stats" will call calculateStats('October');
         *
         *  service.commands['calculate :month stats'] = function calculateStats(month) {
         *              
         *  };
         *
         *  By defining a part of the following command as optional, annyang will respond
         *  to both: "say hello to my little friend" as well as "say hello friend"
         *
         *  service.commands['say hello (to my little) friend'] = function greeting() {
         *              
         *  };
         */

        // STATUS CALLBACKS
        service.status = null;

        annyang.addCallback('start', statusCallback('start'), this);
        annyang.addCallback('error', statusCallback('error'), this);
        annyang.addCallback('end', statusCallback('end'), this);
        annyang.addCallback('result', statusCallback, this);
        annyang.addCallback('resultMatch', statusCallback('resultMatch'), this);
        annyang.addCallback('resultNotMatch', statusCallback('resultNotMatch'), this);
        annyang.addCallback('errorNetwork', statusCallback('errorNetwork'), this);
        annyang.addCallback('errorPermissionBlocked', statusCallback('errorPermissionBlocked'), this);
        annyang.addCallback('errorPermissionDenied', statusCallback('errorPermissionDenied'), this);

        function statusCallback(status) {
            service.status = status;
            console.log(status);
        }

        service.addCommand = function(phrase, callback) {
            var command = {};
            command[phrase] = function(args) {
                callback(args);
                $rootScope.$apply();
            };

            angular.extend(service.commands, command);
            annyang.addCommands(service.commands);
            console.debug('added command "' + phrase + '"');
            console.log(service.commands);
        };

        service.start = function() {
            annyang.addCommands(service.commands);
            annyang.debug(true);
            annyang.start();
        };
        
        return service;
    }

    angular.module('myApp')
        .factory('AnnyangService', AnnyangService);

}(window.annyang));
