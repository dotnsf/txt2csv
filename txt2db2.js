//. txt2db2.js
var fs = require( 'fs' );
var readline = require( 'readline' );
var db2 = require( 'ibm_db' );

db2.open( "DATABASE=testdb;HOSTNAME=148.100.245.14;UID=db2inst1;PWD=db2inst1;PORT=50000;PROTOCOL=TCPIP", function( err, conn ){
  if( err ) return console.log( err );

  conn.prepare( "insert into items( code, name, price, brand, maker, image_url, asin ) values ( ?, ?, ?, ?, ?, ?, ? )", function( err, stmt ){
    if( err ){
      console.log( err );
      return conn.closeSync();
    }

    var stream = fs.createReadStream( './items.json.txt', 'utf8' );
    var reader = readline.createInterface( { input: stream } );
    reader.on( 'line', ( data ) => {
      //console.log( data );
      try{
        //console.log( data );
        var o = JSON.parse( data );
        stmt.executeNonQuery( [ o.code, o.name, o.price, o.brand, o.maker, o.image_url, o.asin ], function( err, result ){
          if( err ){ console.log( JSON.stringify( err ) ) }
        });
      }catch( e ){
        console.log( JSON.stringify( e ) ); //. {}
      }
    });
    reader.on( 'close', () => {
    });
  });
});
