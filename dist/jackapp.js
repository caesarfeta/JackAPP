var app = angular.module('app',[
'ngRoute',
'appCtrl',
'appUI',
'angularFileUpload',
'minicolors'
]);
var appUI = angular.module('appUI',[]);
var appCtrl = angular.module('appCtrl',[]);


app.service( 'config', [
	function(){
		return {
			"endpoint": "http://sosol.perseids.org/exist/rest/db/xq/CTS.xq?",
			"inventory": "annotsrc"
		}
	}
]);


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
function( $scope ){}])


// Easy way to get an Angular service handle in your console...

function tserv( service ){
	return angular.element( document.body ).injector().get( service )
}

















appCtrl.controller( 'ctsReaderCtrl', [
'$scope',
'$http',
'config',
function( $scope, $http, config ){
	
	
	// DOM id for jQuery hacks
	
	var id = '#cts-reader';
	
	
	// JSON data
	
	$scope.cts = {};
	$scope.cts.data = null;
	$scope.cts.total = null;
	$scope.cts.shown = null;
	
	
	// What are the selected tags?

	$scope.tags = [];
	$scope.$on( 'chartClick', function( e, tags ){
		$scope.tags = tags;
	})
	
	
	// Show the text
	
	$scope.text = function(){
		hide();
		$( id + ' .text').show();
		$( id + ' button#text').addClass( 'selected' );
	}
	
	
	// Show the list
	
	$scope.list = function(){
		hide();
		$( id + ' .list').show();
		$( id + ' button#list').addClass( 'selected' );
	}
	
	
	// Filter the list of URNs
	
	$scope.filtered_list = function(){
			
		if ( $scope.data == null ){
			return null
		}
		
		if ( $scope.tags.length == 0 ){
			return $scope.data.text;
		}
		
		var texts = $scope.data.text;
		var out = [];
		for ( var id in texts ){
			var text = texts[id];
			var tags = text.tag;
			var scps = $scope.tags;
			var matches = 0;
			for ( var i=0; i<tags.length; i++ ){
				if ( scps.indexOf(tags[i]) != -1 ){
					matches+=1;
				}
			}
			if ( matches == scps.length ){
				out.push( img );
			}
		}
		
		return out;
	}
	
	
	// Hide all the tabs
	
	function hide(){
		$( id + ' .tab').hide();
		$( id + ' button').removeClass( 'selected' );
	}
	
	
	// Get the text on the otherside of a CTS URN
	
	$scope.urn = function( urn ){
    var psg = passage([ 
      urn,
      config.endpoint, 
      config.inventory
    ]);
    
    psg.retrieve({
      success: function(){
        
        // Get the response template ready
        
        var xml = psg.getXml();
        var $xml = $( xml.getElementsByTagName('body')[0].innerHTML );
//        $scope.cts = $xml.text();
				$scope.cts.text = $(xml).text();
				$scope.$apply();
      },
      error: function( err ){ throw err }
    });
	}
	
  function passage( opt ){
    return new CTS.text.Passage( opt[0], opt[1], opt[2] )
  }
	
	
	// Get the data
	
	$http.get( 'json/data/vortex.json' ).success(
	function( r ){
		var n = 0;
		for ( var text in r.text ){
			n++;
		}
		$scope.cts.shown = $scope.cts.total = n;
		$( id + ' .loading').hide();
		$scope.list();
	});
	
}]);


appUI.directive( 'ctsReader', 
function(){
	return {
		restrict: 'E',
		replace: true,
		controller: 'ctsReaderCtrl',
		templateUrl:  'ui/cts-reader/cts-reader.ui.html'
	}
});


d3.custom = {};

// Build a d3 barchart

