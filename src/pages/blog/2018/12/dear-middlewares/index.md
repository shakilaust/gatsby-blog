---
title: Lets know redux middlewares better
date: '2018-12-21T16:01:01.087Z'
category: 'General'
tags: ['middleware', 'reduxjs']
thumbnail: '/images/posts/redux.png'
spoiler: Do redux middleware confuse you? Take a deep breath and read on.
---

This is a common structure of every redux middleware:

```jsx
const middleware = store => next => action => {
    ...
    ...
    ...
    return next(action)
}
```

When I first started, it really intimidated me- what's with all those arraows?. Then of course when I got to know them a little bit better, it was pretty clear. That's what we will try to do in this post. We will start from ground up and reach that `store => next => action =>` thingy gradually.

If you are familiar with the concept of middleware you can skip the next section and go directly to [Redux's version of middleware](#redux-middleware).

## What is middleware, anyway?

In general, middleware is some code you can put in between some other code (hence the name).

For example, when a server-side library receives a request at a particular endpoint, the associated "view" function will generate a response in return. Now you may wish to "log" every request it receives. Instead of logging the request manually in each endpoint's "view" function, you can put a middleware in between the code of receiving a request and generating a response.

Similarly if you want to parse the "body" of the request you don't want to do that in every function. You may add a middleware that parses the body of each request so that your "view"s get already parsed ("ready made") body to work with.

Another popular use case would be, one middleware checks the authtication credentials of the request and put the user details in that "request object"- so that every response generator function doesn't have to make a DB call to find out who the request came from. There could be many more of these. And the best part is- you can chain them after one another. Here is a conceptual view:

![](example.png)

## Redux middleware

> Redux middleware provides a third-party extension point between dispatching an action, and the moment it reaches the reducer.

Let's think about that for a minute. Like any other middleware, it sits between two points. In this case, between dispatching an action (`store.dispatch` call) and the action reaching the reducers (for state update).

So here is a conceptual view:

![](redux-middleware.png)

But why does it sit there? Consider these use cases:

- We want to log every action that is dispatched and how that action changed the state. That way, when something is wrong we can look back at our log and figure out which action is resposible in putting our app in a wrong state. We have to put this logger between those two points to acheive this.

- We want to have a common error catching logic for our app (and possibly send it to a crash reporting service).

Now let's forget everything about the `store => next => action =>` thing we saw before and try to write a redux middleware from scratch.

## Writing middleware from scratch

Let's say we want to have log functionality like this:

```jsx
console.log('dispatching', action)
store.dispatch(action)
console.log('new state', store.getState())
```

But we don't want to write a bunch of `console.log` every time we write a `dispatch` call.

So what else can we do?
We could write our own version of dispatch (which is basically a wrapper) and call it every time.

```jsx
function ourDispatch(store, action) {
  console.log('dispatching', action)
  store.dispatch(action)
  console.log('new state', store.getState())
}
```

So everytime we want to dispatch an action, we call `ourDispatch` instead of `store.dispatch`. But this will probably cause inconsistency in our project if we call `store.dispatch` in some files and `ourDispatch` in some others. We need a better solution.

Can we not modify `store.dispatch` itself?

```jsx
const originalDispatch = store.dispatch
store.dispatch = function ourDispatch(action) {
  console.log('dispatching', action)
  let originalReturnValue = originalDispatch(action)
  console.log('new state', store.getState())
  return originalReturnValue
}
```

Here we copied the original version of `store.dispatch` to `originalDispatch`. Then we assign it our own definition. The original one take one argument (`action`), so does ours. We also return the `originalReturnValue`. May be, we do not know what original `store.dispatch` was supposed to return, but we don't want to polute it's old signature.

So we got what we wanted. But this is a bad approach. Because we are modifying things at our will, but we know things should only be [extended not modified](https://en.wikipedia.org/wiki/Open%E2%80%93closed_principle). But let's keep it like this for a while.

### Chaining middlewares

An important feature of middleware is chaining. How can we do that with what we have written so far?

Let's say we want to add a common error catching behaviour. That is- we want a common place where we can catch any thrown error.

We will modify `dispatch` one more time:

```jsx
const originalDispatch = store.dispatch
store.dispatch = function ourDispatch(action) {
  console.log('dispatching', action)
  let originalReturnValue = originalDispatch(action)
  console.log('new state', store.getState())
  return originalReturnValue
}

// now store.dispatch is modified
// let's modify it one more time
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

We just copied and pasted the previous implementation of middleware. This would work. Every time we want to chain some more middleware, we keep copy and pasting in this format.

This works, but what if we decide our middlewares will no longer reside in a single file? Ideally such new functions will be in separate modules and might even come from third party packages. To facilitate that we should make `store` a parameter. That way we can send `store` and those middlewares would replace the `store.dispatch` with their own implementation.

```jsx
// in one file/package
export function patchStoreToAddLogging(store) {
  const currentDispatch = store.dispatch
  store.dispatch = function ourDispatch(action) {
    console.log('dispatching', action)
    let originalReturnValue = currentDispatch(action)
    console.log('new state', store.getState())
    return originalReturnValue
  }
}

// in different file/package
export function (store) {
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

Now even if these functions are published as separate modules, we can call them easily after one another:

```jsx
// after import from files/packages
patchStoreToAddLogging(store)
patchStoreToSupportErrorHandling(store)
```

Good, now we have chained middlewares.

### Better implementation

Now let's go back to our previous problem. We don't want to modify the library function `store.dispatch` like this. What else could we do? Instead of modifying the current version 'in-place', we could just return the new version of the `store.dispatch`.

```diff
export function patchStoreToAddLogging(store) {
  const currentDispatch = store.dispatch
- store.dispatch = function ourDispatch(action) {
+ return function ourDispatch(action) {
    console.log('dispatching', action)
    let originalReturnValue = currentDispatch(action)
    console.log('new state', store.getState())
    return originalReturnValue
  }
}

export function patchStoreToSupportErrorHandling(store) {
  const currentDispatch = store.dispatch
- store.dispatch = function ourNewDispatch(action) {
+ return function ourNewDispatch(action) {
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

What good did it do? :/  
How would we 'chain' them without assigning them to `store.dispatch` like this?

```jsx
store.dispatch = patchStoreToAddLogging(store)
store.dispatch = patchStoreToSupportErrorHandling(store)
```

If we want to avoid assigning, in order to 'chain' them we have pass the current version of `store.dispatch` to each of them as argument. That way, the first function will get the original `store.dispatch` and return a new version of `store.dispatch`. This will go as argument to the second function so that can return a further modified version. Eventually we will receive a fully changed version of `store.dispatch`. Instead of changing `store.dispatch` itself we will create a copy of store at setup time with the last fully changed version of `dispatch`.

So the final version of those two functions will look like this:

```diff
export function patchStoreToAddLogging(store) {
-  const currentDispatch = store.dispatch
+  return function wrapDispatch(currentDispatch) {
    return function ourDispatch(action) {
      console.log('dispatching', action)
      let originalReturnValue = currentDispatch(action)
      console.log('new state', store.getState())
      return originalReturnValue
    }
+  }
}

export function patchStoreToSupportErrorHandling(store) {
-  const currentDispatch = store.dispatch
+  return function wrapDispatch(currentDispatch) {
    return function ourNewDispatch(action) {
      try {
        let originalReturnValue = currentDispatch(action)
        return originalReturnValue
      } catch (err) {
        console.error('Caught an exception!', err)
        throw err
      }
    }
+  }
}
```

Just one line of change in each function: `currentDispatch` now comes as a argument, not from `store`. This allows us to apply the desired chaining without assigning everytime. With this we would get a new copy of `store` object when we set things up at the beginning and work with that.

```jsx
let dispatch = store.dispatch // original one
dispatch = patchStoreToAddLogging(store)(dispatch)
dispatch = patchStoreToSupportErrorHandling(store)(dispatch)
let newStore = Object.assign({}, store, { dispatch })
```

Of course we could loop over an array and still get that final fully wrapped `dispatch`.

There we have it. We got a `store` object for our app with both middleware installed.

### Redux's `applyMiddleware`

Redux provides an utility called `applyMiddleware` that would take care of calling our functions while setting up a store. `createStore` takes an optional last argument for this purpose.

```jsx
const appliedMiddlewares = applyMiddleware(
  patchStoreToAddLogging,
  patchStoreToSupportErrorHandling
)

const store = createStore(combineReducers(reducers), appliedMiddlewares)
```

It will apply the middlewares and return to us the final version of `store`.

### Almost there

Now lets take a look again our middlewares. With ES6 arrow function they would look like this:

```jsx
export const patchStoreToAddLogging = store => currentDispatch => action => {
  console.log('dispatching', action)
  let originalReturnValue = currentDispatch(action)
  console.log('new state', store.getState())
  return originalReturnValue
}

export const patchStoreToSupportErrorHandling = store => currentDispatch => action => {
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

### We must return

I have seen a lot of tutorials online and several npm package's source code that ship with middlewares that we can use in our projects and found out one crutial mistake in many such codes:

```jsx
const middleware = store => next => action => {
    ...
    ...
    ...
    next(action) // we _must_ return!
}
```

They just call `next` but doesn't return the value. It has **bad side effects**:

As middlewares are chained together, if one of them forgets to return the value of `next` call, it will return `undefined` to the previous caller. There are many cases (specially with Async operations), where the return value is very important of the caller of `dispatch`. I intend to write another blog post with a case study about this.

See you next time.

### Further reading:

- [7 examples of redux middlewares](https://redux.js.org/advanced/middleware#seven-examples)
