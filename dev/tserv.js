// Easy way to get an Angular service handle in your console...

function tserv( service ){
	return angular.element( document.body ).injector().get( service )
}