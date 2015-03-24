appUI.directive( 'barChart', 
[ '$http',
function( $http ){
	return {
		restrict: 'E',
		replace: true,
		template: '<svg class="chart"></svg>',
		link: function( scope, elem, attr ) {
			
			function start(){
			$http.get( attr.src ).then(
				function(r){
					d3.custom.barChart( r.data );
				}
			)}
			
			start();
			
		}
	}
}]);