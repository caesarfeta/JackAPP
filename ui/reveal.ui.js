appUI.directive( 'reveal', 
function(){
	return {
		restrict: 'E',
		link: function( scope, elem, attr ){
			
			// Add reveal modal window to the DOM
			
			var id = 'reveal-img';
			if ( ! $( '#'+id ).length ){
				$( 'body' ).append( '<div id="' + id + '" class="reveal-modal" data-reveal></div>' );
			}
			
			// When reveal link is clicked update the img src and show
			
			$( elem ).on( 'touchstart click', function(){
				if (! $( '#'+id+' img' ).length ){
					$( '#'+id ).append( '<img />' );
				}
				$( '#'+id+' img' ).attr( 'src', attr.img );
				$( '#'+id ).foundation('reveal', 'open');
			});
			
		}
	}
});