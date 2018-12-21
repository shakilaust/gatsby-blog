---
title: Lets know middlewares better
date: '2018-12-21T16:01:01.087Z'
category: 'Tech'
tags: ['middlewares', 'reduxjs', 'expressjs', 'django']
thumbnail: '/images/meta/favicon.png'
spoiler: Lessons learned from writing middlewares.
---

In this post we will talk about middlewares in general- what they are and how to write them.  
We will get our hands dirty by writing some examples first. In the later part we will use our knowledge to write middlewares for various frameworks like ReduxJS, ExpressJS and Django.

## What is middleware?

In general, middleware is some code you can put between some other code (hence the name). 

For example, when a server-side library receives a request, it will generate a response in return. Now you wish to "log" every request it receives. So you put a middleware in between the code of receiving a request and generating a response that will log the request.


But why would you put a middleware there? Can't you just log the request "in-place"?


Lets say your server handles two request, one at `/dashboard` and one at `/inbox` like this:
```

function getResponseForDashboardRequest(request) {
    ...
    log(request)
    ...
    return generateResponseForDashboardRequest(request.data)
}

function getResponseForInboxRequest(request) {
    ...
    log(request)
    ...
    return generateResponseForInboxRequest(request.data)
}

...
```

Of course you can do that.  
But what if you have so many of these functions?. Would you edit all of them and add a `log` call on top?  


Now think that you not only want to "log" the request, you want to know who the request came from, in every view. You can do so like this:
```
function getResponseForDashboardRequest(request) {
    ...
    log(request)
    user = makeDatabaseCall(request.authHeaders)
    if(user.anonymous) return errorResponse("Not authorized")
    ...
    return generateResponseForDashboardRequest(user.id, request.data)
}

function getResponseForInboxRequest(request) {
    ...
    log(request)
    user = makeDatabaseCall(request.authHeaders)
    if(user.anonymous) return errorResponse("Not authorized")
    ...
    return generateResponseForInboxRequest(user.id, request.data)
}

...
```

Writing these common functionalities in every function is clearly not the right approach. Because we never want to repeat ourselves.  

So how do we make sure everytime a request comes in we log that request and find out who the user is, before generating a response?  

Comes the idea of a middleware.
We could put some code "between" the process of getting the request and generating a response:
```
Request => Log request in middleware => Get user details in middleware => (any) Response Generator.
```

Before we move on to write middlewares pause and think for a bit where our middlewares would sit in this scenario.

Our's should be inside the `router` thing. Because it is responsible to look at the url of the request and sending it to a view. So our modified router would first call the middlewares and then send the request to view.


Here is how the problem is solved:
You write two individual functions that we wrote in previous attempt:

```
function logMiddleware(request) {
    log(request)
    return request
}

function authMiddleware(request) {
    user = makeDatabaseCall(request.authHeaders)
    if(user.anonymous) {
        throw Error("Not authorized") 
    }
    else {
        reuest.user = user
        return request
    }
}
```

Now we modify our `router` thingy to call the middlewares. Assuming there is a `router.dispatch` function that takes on a request and find an appropriate view to generate response, how can we modify it to use our middlewares?
```
router.dispatch = function(request) {
    path = request.url
    handler = router.handlers[path]
    if(handler) {
        try {
            request = logMiddleware(request)
            request = authMiddleware(request)
            response = handler(request)
            return response
        } 
        catch error {
            return errorResponse(error)
        }
    } else {
        return 404
    }
```

Now let's modify our design so we can use array, instead of manually calling them.
```
middlewares = [logMiddleware, authMiddleware]
try {
    middlewares.forEach(middleware => {
        request = middleware(request) 
    }
    response = handler(request)
    return response
} 
catch error {
    return errorResponse(error)
}
```

But the design is still not very good. We are changing the input `request` inside this method. A better way would be to send the modified `request` dirrectly to the next middleware without altering it.

The middleware could accept the `next` function as a parameter. So `logMiddleware` would take `authMiddleware`, that one will take the original view function.

So our modified design would look like this:
```
function logMiddleware(request, next) {
    log(request)
    return next(request)
}

function authMiddleware(request, next) {
    user = makeDatabaseCall(request.authHeaders)
    if(user.anonymous) {
        throw Error("Not authorized") 
    }
    else {
        reuest.user = user
        return next(request)
    }
}
```

And we call it like this:
```
middlewares = [logMiddleware, authMiddleware]
try {
    let response = handler 
    middlewares.forEach(middleware => {
        response = middleware(request)(handler)
    })
    return response
} 
catch error {
    return errorResponse(error)
}
```


> The best part of middleware is that it's composable in a chain. You can use multiple third-party middleware in your project.

