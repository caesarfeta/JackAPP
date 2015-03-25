app.directive( 'resize', 
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