appUI.directive( 'barChart', 
function(){
	var chart = d3.custom.barChart();
	return {
		restrict: 'E',
		replace: true,
		template: '<div class="chart"></div>',
		controller: function barChartCtrl( $scope, $element ) {
			
			function randomData(){
				return d3.range(~~(Math.random()*50)+1).map(
				function( d, i ){
					return ~~(Math.random()*1000)
				});
			}
			
			$scope.height = 200;
			$scope.data = randomData();
			
			console.log( $scope.data );
			
			var chartEl = d3.select( $element[0] );
			chartEl.datum( randomData ).call( chart );
			chartEl.call( chart.height( $scope.height ) );
		}
	}
})