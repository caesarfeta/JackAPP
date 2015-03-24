appUI.directive( 'barChart', 
[ '$http',
function( $http ){
	return {
		restrict: 'E',
		replace: true,
		template: '<svg class="chart"></svg>',
		link: function( scope, elem, attr ) {
			
			// Build the barchart
			
			var on_click = function(){
				var tags = d3.custom.barChart.tags;
				scope.$broadcast( 'chartClick', tags );
			}
			
			function start(){
			$http.get( attr.src ).then(
				function(r){
					d3.custom.barChart.init( r.data, on_click );
				}
			)}
			start();
			
		}
	}
}]);