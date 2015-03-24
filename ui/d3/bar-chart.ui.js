appUI.directive( 'barChart', 
function(){
	return {
		restrict: 'E',
		replace: true,
		template: '<svg class="chart"></svg>',
		controller: function barChartCtrl( $scope, $element ) {
			
			function randomData(){
				return d3.range(~~(Math.random()*50)+1).map(
				function( d, i ){
					return { name: chance.word(), value: ~~(Math.random()*1000) }
				});
			}
			
			function getData(){
				console.log( 'get that data' );
			}
			
			d3.custom.barChart( randomData() );
		}
	}
})