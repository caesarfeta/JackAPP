var app = angular.module('app',[
'ngRoute',
'appCtrl',
'appUI',
'angularFileUpload',
'minicolors'
]);
var appUI = angular.module('appUI',[]);
var appCtrl = angular.module('appCtrl',[]);





app.config([
'$routeProvider',
function( $routeProvider ){
	
	$routeProvider.
	when( '/', {
		templateUrl: 'html/explore.html',
    controller: 'ExploreCtrl'
	})
	
}]);


appCtrl.controller( 'ExploreCtrl', [
'$scope',
function( $scope ){
	$scope.title = "Explorer";
}])


// Easy way to get an Angular service handle in your console...

function tserv( service ){
	return angular.element( document.body ).injector().get( service )
}

















d3.custom = {};
 
d3.custom.barChart = function module() {
    var margin = { 
					top: 20, 
					right: 20, 
					bottom: 40, 
					left: 40 
				},
        width = 500,
        height = 500,
        gap = 0,
        ease = 'cubic-in-out';

    var svg, duration = 500;
 
    var dispatch = d3.dispatch('customHover');
		
    function exports(sel) {
        sel.each( 
					function(data) {
 
            var chartW = width - margin.left - margin.right,
                chartH = height - margin.top - margin.bottom;
 
            var x1 = d3.scale.ordinal()
                .domain( data.map( function(d,i){ return i } ) )
                .rangeRoundBands( [0,chartW], .1 );
 
            var y1 = d3.scale.linear()
                .domain( [0,d3.max( data, function(d,i){ return d } )])
                .range([chartH, 0]);
 
            var xAxis = d3.svg.axis()
                .scale(x1)
                .orient('bottom');
 
            var yAxis = d3.svg.axis()
                .scale(y1)
                .orient('left');
 
            var barW = chartW / data.length;
 
            if ( ! svg ){
                svg = d3.select( this )
                    .append('svg')
                    .classed('chart', true);
                var container = svg.append('g').classed('container-group', true);
								
                container
									.append('g')
									.classed('chart-group', true);
									
                container
									.append('g')
									.classed('x-axis-group axis', true);
									
                container
									.append('g')
									.classed('y-axis-group axis' );
            }
 
            svg.transition().duration( duration ).attr({ width: width, height: height })
						
            svg.select('.container-group')
                .attr({ transform: 'translate(' + margin.left + ',' + margin.top + ')' });
 
            svg.select('.x-axis-group.axis')
                .transition()
                .duration(duration)
                .ease(ease)
                .attr({ transform: 'translate(0,' + (chartH) + ')' })
                .call(xAxis);
 
            svg.select('.y-axis-group.axis')
                .transition()
                .duration(duration)
                .ease(ease)
                .call(yAxis);
 
            var gapSize = x1.rangeBand() / 100 * gap;
            var barW = x1.rangeBand() - gapSize;
            var bars = svg.select('.chart-group')
                .selectAll('.bar')
                .data(data);
								
            bars.enter().append('rect')
                .classed('bar', true)
                .attr({
										x: chartW,
                    width: barW,
                    y: function(d,i) { return y1(d) },
                    height: function(d,i) { return chartH - y1(d) }
                })
								.on('click', function(d){
									console.log( d );
								})
                .on('mouseover', dispatch.customHover);
								
            bars.transition()
                .duration(duration)
                .ease(ease)
                .attr({
                    width: barW,
                    x: function(d,i) { return x1(i) + gapSize/2 },
                    y: function(d,i) { return y1(d) },
                    height: function(d,i) { return chartH - y1(d) }
                });
								
            bars.exit().transition().style({opacity: 0}).remove();
 					 
            duration = 500;
 
        });
    }
    exports.width = function(x) {
        if (!arguments.length) return width;
        width = parseInt(x);
        return this;
    };
    exports.height = function(x) {
        if (!arguments.length) return height;
        height = parseInt(x);
        duration = 0;
        return this;
    };
    exports.gap = function(x) {
        if (!arguments.length) return gap;
        gap = x;
        return this;
    };
    exports.ease = function(x) {
        if (!arguments.length) return ease;
        ease = x;
        return this;
    };
    d3.rebind(exports, dispatch, 'on');
    return exports;
};


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


appUI.directive('chartForm', 
function(){
	return {
		restrict: 'E',
		replace: true,
		controller: function chartFormCtrl( $scope ) {
			
			$scope.update = function( d, i ){ 
				$scope.data = randomData() 
			}
			
			function randomData(){
				return d3.range(~~(Math.random()*50)+1).map(
				function( d, i ){
					return ~~(Math.random()*1000)
				});
			}
		},
		template: '<div class="form">' +
                'Height: {{ options.height }}<br />' +
                '<input type="range" ng-model="options.height" min="100" max="800"/>' +
                '<br /><button ng-click="update()">Update Data</button>' +
                '<br />Hovered bar data: {{barValue}}</div>'
    }
});


// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs

$(document).foundation();


appUI.directive( 'imageGrid',  
function(){
	return {
		restrict: 'E',
		replace: true,
		controller: function imageGridCtrl( $scope, $http ) {
 
			$http.get( 'json/src/vortex.json' ).success(
			function( r ){
				$scope.data = r;
			});
			
		},
		templateUrl:  'ui/image-grid.ui.html'
   }
});