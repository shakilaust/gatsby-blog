---
title: Authentication for websockets
date: '2019-01-02T16:01:52.087Z'
category: 'General'
tags: ['auth', 'websocket']
thumbnail: '/images/posts/redux.png'
spoiler: A “ticket”-based authentication system for websockets.
---

## The problem

Many services use REST API and Token based authentication. The idea is sending the signed token to the server in each request. This is usually done via HTTP header.
But now we want to introduce websockets in our app.
We cannot customize WebSocket headers from JavaScript, so we are limited to the “implicit” auth (i.e. Basic or cookies) that’s sent from the browser.
But having two authentication schemes in place seems messy.

Further, it’s common to have the server that handles WebSockets be completely separate from the one handling “normal” HTTP requests. This can make shared authorization headers difficult or even impossible.

## How do we solve that?

### Wrong approach

Some people may suggest putting the token in the websocket connection url like this:

```
ws://myapp.com/websocket/?token=xxxxx
```

But do we really want to expose the token in a URL? It might be logged somewhere and user's primary credentials could be exposed.

### Right approach

Introduce a ticket-based authentication system.
Broadly speaking, it works like this:

- When the client-side code decides to open a WebSocket, it contacts the HTTP server to obtain an authorization “ticket” using his Token.

- The HTTP server can varify the Token and generate a "ticket".

- The "ticket" typically contains some sort of user/account ID, the IP of the client requesting the ticket, a timestamp, and any other sort of internal record keeping you might need.

- The server stores this ticket (i.e. in a database or cache), and also returns it to the client.

- The client opens the WebSocket connection, and sends along this “ticket” as part of an initial handshake.

- The server can then compare this ticket, check source IPs, verify that the ticket hasn’t been re-used and hasn’t expired, and do any other sort of permission checking. If all goes well, the WebSocket connection is now verified.

## Further reading

- [Websocket 101](http://lucumr.pocoo.org/2012/9/24/websockets-101/)
- [Websocket security recommendation from Heroku](https://devcenter.heroku.com/articles/websocket-security)
