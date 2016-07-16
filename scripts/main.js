var React = require('react')
var ReactDOM = require('react-dom')

var ReactRouter = require('react-router')
var Router = ReactRouter.Router
var Route = ReactRouter.Route
var Navigation = ReactRouter.Navigation // this is deprecated??
var History = ReactRouter.History

// npm history loads in the required code to be able to do push state (changing the URL without a reload)
var createBrowserHistory = require('history/lib/createBrowserHistory')

var helpers = require('./helpers.js')


/*
    video10 STATE
    - state is a representation of all of your components data. it's one big object that holds
      all the information thats related to your component. it's the master copy of all of our data,
      and the HTML is based off of that.
    - ** We don't change the HTML we change the state, and React will update the HTML accordingly. if you have a title, and you change the state of the title, it will change that title everywhere.
*/


/*
    - {} CURLY BRACKETS MEAN JAVASCRIPT
    - 'this' refers to the component that it lives in
*/




/*
    App
    <App />
    this is the brains of the operation

    - we are going to have two things in our state for this app:
            the list of all the different kinds of fish
            the order price and quantity

    - getInitialState returns the initial state, which here is the blank fishes and order objects.
    IT IS PART OF THE REACT LIFECYCLE, WHICH MEANS THAT BEFORE THE COMPONENT IS LOADED, REACT WILL RUN getInitialState AND IT WILL POPULATE ITSELF WITH ANYTHING THAT IS IN THERE

    - then you will need a method that can add fish to the state. addFish method.
    - we need a unique key for every fish in the fishes object, so we are adding a timestamp. this
    will also put the newest fish at the top of the list.
*/


var App = React.createClass({
    getInitialState: function() {
        return {
            fishes: {},
            order: {}
        }
    },
    addFish: function(fish) {
        var timestamp = (new Date()).getTime()

        // update the state object. this.state refers to everything being returned above in getInitialState. this isn't enough for React to re-render, must set the state.
        this.state.fishes['fish-' + timestamp] = fish

        // set the state. you must pass it an object of what has changed inside the state.
        // YOU DO NOT want to pass it this.state, because then React would have to go through the entire state object and see what has changed. so you specifically tell it:
        // {fishes: this.state.fishes}
        // this IS weird because you tell it to set state and pass it itself. it's for performance
        this.setState({fishes: this.state.fishes})
    },
    loadSamples: function() {
        this.setState({
            fishes: require('./sample-fishes')
        })
    },
    renderFish: function(key) {
        return <Fish key={key} index={key} details={this.state.fishes[key]} />
        /*** whenever you render out an element in React, you need to give it a key property, and that key needs to be unique, because React needs to be able to track it. when there's a change to a particular fish, it knows which element to update and render out while leaving the rest of them untouched.
        the reason we used index={key} is because you can't access key={key} inside a component????  */
    },
    render: function() {
        return (
            <div className="catch-of-the-day">
                <div className ="menu">
                    <Header tagline="Fresh Seafood Market"/>

                {/* need to loop over these...would used MAP but MAP only works on arrays.
                    so we used Object.keys, this will give us an array of all the keys on fishes*/}
                    <ul className="list-of-fishes">
                {/* so getting the keys of every fish, running map, and what we want map to do
                is run this.renderFish for every fish that we have in our state. we need a list, but we are making a new Fish component card, in case we need to use it elsewhere*/}
                        {Object.keys(this.state.fishes).map(this.renderFish)}

                    </ul>
                </div>
                <Order/>
                <Inventory addFish={this.addFish} loadSamples={this.loadSamples} />   {/* this gets passed down from <Inventory /> to <AddFishForm />    */}
            </div>
        )
    }
})


/*
    Fish
    <Fish />
*/

