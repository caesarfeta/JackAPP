var appControl = angular.module('appControl',[]);


// Easy way to get an Angular service handle in your console...

function tserv( service ){
	return angular.element( document.body ).injector().get( service )
}











// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs

$(document).foundation();


var appUI = angular.module('appUI',[]);


var app = angular.module('app',[
	'ngRoute',
	'appControl',
	'appUI',
	'angularFileUpload',
	'minicolors'
]);