d3.custom.barChart = {}
d3.custom.barChart.tags = [];
d3.custom.barChart.init = function module( data, on_click ){

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
		.on( 'click', function(d){ 
			var bar = d3.select( this );
			
			// Bar is selected in UI
			
			bar.classed("selected", !bar.classed("selected"));
			
			// Add tag name to 'tags' array
			
			var tags = d3.custom.barChart.tags;
			if ( bar.classed("selected") ){
				if ( tags.indexOf( d.name ) == -1 ){
					tags.push( d.name );
				}
			}
			else {
				var index = tags.indexOf( d.name );
				if ( index != -1 ){
					tags.splice(index, 1);
				}
			}
			
			// Call custom on click handler
			
			if ( on_click != undefined ){ on_click() }
			
		})
			
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
		link: function( scope, elem, attr ){
			
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

$(document).foundation( 'tab', 'reflow' );


appUI.directive( 'imageGrid',  
function(){
	return {
		restrict: 'E',
		replace: true,
		controller: function imageGridCtrl( $scope, $http ){
 
 		 	
 		 	// Get the data
			
 		 	$scope.data = null;
			$scope.total = null;
			$scope.shown = null;
			$http.get( 'json/data/vortex.json' ).success(
			function( r ){
				$scope.data = r;
				var n = 0;
				for ( var img in $scope.data.img ){
					n++;
				}
				$scope.shown = $scope.total = n;
			});
			
			
			// What are the selected tags?
	
			$scope.tags = [];
			$scope.$on( 'chartClick', function( e, tags ){
				$scope.tags = tags;
				$scope.$apply();
			})
			
			
			// Return filtered images
			
			$scope.imgs = function(){
				
				if ( $scope.data == null ){
					return null
				}
				
				if ( $scope.tags.length == 0 ){
					$scope.shown = $scope.total;
					return $scope.data.img;
				}
				
				var imgs = $scope.data.img;
				var out = [];
				for ( var id in imgs ){
					var img = imgs[id];
					var tags = img.tag;
					var scps = $scope.tags;
					var matches = 0;
					for ( var i=0; i<tags.length; i++ ){
						if ( scps.indexOf(tags[i]) != -1 ){
							matches+=1;
						}
					}
					if ( matches == scps.length ){
						out.push( img );
					}
				}
				
				$scope.shown = out.length;
				return out;
			}
			
		},
		templateUrl:  'ui/image-grid.ui.html'
   }
});


appUI.directive( 'resize', 
function( $window ){
return function( scope, element, attr ){
	
	var w = angular.element( $window );
	
	scope.$watch( function(){
		return {
		    'h': w.height()
		};
	}, 
	
	function (nv, ov) {
		scope.windowHeight = nv.h;
		scope.windowWidth = nv.w;
		scope.resizeOffset = function ( height ) {
		    return { 
					'height': (nv.h - height) + 'px'
		    };
		};
	}, true);
 
	w.bind('resize', function () {
	    scope.$apply();
	});
	
}}); 


appUI.directive( 'reveal', 
function(){
	return {
		restrict: 'E',
		link: function( scope, elem, attr ){
			
			// Add reveal modal window to the DOM
			
			var id = 'reveal-img';
			if ( ! $( '#'+id ).length ){
				$( 'body' ).append( '<div id="'+id+'" class="reveal-modal" data-reveal><img id="loader" src="img/loader.gif" /></div>' );
			}
			
			// When reveal link is clicked update the img src and show
			
			$( elem ).on( 'touchstart click', function(){
				
				// Add the img content container
				
				if ( ! $( '#'+id+' img#content' ).length ){
					$( '#'+id ).append( '<img id="content" />' );
				}
				
				// Show the loader gif until content img is loaded
				
				$( '#'+id+' #loader' ).show();
				$( '#'+id+' img#content' ).load( function(){
					$( '#'+id+' #loader' ).hide();
				});
				$( '#'+id+' img#content' ).attr( 'src', attr.img );
				
				// Open the modal window
				
				$( '#'+id ).foundation( 'reveal', 'open' );
			});
			
		}
	}
});