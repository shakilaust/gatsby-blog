---
title: Lets know redux middlewares better
date: '2018-12-21T16:01:01.087Z'
category: 'General'
tags: ['middleware', 'reduxjs']
thumbnail: '/images/posts/redux.png'
spoiler: Do redux middleware confuse you? Take a deep breath and read on.
---

This is the common structure of every redux middleware:

```jsx
const middleware = store => next => action => {
    ...
    ...
    ...
    return next(action)
}
```

When I first started, it really confused me. We are here to talk about how it got that structure and take a closer look to help you understand middleware better.

In this post firstly we will talk about middlewares in general. If you are familiar with the concept you can start from the next section.

## What is middleware?

In general, middleware is some code you can put in between some other code (hence the name).

For example, when a server-side library receives a request at a particular endpoint, the associated "view" will generate a response in return.

Now you may wish to "log" every request it receives. Instead of logging the request manually in each endpoint's "view", you can put a middleware in between the code of receiving a request and generating a response.

Similarly if you want to parse the "body" of the request you don't want to do that in every function. You may add a middleware that parses the body of each request so that your "view"s get already parsed body to work with.

There could be many more of those. For example one middleware may check the authtication credentials of the request and put the user details in that request- so that the response generators don't have to make a DB call to find out who the request came from.

Here is conceptual view for this example:

```
request received-> one middleware logs -> another parses its body -> one middleware add request makers info -> response generator receives a readymade request
```

## Redux middleware

Redux middleware is conceptually similiar with those of server-side libraries, yet it solves an entirely different problem. Assuming we know nothing about it, let's start from the begining.

> Redux middleware provides a third-party extension point between dispatching an action, and the moment it reaches the reducer.

Let's think about that for a minute. Like any other middleware, it sits between two points. In this case, between dispatching an action (`store.dispatch` call) and the action reaching the reducers (state update). So here is a conceptual view:

```
action dispatched -> middleware -> reducer
```

Having this goal in mind, think about how can we achieve this?
Let's take a real problem and try to solve it.

### Problem #1: Log action and corresponding state change

> One of the benefits of Redux is that it makes state changes predictable and transparent. Every time an action is dispatched, the new state is computed and saved. The state cannot change by itself, it can only change as a consequence of a specific action.

We want to log every action that is dispatched and how that action changed the state. That way, when something is wrong we can look back at our log and figure out which action is resposible in putting our app in a wrong state like this.

So it is very obivious that we have to do this for every action we will write:

```jsx
console.log('dispatching', action)
store.dispatch(action)
console.log('new state', store.getState())
```

But we don't want to do that- every time we write an action we don't want to add some `console.log`s.

So what else can we do?
We could write our own version of dispatch and call it every time.

```jsx
function ourDispatch(store, action) {
  console.log('dispatching', action)
  store.dispatch(action)
  console.log('new state', store.getState())
}
```

So everytime we want to dispatch an action, we call `ourDispatch` instead of `store.dispatch`. What if a new dev in our team calls `store.dispatch` unintentionally at one place? That action will never be logged. So this doesn't feel the right way to go about it.

Now it is obivious that we need to modify `store.dispatch` itself.

```jsx
const originalDispatch = store.dispatch
store.dispatch = function ourDispatch(action) {
  console.log('dispatching', action)
  let originalReturnValue = originalDispatch(action)
  console.log('new state', store.getState())
  return originalReturnValue
}
```

So what we did there basically?
We copied the original version of `store.dispatch` to `oldDispatch`. Then we assign it our own definition. The original one take one argument `action`, so do we. We put the log call before calling the original `dispatch` and then return the `originalReturnValue`. May be, we do not know what original dispatch was supposed to return, but we don't want to polute it's old signature.

