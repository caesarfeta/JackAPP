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