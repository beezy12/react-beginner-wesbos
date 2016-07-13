var React = require('react')
var ReactDOM = require('react-dom')

var ReactRouter = require('react-router')
var Router = ReactRouter.Router
var Route = ReactRouter.Route
var Navigation = ReactRouter.Navigation
// npm history loads in the required code to be able to do push state (changing the URL without a reload)
var createBrowserHistory = require('history/lib/createBrowserHistory')


/*
    App
*/

var App = React.createClass({

    render: function() {
        return (
            <div className="catch-of-the-day">
                <div className ="menu">
                    <Header tagline="Fresh Seafood Market"/>
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
        console.log(this)
        console.log(this.props)
        return (
            <header className="top">
                <h1>Catch
                    <span className="ofThe">
                        <span className="of">of</span>
                        <span className="the">the</span>
                    </span>
                    Day</h1>
                <h3 className="tagline"><span>{this.props.tagline}</span></h3>
            </header>
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


/*
    Routes

    - if nesting Route, you must close it. but if not you can use a self-closing tag.
    - :storeId actually makes a variable that we can use.

    - NOTICE*** at the bottom we are no longer rendering <App />, we made this routes variable
      and are rendering that now. routes has everything we need. or you could just code the routes
      directly inside the ReactDOM.render

    - all we're doing in single page apps, is updating the URL bar without refreshing.
    - the reason we have the # in the URL is because older browsers dont support HTML5 'push state'
    - PUSH STATE allows you to update the URL bar without a reload
*/

var routes = (
    <Router history={createBrowserHistory()}>
        <Route path="/" component={StorePicker} />
         <Route path="/store/:storeId" component={App} />
    </Router>
)


ReactDOM.render(routes, document.querySelector('#main'))

