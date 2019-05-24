document.addEventListener( 'DOMContentLoaded', function () {

    // Declarations
    ///////////////

    const baseApiUrl = 'http://localhost:3000';
    const getTaskFromAPIRest = () => {

        // GET to /tasks
        fetch( baseApiUrl + '/tasks' )
            .then( response => response.json() )
            .then( tasks => {
                appendTasks( tasks );
            } )
            .catch( console.error )

    }

    // TODO para hacer columnas y enviar a la lista primera
    const appendTasks = tasksArray => {
        let tasksSection = document.querySelector( 'main' );

        tasksArray.forEach( task => {

            const taskNode = createTaskNode( task );
            tasksSection.appendChild( taskNode );

        } )
    }

    const createTaskNode = taskObj => {

        // creat html string from value text
        let newTaskHtmlString = createTemplateHtmlString( taskObj )
        // console.log(newTaskHtmlString);

        // node creation from html string
        let taskNode = createNodeFromString( newTaskHtmlString )
        // console.log(taskNode)

        // add listeners
        // Añadimos taskObj.id para tener el id de todos los nodos
        addRemoveListener( taskNode, taskObj.id );
        addCompleteListener( taskNode );

        return taskNode;

    }

    // TODO modificar template
    let createTemplateHtmlString = ( { text, color, id, completed } ) =>
        `<div class="task ${completed ? 'completed': ''}" data-id="${id}" style="border-color: ${color}">
            <div class="text">${text}</div>
            <button class="remove">remove</button>
            <button class="complete">complete</button>
        </div>`

// listeners  

    // se incluye en add task (inputNode.addEventListener( 'keyup', function ( event ) {)
    // se incluye en  create task (const createTaskNode = taskObj => {)
    let createNodeFromString = string => {
        let divNode = document.createElement( 'div' );
        divNode.innerHTML = string;
        return divNode.firstChild;
    } 
    
    // Obtenemos task.id para tener el id de todos los nodos
    let addRemoveListener = (node, taskId) => {
        
        node.querySelector( '.remove' ).addEventListener( 'click', event => {
            // SOBRE EL DOM
            // event.target.parentNode.remove();
            //node.remove();

            // ejemplo de obtener atributo con js           
            // const taskId = node.getAttribute("data-id");
        
            // llamada a la función
             // y después de la promesa lo borramos del DOM
            //delete_task(taskId).then( () => node.remove() ).catch('error')
            delete_task(taskId);
            node.remove();


        } )
    }
    
    let addCompleteListener = node => {
        node.querySelector( '.complete' ).addEventListener( 'click', event => {
            node.classList.toggle( 'completed' )
        } )
    }

    let saveTaskToBackend = text => {
        // GET to /tasks
        return fetch( baseApiUrl + '/tasks', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify( { text } )
            } )
            .then( console.log )
            .then( response => response.json() )
            .then( console.log )

            .catch( console.error )
    }

    // add tasks
    let inputNode = document.querySelector( 'header input' );

    inputNode.addEventListener( 'keyup', function ( event ) {
        if ( event.keyCode === 13 ) {
            //get value from input
            let newTaskText = event.target.value;

            saveTaskToBackend( newTaskText ).then( () => {
                 // creat html string from value text
                 let newTaskHtmlString = createTemplateHtmlString( { text: newTaskText } )
                 // console.log(newTaskHtmlString);

                 // node creation from html string
                 let newTaskNode = createNodeFromString( newTaskHtmlString )
                 // console.log(newTaskNode)

                 // node inject to DOM in main
                 document.querySelector( 'main' ).appendChild( newTaskNode )

                 // clean value
                 event.target.value = '';

                 addRemoveListener( newTaskNode );
                 addCompleteListener( newTaskNode );
            })


        }
    } )

    // remove task
    function delete_task(task_id) {

        fetch(baseApiUrl + '/tasks', {
                method: 'delete',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({

                    task_id
                })
            })
            .then(console.log)
            .then(response => response.json())
            .then(console.log)
            .catch(console.error)

    }

    // Encender la falla
    ////////////////////
    getTaskFromAPIRest();

} )
