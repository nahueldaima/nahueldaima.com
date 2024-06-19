---
title: 'AWS Lambdas and Microservices: The First Step to Scaling Your Infrastructure at Low Cost'
date: '2024-06-18'
description: We started working with microservices four years ago. Today, we have over 200 of them performing various critical business processes, but the path had a few bumps.
image: /the-first-step-to-scaling-your-infrastructure-at-low-cost-nahuel-daima.jpg 
alt: The First Step to Scaling Your Infrastructure at Low Cost With AWS Lambdas
ogImage: the-first-step-to-scaling-your-infrastructure-at-low-cost-nahuel-daima.jpg 
tags: ['devops', 'aws']
equivalent: escalar-infraestructura-a-bajo-costo-con-aws-lambdas
published: true
---

I want to share with you our experience at [Tookane](https://tookane.com/) of how we transitioned from a monolithic architecture to multiple [Lambdas](https://aws.amazon.com/pm/lambda/) on AWS, scaling up to millions of deliveries effortlessly.

### Transition to Microservices
We started working with microservices four years ago. Today, we have over 200 Lambdas performing various critical business processes, enabling us to meet growing demand at a low cost.

Before diving into each step, let's start with the fundamentals:

## Fundamentals of Microservices
Microservices are a way to build software applications by dividing them into small, independent parts that communicate with each other. Instead of having a large monolithic application where all the code is together, each microservice handles a specific business function and can be developed, deployed, and scaled independently.

Imagine you're building an app, but instead of having all the code in one place, you split it into small pieces. You could have a microservice for user authentication, another for data exports, and another for communication with third-party APIs. Each of these services can be developed in different languages or technologies, and if you need to improve or deploy a change in one of them, you can do so without touching the rest of the application.

Another advantage is that if a microservice fails, it doesn't bring down the entire app, and you can allocate more hardware resources only to the parts that need them, making it more efficient. This is crucial to avoid having to hire more powerful servers (vertical scaling) or more servers (horizontal scaling) as more users consume the application.

### Use Case: PDF Generation
For example, our first microservice was a function that generates PDFs from an HTML template, returning the document ready to be sent to the user. This functionality was incorporated into our monolith but couldn't handle multiple simultaneous executions; just a couple of users printing PDFs at the same time would exhaust the server's resources. After migrating this to a microservice, we can now generate thousands of documents simultaneously and only pay for the time those services are running.

## AWS Lambda - Functions as a Service
Lambda is an Amazon Web Services service that allows you to run code as a service. In other words, you can move a piece of the application's code, such as a specific function or a complete service, and place it inside a Lambda. You can then run it on demand, and AWS only charges you for the time it was running.

AWS Lambda is perfect for a microservices architecture because it offers several technical advantages:

- **Automatic Scaling:** It scales automatically based on demand up to tens of thousands of simultaneous executions. As the events triggering Lambda functions increase, the service automatically handles the creation of new instances to meet the demand without needing to provision servers or intervene manually.

- **Simplified Deployment and Code Management:** With AWS Lambda, developers only need to focus on the function's code, which can be programmed in C#, Go, Java, Node.js, PowerShell, Python, and Ruby. When we want to publish a change, we simply deploy the code in question without needing complex pipelines or manual processes.

- **Fault Tolerance:** AWS Lambda uses a managed infrastructure to run functions efficiently. When a function is invoked, AWS Lambda downloads the function's code, provisions the necessary resources (such as containers) to run the code, and executes the function. Any potential failures that might come from the infrastructure are automatically and transparently handled by the service, whether by retrying automatically, managing containers and their lifecycle, or distributing the infrastructure globally to ensure maximum availability.

## Could an Application Be 100% Lambdas and Serverless?
The short answer is: "Yes, but..."

We learned how to do it but also that it wasn't the most suitable for us. After migrating the heaviest functions from our monolith, we started imagining an ideal world where the entire application is in microservices and we only pay for the usage each client makes. Simplified, a software application handles:

- Routes (various endpoints)
- Authentication, permissions, and access control
- A database with business information
- Files
- Security
- All the functions/services that address our users' needs.

### Initial Implementation and Pilot Test
We explored [API Gateway](https://aws.amazon.com/api-gateway/) for managing routes, IAM and [Cognito](https://aws.amazon.com/cognito/) for controlling permissions and users, and S3 for hosting files. 

Before implementing it in productive functionalities, I conducted a pilot test over a weekend to validate that the idea was viable and that we could effectively create a 100% microservices application. 

[***Here’s a link to the GitHub***](https://github.com/nahueldaima/aws-microservices-demo-personal-finances/) project for you to see the pilot I did for the backend of a personal finance application.  


## Main Learnings and Challenges

### Cold Start
Lambdas are not servers with the application always on; they are literally a piece of code that needs to be inserted somewhere to execute. 

AWS retrieves that code from a repository, initializes a virtual container, provisions it with resources, inserts the code, and executes it. All that takes time. A user making a request to update their profile information went from 300 ms in our monolith to 2.5 seconds in the new architecture. 

AWS performs some optimizations if we invoke the same Lambda within a short period, reusing the already initialized container. 

This means that the first user to request the service had to wait a few seconds while the subsequent ones did not. But if no one invoked the service for some time, the next user would again face a cold start. 

AWS offers the option to pay for a permanently provisioned Lambda to compensate for this, but at a higher cost than having an EC2 instance containing the entire application.
<br><br>

### Constantly Running Lambdas
Lambdas are designed to turn on, resolve a function, and then turn off. Using them for functions that run constantly can quickly exhaust the benefits and increase costs. 

Our first mistake was using this service to process a message queue containing logs that we wanted to insert into Cloudwatch and a database. 

Since our entire application generates information to be logged, that message queue quickly grew to hundreds of thousands of messages, and the Lambda handling this process was constantly running. 

We quickly exhausted AWS's free tier, and that month's bill was very high. We resolved this by migrating the function to a small server, which handles lightweight microservices that need to be always on. 

Now we pay the minimum possible for an EC2 instance.

<br>

### Timeout Issues
Lambda allows configuring RAM and a maximum execution time for the microservice, which, if not completed, will be cut off and exit with an error. 

One Friday, from an airport in Brussels, minutes before starting a 14-hour flight to Japan, I deployed a Lambda that had to process a series of messages received from our integrations with logistics operators, translating, classifying, and attaching them to each shipment. 

This function was going to receive many messages simultaneously, and the processing could be slow. To ensure it would finish in all cases, I configured a 15-minute timeout (the maximum AWS allows for a Lambda). 

The code looked good, the tests were correct, I deployed the code, and went on my trip. 

On Monday morning in Asia (still night in Europe), reviewing the performance, I found that there was an execution error and that the way I had implemented my code, the Lambda never finished executing. 

Each time this microservice was called, a Lambda remained on for 15 minutes. 

**A disaster. Two days at that rate cost thousands of euros**

I learned two things:

> Don’t deploy on Fridays (especially before boarding an airplane).

> If a microservice requires more than 3-4 minutes to resolve the function, Lambda is probably not the best alternative.

<br>

### Payload Limitations

Payload refers to the information sent to a Lambda for execution and what it returns as a response. This is not unlimited; as of now, the maximum is 20 MB. 

Some of our functions performed adequately on a small scale, but as more and more users began to consume our microservices, we encountered architectures that ended up trying to send several megabytes to Lambda or responding with large payloads. 

For example, we tried retrieving some logistics documents from a carrier that stores them on an FTP. 

Initial versions sent a few dozen shipment numbers to the Lambda to gather the files and retrieve the documents, working perfectly when returning 15 or 20 small PDFs. 

When our application scaled, and we started sending hundreds or thousands of shipments, we could no longer return the files in the response without violating the payload limit. 

Our solution had two parts:
- Invoke more Lambdas simultaneously but with smaller payloads.
- When this was not viable due to the nature of the microservice, we uploaded the information to a temporary file in S3 and exchanged the access URI.

<br>

### Reusing Code in Multiple Lambdas

When programming multiple microservices, you will encounter small functions needed in more than one Lambda. 

A novice developer might copy that function to each Lambda that needs it, but this is not a recommended practice. 

Lambda provides a way to share code between different microservices through "layers." It involves creating a repository in AWS Lambda, uploading a set of functions, and then in each Lambda configuration, referencing them in the "layers" section. 

What AWS does behind the scenes when provisioning a Lambda is, in addition to retrieving the microservice code, it fetches all linked layers, retrieves that code, and puts everything in the runtime before executing the function. 

An added advantage of these layers is that they maintain their versioning. When we reference them in Lambda, we always specify which version, ensuring that even if we update a layer, it doesn't affect the microservice using a previous "stable" version. 

This approach was efficient for the first two years, but the layers grew in code size over time. 

Initially, we separated some functions by affinity and created more than one layer, but eventually, we encountered another AWS limitation: 

The microservice code size, plus any additional library, plus the generic layer, cannot exceed 250MB. If you have a generic layer with third-party libraries and others needed specifically for your microservice, you can quickly reach the limit. 

We resolved this by migrating our layers to our repositories and only installing the necessary functions and packages in the Lambdas without injecting the entire layer with its code or all libraries in each execution.
<br><br>

### The AWS Bill and Its Unknown Items
By the third year, after each optimization, learning, and redesign of the architecture, we ended up with a beautiful swarm of microservices that solved our application's main problems. 

**But AWS had one more trick up its sleeve. A strange charge appeared on our bill: "EC2-Other."**

Month by month, as we scaled the number of shipments in [Tookane](https://tookane.com/), this bill item kept growing. AWS bundles several cross-service items into this category. After some calls with AWS for clarification and investigating the documentation, we couldn't pinpoint what was causing this increase. 

We hired [Pelado Nerd](https://peladonerd.com/), a Sys Admin consultant, who helped us understand the issue. 

AWS charges for all the internet traffic the infrastructure uses, and sending data to a microservice, downloading libraries with each invocation, and returning large amounts of processed data meant terabytes of traffic each month. 

Yes, AWS charges for the internet you consume. 🙁 

We partially solved this by placing all Lambdas within a private network and trying to minimize external traffic, but this is the only point pending to achieve a nearly "free" microservices infrastructure.

### Last Thoughts
If you're considering using AWS Lambdas and microservices, I hope our experience is helpful. The benefits are significant, but there are challenges that need to be carefully managed. 

If you have any questions or need examples, feel free to contact me. I'll be happy to help you.