So we got what we wanted. But this is a bad approach. Because we are modifying things at our will, but we know things should only be [extended not modified](https://en.wikipedia.org/wiki/Open%E2%80%93closed_principle). But let's keep it like this for a while.

### Problem #2: Add common error catching behaviour

Now if we want to add error catching behaviour, we will modify `dispatch` one more time:

```jsx
const originalDispatch = store.dispatch
store.dispatch = function ourDispatch(action) {
  console.log('dispatching', action)
  let originalReturnValue = originalDispatch(action)
  console.log('new state', store.getState())
  return originalReturnValue
}

const modifiedDispatch = store.dispatch
store.dispatch = function ourNewDispatch(action) {
  try {
    let originalReturnValue = modifiedDispatch(action)
    return originalReturnValue
  } catch (err) {
    console.error('Caught an exception!', err)
    throw err
  }
}
```

Ideally such new functions like `ourDispatch` and `ourNewDispatch` will be in separate modules and might even come from third party packages. So let's refactor it and make two different functions, so that we can call each one with the `store` as parameter (in opposed to current in-place approach):

```jsx
function patchStoreToAddLogging(store) {
  const currentDispatch = store.dispatch
  store.dispatch = function ourDispatch(action) {
    console.log('dispatching', action)
    let originalReturnValue = currentDispatch(action)
    console.log('new state', store.getState())
    return originalReturnValue
  }
}

function patchStoreToSupportErrorHandling(store) {
  const currentDispatch = store.dispatch
  store.dispatch = function ourNewDispatch(action) {
    try {
      let originalReturnValue = currentDispatch(action)
      return originalReturnValue
    } catch (err) {
      console.error('Caught an exception!', err)
      throw err
    }
  }
}
```

Now if these functions are published as separate modules, we can call them easily after one another:

```jsx
patchStoreToAddLogging(store)
patchStoreToSupportErrorHandling(store)
```

Notice that how we can 'chain' multiple middlewares in this fashion. Each modifies the current version of the `dispatch` and calls it.

Now let's go back to our previous problem. We don't want to modify the library function `store.dispatch` like this. What else could we do? Instead of modifying we could just return the new version of the `store.dispatch`.

```jsx
function patchStoreToAddLogging(store) {
  const currentDispatch = store.dispatch
  return function ourDispatch(action) {
    console.log('dispatching', action)
    let originalReturnValue = currentDispatch(action)
    console.log('new state', store.getState())
    return originalReturnValue
  }
}

function patchStoreToSupportErrorHandling(store) {
  const currentDispatch = store.dispatch
  return function ourNewDispatch(action) {
    try {
      let originalReturnValue = currentDispatch(action)
      return originalReturnValue
    } catch (err) {
      console.error('Caught an exception!', err)
      throw err
    }
  }
}
```

But how would we 'chain' them without assigning them to `store.dispatch` like this?

```jsx
store.dispatch = patchStoreToAddLogging(store)
store.dispatch = patchStoreToSupportErrorHandling(store)
```

If we want to avoid assigning, in order to 'chain' them we have pass the current version of `store.dispatch` to each of them as argument. That way, the first function will get the original `store.dispatch` and return a new version of `store.dispatch`. This will go as argument to the second function so that can return a further modified version. Eventually we will receive a fully changed version of `store.dispatch`. Instead of changing `store.dispatch` itself we will create a copy of store at setup time with the last fully changed version of `dispatch`.

So the final version of those two functions will look like this:

```jsx
function patchStoreToAddLogging(store) {
  return function wrapDispatch(currentDispatch) {
    return function ourDispatch(action) {
      console.log('dispatching', action)
      let originalReturnValue = currentDispatch(action)
      console.log('new state', store.getState())
      return originalReturnValue
    }
  }
}

function patchStoreToSupportErrorHandling(store) {
  return function wrapDispatch(currentDispatch) {
    return function ourNewDispatch(action) {
      try {
        let originalReturnValue = currentDispatch(action)
        return originalReturnValue
      } catch (err) {
        console.error('Caught an exception!', err)
        throw err
      }
    }
  }
}
```

Just one line of change in each function: `currentDispatch` now comes as a argument, not from `store`. This allows us to apply the desired chaining without assigning everytime. With this we would get a new copy of `store` object when we set things up t the beginning and work with that.

```jsx
let dispatch = store.dispatch
dispatch = patchStoreToAddLogging(store)(dispatch)
dispatch = patchStoreToSupportErrorHandling(store)(dispatch)
let newStore = Object.assign({}, store, { dispatch })
```

Of course we could loop over an array and still get that final fully wrapped `dispatch`. Now let's make a helper function for setting things up:

```jsx
function ourApplyMiddleware(store, middlewares) {
  middlewares = middlewares.slice()
  middlewares.reverse()
  let dispatch = store.dispatch
  middlewares.forEach(middleware => (dispatch = middleware(store)(dispatch)))
  return Object.assign({}, store, { dispatch })
}
```

And it will be called like this:

```jsx
const newStore = ourApplyMiddleware(store, [
  patchStoreToAddLogging,
  patchStoreToSupportErrorHandling,
])
```

There we have it. We got a `store` object for our app.

### Redux's own applyMiddleware

Of course Redux provides an utility called `applyMiddleware` that would take care of calling our functions while setting up a store. `createStore` takes an optional last argument for this purpose.

```jsx
const store = createStore(
  combineReducers(reducers),
  ...
  ...
  applyMiddleware(patchStoreToAddLogging, patchStoreToSupportErrorHandling)
)
```

It will apply the middlewares and return to us the final version of `store`.

### Almost there

Now lets take a look again our middlewares. With ES6 arrow function they would look like this:

```jsx
const patchStoreToAddLogging = store => currentDispatch => action => {
  console.log('dispatching', action)
  let originalReturnValue = currentDispatch(action)
  console.log('new state', store.getState())
  return originalReturnValue
}

const patchStoreToSupportErrorHandling = store => currentDispatch => action => {
  try {
    let originalReturnValue = currentDispatch(action)
    return originalReturnValue
  } catch (err) {
    console.error('Caught an exception!', err)
    throw err
  }
}
```

Traditionally `currentDispatch` is often named `next` (as this version of dispatch will be called next inside a middleware) and middlewares would look like this:

```jsx
const middleware = store => next => action => {
    ...
    ...
    ...
    return next(action)
}
```

I hope now you understand why there is that `store => next => action` thingy in every redux middleware.

### An observation

I have seen a lot of tutorials online and several npm package's source code that come with middlewares that we can use in our projects and found out one crutial mistake in many such codes:

```jsx
const middleware = store => next => action => {
    ...
    ...
    ...
    next(action)
}
```

They just call `next` but doesn't return the value. It is **bad side effects**.

As middlewares are chained together, if one of them forgets to return the value of `next` call, it will return `undefined` to the previous caller. There are many cases (specially with Async operations), where the return value is very important of the caller of `dispatch`. I intend to write another blog post with a case study about this.

See you for in the next post.
