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
d3.custom.barChart = function module( data ){

	var margin = {
			top: 20, 
			right: 30, 
			bottom: 40, 
			left: 120
	};
	
	var width = 500 - margin.left - margin.right;
	var height = 500 - margin.top - margin.bottom;

	var y = d3.scale.ordinal()
	    .domain( data.map(
				function(d){ return d.name }
			))
	    .rangeRoundBands( [0,height], .25 );

	var x = d3.scale.linear()
	    .domain( [0, d3.max( data, 
				function(d) { return d.value }
			)])
	    .range( [width, 0] );

	var xAxis = d3.svg.axis()
	    .scale( x )
	    .orient('bottom');

	var yAxis = d3.svg.axis()
	    .scale( y )
	    .orient('left');

	var chart = d3.select('.chart')
	    .attr('width', width + margin.left + margin.right)
	    .attr('height', height + margin.top + margin.bottom)
	  	.append('g')
	    	.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

	// Add data
				
	var barHeight = y.rangeBand();
	
	var bar = chart.selectAll('.bar')
		.data( data )
		.enter().append('g');
				
		bar.append('rect')
			.attr('class', 'bar')
			.attr('x', function(d) { return 0 })
			.attr('y', function(d) { return y( d.name ) })
			.attr('width', function(d) { return width - x( d.value ) })
			.attr('height', barHeight )
				
		bar.append('text')
			.attr('x', function(d){ return ( width - x(d.value) ) + 3 })
			.attr('y', function(d){ return ( y( d.name ) + barHeight ) - 2 })
			.text( function(d){ return d.value })
			.attr( 'class', 'value' );

	// y axis and label
	
	chart.append('g')
	    .attr('class', 'y axis')
	    .call( yAxis )
	  	.append('text')
	    	.attr('transform', 'rotate(-90)')
	    	.attr('x', -height/2 )
	    	.attr('y', -margin.bottom )
	    	.attr('dy', '.71em')
		.style('text-anchor', 'end');
};


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
 
			$http.get( 'json/data/vortex.json' ).success(
			function( r ){
				$scope.data = r;
			});
			
		},
		templateUrl:  'ui/image-grid.ui.html'
   }
});