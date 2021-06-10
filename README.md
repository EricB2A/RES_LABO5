# RES_LABO5

## Tâche 1 : design the application architecture and protocols
### How can we represent the system in an architecture diagram, which gives information both about the Docker containers, the communication protocols and the commands?
### Who is going to send UDP datagrams and when?
### Who is going to listen for UDP datagrams and what should happen when a datagram is received?
### What payload should we put in the UDP datagrams?
### What data structures do we need in the UDP sender and receiver? When will we update these data structures? When will we query these data structures?

## Tâche 2 : implement a "musician" Node.js application
### In a JavaScript program, if we have an object, how can we serialize it in JSON?
### What is npm?
### What is the npm install command and what is the purpose of the --save flag?
### How can we use the https://www.npmjs.com/ web site? 
### In JavaScript, how can we generate a UUID compliant with RFC4122?
### In Node.js, how can we execute a function on a periodic basis?
### In Node.js, how can we emit UDP datagrams?
### In Node.js, how can we access the command line arguments?

## Tâche 3: package the "musician" app in a Docker image
### How do we define and build our own Docker image?
### How can we use the ENTRYPOINT statement in our Dockerfile?
### After building our Docker image, how do we use it to run containers?
### How do we get the list of all running containers?
### How do we stop/kill one running container?
### How can we check that our running containers are effectively sending UDP datagrams?

## Tâche 4: implement an "auditor" Node.js application
### With Node.js, how can we listen for UDP datagrams in a multicast group?
### How can we use the Map built-in object introduced in ECMAScript 6 to implement a dictionary?
### How can we use the Moment.js npm module to help us with date manipulations and formatting?
### When and how do we get rid of inactive players?
### How do I implement a simple TCP server in Node.js?