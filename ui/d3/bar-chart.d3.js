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
			.attr('x', function(d){ return ( width - x(d.value) ) + 5 })
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