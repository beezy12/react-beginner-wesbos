var React = require('react')
var ReactDOM = require('react-dom')

/*
    - Store Picker
    - render says "what HTML do you want me to show?"
    - this code below will let me make <StorePicker />
    - render can only return one thing. like a form or a div but not multiple p tags
    - MUST HAVE self closing tags
*/

var StorePicker = React.createClass({

    render: function() {

    var name = 'beez'
        return (
            <form className="store-selector">
                {/* this is how you write comments in JSX*/}
                <h2>Please Enter A Store {name}</h2>
                <input type="text" ref="storeId" required />
                <input type="submit" />
            </form>
        )
    }

})



ReactDOM.render(<StorePicker/>, document.getElementById('main'))
