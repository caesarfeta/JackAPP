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
				$scope.$apply();
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