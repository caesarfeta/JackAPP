var r = require('request-json');
var fs = require('fs');
var Chance = require('../bower_components/chance');
var chance = new Chance();
var char_pool = 'abcdefghijklmnopqrstuvwxyz0123456789';

// Write the file

function write( file, data ){
	fs.writeFile( file, JSON.stringify( data, null, 2 ),
	function( err ){
		if ( err ){
			console.log( err );
		}
		else {
			console.log( file+' saved!' );
		}
	});
}


// Open a json file

function open_json( file ){
	return JSON.parse( fs.readFileSync( file ) );
}

function keywords( n ){
	var keys = [];
	while ( n > 0 ){
		keys.push( chance.word() );
		n--;
	}
	return keys;
}

function img( tmpl ){
	return tmpl;
}

function id(){ return chance.string({ length: 5, pool: char_pool }) }


// run the script

function run(){
	var tmpl = open_json( '../json/tmpl/vortex.tmpl.json' );
	var keys = keywords( 25 );
	
	// image records
	
	var imgt = tmpl.img.sample;
	var imgs = {};
	for ( var i=0; i<100; i++ ){
		imgs[ id() ] = img( imgt );
	}
	tmpl.img = imgs;
	
	write( '../json/data/vortex.json', tmpl );
}
run();