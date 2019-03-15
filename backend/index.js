const express = require( 'express' );
const app = express();

const fs = require( 'fs' );

const port = Number( process.argv[ 2 ] ) || 3000;


// BODY PARSE TO JSON
app.use( express.json() );


// enable CORS
app.use( function ( req, res, next ) {
    res.header( "Access-Control-Allow-Origin", "*" );
    res.header( "Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept" );
    next();
} );


app.get( '/users', ( req, res ) => {

     const stringJson = fs.readFileSync( './bd.json', 'UTF-8' );

     const data = JSON.parse( stringJson );
     res.status( 200 ).json( data );

} );

app.post( '/users', ( req, res ) => {
    console.log('body' ,req.body );

    const stringJson = fs.readFileSync( './bd.json', 'UTF-8' );

    const data = JSON.parse( stringJson );

    data.users.push( req.body );

    const newDataString = JSON.stringify( data );

    fs.writeFileSync( './bd.json', newDataString );

    res.json( { code: 200 } );
} );

app.listen( port, () => console.log( 'Servidor levantado en ' + port ) );