var Fish = React.createClass({

    render: function() {
        var details = this.props.details  // this saves time from having to write all this out
        var isAvailable = (details.status === 'available' ? true : false)
        return (
            <li className="menu-fish">
                <img src={details.image} alt={details.name} />
                <h3 className="fish-name">
                    {details.name}

                    <span className="price">{helpers.formatPrice(details.price)}</span>
                </h3>
                <p>{details.desc}</p>
            </li>
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
    <Order />
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
    <Inventory />

    - in a later step, we passed the addFish function to Inventory using App.
    - ** could've just done <AddFishForm addFish={addFish}.....but that gets hard to keep up with if you have multiple props you are passing down from App, and here we're passing from App to Inventory to AddFishForm. the way around that is by using a SPREAD {...this.props}
    what this ^^^ does is pass all props from Inventory on down to AddFishForm
*/

var Inventory = React.createClass({

    render: function() {
        return (
            <div>
                <h2>Inventory</h2>

                <AddFishForm {...this.props} />   {/* SPREAD */}
                <button onClick={this.props.loadSamples}>Load Sample Fishes</button>
            </div>
        )
    }
})


/*
    Add Fish Form
    <AddFishForm />
*/

var AddFishForm = React.createClass({
    createFish: function(event) {
        // 1. stop the form from auto-submitting
        event.preventDefault()

        // 2. get the data from the form and create an object
        var fish = {
            name: this.refs.name.value,
            price: this.refs.price.value,
            status: this.refs.status.value,
            desc: this.refs.description.value,
            image: this.refs.image.value
        }
            console.log(fish)


        // 3. add the fish to the App State (we're not worried about the fish state)

        // look at dev tools. the method addFish lives in App, which is the parent. so we must pass it
        // down from App to Inventory, and then from Inventory to AddFishForm. (Inventory is the     parent of AddFishForm).
        // you'll see in App we add this method to Inventory, and then used a spread to get it to <AddFishForm /> in Inventory
        // this was the last step. enter some info in the website, check React dev tools, click down to App, click on it and see the states to the right. you can see your fish. check Inventory in dev tools to see the prop addFish function.
        this.props.addFish(fish)
        this.refs.fishForm.reset // clears the form after submission
    },

    render: function() {
        return (
            <form className="fish-edit" ref="fishForm" onSubmit={this.createFish}>
                <input type="text" ref="name" placeholder="Fish Name" />
                <input type="text" ref="price" placeholder="Fish Price" />
                <select ref="status">
                    <option value="available">Fresh!</option>
                    <option value="unavailable">SOLD OUT</option>
                </select>
                <textarea type="text" ref="description" placeholder="Description"></textarea>
                <input type="text" ref="image" placeholder="URL for image" />
                <button type="submit">+ add item</button>
            </form>
        )
    }
})




/*
    - Store Picker
      <StorePicker />
    - render says "what HTML do you want me to show?"
    - this code below will let me make <StorePicker />
    - render can only return one thing. like a form or a div but not multiple p tags
    - MUST HAVE self closing tags
    - preventDefault stops the form from submitting the data and refreshing the page
    - mixins will always be an array
    - pushState is when you change the URL
*/

var StorePicker = React.createClass({

    mixins: [History],

    goToStore: function(event) {
        event.preventDefault()

        // get the data (the store id)from the input and then...
        console.log(this.refs)
        console.log(this.refs.storeId)

        var storeId = this.refs.storeId.value

        console.log(storeId)

        // redirect to the store page
        // pushState lets you change the URL without refreshing the page
        // (we got a console error 'cannot read property "pushState" of undefined'. this is because we need to use a mixin. we include the History mixin above)
        this.history.pushState(null, '/store/' + storeId)
    },

    render: function() {
        var name = 'beez'
        return (
            <form className="store-selector" onSubmit={this.goToStore}>
                 {/* this is how you write comments in JSX*/}
                <h2>Please Enter A Store {name}</h2>
                <input type="text" ref="storeId" defaultValue={helpers.getFunName()} required />
                <input type="submit" />
            </form>
        )
    }
})

/*
    Not Found component
    <NotFound />

    this handles an error in the URL
*/

var NotFound = React.createClass({

    render: function() {
        return (
            <h1> Not Found </h1>
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
        <Route path="*" component={NotFound} />
    </Router>
)


ReactDOM.render(routes, document.querySelector('#main'))









