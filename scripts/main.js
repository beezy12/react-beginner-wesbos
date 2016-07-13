var React = require('react')
var ReactDOM = require('react-dom')


/*
    App
*/

var App = React.createClass({

    render: function() {
        return (
            <div className="catch-of-the-day">
                <div className ="menu">
                    <Header/>
                </div>
                <Order/>
                <Inventory/>
            </div>
        )
    }
})



/*
    Header
    <Header />
*/

var Header = React.createClass({

    render: function() {
        return (
            <p>Header</p>
        )
    }
})


/*
    Order
    <Order/>
*/

var Order = React.createClass({

    render: function() {
        return (
            <p>Order</p>
        )
    }
})


/*
    Inventory
    <Inventory/>
*/

var Inventory = React.createClass({

    render: function() {
        return (
            <p>Inventory</p>
        )
    }
})


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



ReactDOM.render(<App/>, document.querySelector('#main'))

