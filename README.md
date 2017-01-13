# DAS

Decentral Authentication Service

## What is this?

DAS is a proof of concept of a digital workspace as used in school. Most of them use [Apereo's CAS](https://github.com/apereo/cas) (sometimes known as Jasig), which handles authentification in a centralised way.

There's one downside to this: it requires a JEE server to run, now always easy to configure, sometimes ressources-hungry, and slows each authentication to a service by requiring additional requests between both the service and the CAS server, and the CAS server and the client.

That's where [Macaroons](http://hackingdistributed.com/2014/05/21/my-first-macaroon/) come in the game. Macaroons are an easy way to implement decentralised authentication, and we'll use them to get rid of the CAS server, and allow an user to authenticate to a service without having to talk that often with the authentication service.

## Digital workspace

In most school (and organisations, in general), students have access to a digital workspace, which really is a set of services directed to them (lectures' PDFs, mails client, courses planning, etc). In most cases, all these services are designed and built by different companies, in different ways, and with different authentication processes. To authenticate them, schools usually use a Central Authentication Service (or CAS) which will interact with a directory server (usually LDAP) and will verify the identity of an user. This is all explained in the [CAS protocol](https://apereo.github.io/cas/5.0.x/protocol/CAS-Protocol.html).

## Repository content

At the time this file was written, the repository contains the following directories:

* `auth` is a small authentication server written in Node.js. In our very simple case, it will only ask for an username, but we can think of improving it to interact with a LDAP server. Once the user authenticated itself, it server will place a Macaroon in the user's browser, with a status caveat, depending on the route used:
	* If the user authed on `/`, they will have the "student" status.
	* If the user authed on `/teacher`, they will have the "teacher" status.
* `service1` is a PHP service which authenticate an user based on their Macaroons, and only allow a teacher to access it.

Please keep in mind that, although this might not a very impressive use of Macaroons, it is still a work in progress.

## Try it out

For now (not sure it'll last), you can try the whole thing at https://ent.brendanabolivier.com/, by adding the desired service in the URI (`/auth` for the authentication server, `/service1` for the PHP service). Connections aren't logged on this server.

Why don't you try heading out on https://ent.brendanabolivier.com/auth/, logging in, then accessing https://ent.brendanabolivier.com/service1/? :wink:

Then you can try out authing on https://ent.brendanabolivier.com/auth/teacher and re-trying accessing `service1` :smile:
