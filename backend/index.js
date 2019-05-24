const express = require( 'express' );
const app = express();

const fs = require( 'fs' );

const port = Number( process.argv[ 2 ] ) || 3000;


// BODY PARSE TO JSON
app.use( express.json() );


// enable CORS
app.use( function ( req, res, next ) {
    res.header( "Access-Control-Allow-Origin", "*" );
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header( "Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept" );
    next();
} );

app.get( '/tasks', ( req, res ) => {

     const stringJson = fs.readFileSync( './bd.json', 'UTF-8' );

     const data = JSON.parse( stringJson );
     res.status( 200 ).json( data.tasks );

} );

app.post( '/tasks', ( req, res ) => {
    if ( req.body.text ) {
        try {
            let task = {
                text: req.body.text,
                completed: false,
                id: Date.now(),
                color: null
            }
            // get a parse file
            const stringJson = fs.readFileSync( './bd.json', 'UTF-8' );

            const data = JSON.parse( stringJson );
            // add tasks
            data.tasks.push( task );

            //save to file
            const newDataString = JSON.stringify( data );
            fs.writeFileSync( './bd.json', newDataString );

            // response to front
            res.json( { code: 200 } );
        } catch (err) {
            console.error(err.message);
            res.status(500).json({message:'something went wrong. my fault. sorry'})

        }
    } else {
        res.status(400).json({message:'NO TEXT? REALLY? THINK TWICE'})
    }

} );


app.delete('/tasks', function (req, res) {

    if (typeof req.body.task_id === "string") {
        try {

            const stringJson = fs.readFileSync('./bd.json', 'UTF-8');

            const data = JSON.parse(stringJson);

            for (let i = 0; i < data.tasks.length; i++) {
                if (data.tasks[i].id === parseInt(req.body.task_id)) {

                    delete data.tasks[i];

                }
            }
            
            // hacemos un filter para quedarnos con todos los que no son este id
            const DATA_FILTERED = data.tasks.filter(remove_empty)

            function remove_empty(data) {
                return data !== null;
            }
            data.tasks = DATA_FILTERED;
            console.log("after:" + data);

            const newDataString = JSON.stringify(data);
            fs.writeFileSync('./bd.json', newDataString);

            // response to front
            res.json({
                code: 200
            });
        } catch (err) {
            console.error(err.message);
            res.status(500).json({
                message: 'something went wrong. my fault. sorry'
            })

        }
    } else {
        res.status(400).json({
            message: 'NO TEXT? REALLY? THINK TWICE'
        })
    }




});

// app.delete('/delete/:id', (req, res) => {
// var id = req.param("id");
//     MyModel.remove({
//         _id: id 
//     }, function(err){
//         if (err) {
//             console.log(err)
//         }
//         else {
//            return res.send("Removed");
//         }
//     });
// });


// app.delete( '/tasks', ( req, res ) => {
//     if (condition) {
        
//     }
        
//     //leemos base de datos.
//     const stringJson = fs.readFileSync( './bd.json', 'UTF-8' );
//      // lo convertimos a objeto json con el métdo JSON.parse
//     const data = JSON.parse( stringJson );
//     // respuesta estado éxito y datos
//     res.status( 200 ).json( data.tasks );

// } );

// app.put( '/tasks', ( req, res ) => {
//     if () {
        
//     }
    
//     //leemos base de datos.
//     const stringJson = fs.readFileSync( './bd.json', 'UTF-8' );
    
//      // lo convertimos a objeto json con el métdo JSON.parse
//     const data = JSON.parse( stringJson );
//     // add tasks
//     data.tasks.push( task );

//     //save to file
//     const newDataString = JSON.stringify( data );
//     fs.writeFileSync( './bd.json', newDataString );

//     // response to front
//     res.json( { code: 200 } );

// } );






app.listen( port, () => console.log( 'Servidor levantado en ' + port ) );
