//. txt2csv.js
var fs = require( 'fs' );
var readline = require( 'readline' );

var stream = fs.createReadStream( './items.json.txt', 'utf8' );
var reader = readline.createInterface( { input: stream } );
var lines = '';
var cnt = 1;
reader.on( 'line', ( data ) => {
  //console.log( data );
  try{
    var o = JSON.parse( data );
    //var line = ( cnt ++ ) + "\t" + o.code + "\t" + o.name + "\t" + o.price + "\t" + o.brand + "\t" + o.maker + "\t" + o.image_url + "\t" + o.asin + "\n";
    var line = ( cnt ++ ) + "," + o.code + "," + o.name + "," + o.price + "," + o.brand + "," + o.maker + "," + o.image_url + "," + o.asin + "\n";
    lines += line;
  }catch( e ){
    console.log( JSON.stringify( e ) );
  }
});
reader.on( 'close', () => {
  fs.writeFileSync( './items.csv', lines, 'utf8' );
});
