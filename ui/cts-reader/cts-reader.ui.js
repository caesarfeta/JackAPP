appUI.directive( 'ctsReader', 
function(){
	return {
		restrict: 'E',
		replace: true,
		controller: 'ctsReaderCtrl',
		templateUrl:  'ui/cts-reader/cts-reader.ui.html'
	}
});