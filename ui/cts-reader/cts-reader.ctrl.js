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