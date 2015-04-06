var r = require('request-json');
var fs = require('fs');
var clone = require('clone');
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


// Build keywords

function keywords( n ){
	var keys = [];
	while ( n > 0 ){
		keys.push( chance.word() );
		n--;
	}
	return keys;
}


// Get a Steven Segall themed image

function steven( thumb ){
	var ns = [ 100, 200, 300, 400, 500, 600, 700, 800, 900 ];
	var url = "http://stevensegallery.com/";
	if ( ! thumb ){
		return url + rand_item( ns ) + '/' + rand_item( ns );
	}
	return url + 75 + '/' + 75;
}


// Grab a random item from an array

function rand_item( arr ){
	return arr[Math.floor(Math.random()*arr.length)];
}


// Build array of random words

function rand_words(){
	if ( keywords.length == 0 ){
		keywords = build_keywords();
	}
	var i = chance.integer({ min: 1, max: 5 });
	var o = {};
	while ( i > 0 ){
		var key = chance.integer({ min: 0, max: keywords.length-1 });
		o[ keywords[key] ] = 1;
		i--;
	}
	var a = [];
	for( var key in o ){
		a.push( key );
	}
	return a;
} 
var keywords = [];
function build_keywords(){
	var i = chance.integer({ min: 5, max: 20 });
	var w = [];
	while ( i > 0 ){
		w.push( chance.word() );
		i--;
	}
	return w;
}


// Create an img record

function img( data ){
	data.src = steven();
	data.thumb = steven( true );
	data.tag = rand_words();
	data.label = chance.sentence();
	data.description = chance.sentence();
	return clone( data );
}

function id(){ 
	return chance.string({ length: 5, pool: char_pool }) 
}


// Build the vortex JSON file

function build_vortex(){
	var tmpl = open_json( '../json/tmpl/vortex.tmpl.json' );
	
	// image records
	
	var imgt = tmpl.img.sample;
	var imgs = {};
	for ( var i=0; i<100; i++ ){
		imgs[ id() ] = img( imgt );
	}
	tmpl.img = imgs;
	write( '../json/data/vortex.json', tmpl );
}



// Build the tag frequency file

function build_tag(){
	
	// Get the vortex json
	
	var src = open_json( '../json/data/vortex.json' );
	
	// Count the tags
	
	var tags = {};
	for ( var key in src.img ){
		for ( var i=0; i<src.img[key].tag.length; i++ ){
			var tag = src.img[key].tag[i];
			if( !( tag in tags ) ){
				tags[tag] = 0;
			}
			tags[tag] += 1;
		}
	}
	
	for ( var key in src.text ){
		for ( var i=0; i<src.text[key].tag.length; i++ ){
			var tag = src.text[key].tag[i];
			if( !( tag in tags ) ){
				tags[tag] = 0;
			}
			tags[tag] += 1;
		}
	}
	
	var obj = [];
	for ( var tag in tags ){
		obj.push( { "name": tag, "value": tags[tag] } );
	}
	write( '../json/data/tag.json', obj );
}


// run the script

function run(){
	switch ( process.argv[2] ){
		case 'tag':
			build_tag();
			break;
		default:
			build_vortex();
	}
}
run();