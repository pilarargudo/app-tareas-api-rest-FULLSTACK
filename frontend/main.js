document.addEventListener( 'DOMContentLoaded', function () {

    let createTemplateHtmlString = text =>
        `<div class="task">
            <div class="text">${text}</div>
            <button class="remove">remove</button>
            <button class="complete">complete</button>
        </div>`
    let createNodeFromString = string => {
        let divNode = document.createElement( 'div' );
        divNode.innerHTML = string;
        return divNode.firstChild;
    }
    let addRemoveListener = node => {
        node.querySelector( '.remove' ).addEventListener( 'click', event => {
            // event.target.parentNode.remove();
            node.remove();
        } )
    }
    let addCompleteListener = node => {
        node.querySelector('.complete').addEventListener('click', event => {
            node.classList.toggle('completed')
        })
    }
    let inputNode = document.querySelector( 'header input' );

    inputNode.addEventListener( 'keyup', function ( event ) {
        if ( event.keyCode === 13 ) {
            //get value from input
            let newTaskText = event.target.value;
            // console.log(newTaskText);

            // creat html string from value text
            let newTaskHtmlString = createTemplateHtmlString( newTaskText )
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
        }
    } )

} )
