app.config([
'$routeProvider',
function( $routeProvider ){
	
	$routeProvider.
	when( '/', {
		templateUrl: 'html/explore.html',
    controller: 'ExploreCtrl'
	})
	
}]);