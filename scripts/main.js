var React = require('react')
var ReactDOM = require('react-dom')

/*
    - Store Picker
    - render says "what HTML do you want me to show?"
    - this code below will let me make <StorePicker />
*/

var StorePicker = React.createClass({

    render: function() {
        return (
            <p>hello react</p>
        )
    }

})



ReactDOM.render(<StorePicker/>, document.getElementById('main'))
