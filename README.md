# Nicolas Urruy back-end assigment Altran

Clone the project
```
git clone https://github.com/nurruty/backend-end-assigment.git
```
Access the project's folder
```
cd back-end-assigment
```
Install dependencies
```
npm install
```
or
```
yarn install
```

Run 
```
npm start
```
The API will be listening at http://localhost:8080/api  

## Endpoints
User data by Id: http://localhost:8080/api/users/:id  
User data by Name: http://localhost:8080/api/users/name/:name  
Policies linked to a user:  http://localhost:8080/api/policies/user/:name  
User linked to policy: http://localhost:8080/api/users/policy/:policyId  

# Testing
For unit tests run:

```
npm run test:unit
```

For integration tests run:
```
npm run test:features
```
To run all:
```
npm run test
```

# Solution
The project is based on the concepts of DDD and Clean Architecture. The idea behind this approach is to put the domain at the center of the problem. The domain folder has the two classes that represent the two entities of the problem, Users and Policies. From the point of view of the policy, the user is the client who owns the policy, so a clientId referencing its identifier is added to the Policy entity definition. This entities do not know about anything else in the system but themselves.

Then, there is a layer of application services (app folder), which implement the 4 use cases requested. Each service knows the entities of the domain and relies on repositories (presented below) to obtain the actual information and then return the data to whoever has executed it.

Is the infrastructure layer (infra folder), which will be in charge of accessing the web services and obtain the data. Repositories are an abstraction of this layer that allows communication with the application services.

Finally, for the services to be accessible from outside the system, there will be a series of interfaces (or adapters) that facilitate this task. In this case, an access via http is implemented, based on the express library, which will be in charge of receiving the HTTP requests and routing them to the corresponding application services.

Data between layers is passed via objects. Therefore, there are different mappers that transform data from one layer to another. 

The intention of using this architecture is to best fullfill the system requirements and to achieve a robust, testable and scalable solution. SOLID principles are mostly present by default when using this architecture design, however, NodeJS has a restriction regarding the D, dependency inversion. NodeJS does not have interfaces (which would let objects depend on interfaces instead of specific implementations) which increases the coupling in the system.
What can be done to mitigate this situation is to use dependency injection. In order to achieve that the library awilix was used. It creates a container, where all the system components are loaded and then injected into the constructors of the classes that use them.


# About the constraints
One constraint is that the Authorization and Authentication has to be done from the client's web service. This raises a particular situation which is, to verify the user's role, it must first be obtained from the repository, which basically implies executing the use case 2 times, especially in the use case that is invoked by policy number. Therefore, although it is perhaps not the most appropriate approach from the point of view of the separation of responsibilities, I chose to do the authorization validation within the execution of each service.

# The DB
Finally, it is asked at the end of the assigment, how to get to use a database. One of the most valuable aspects of clean architecture, and especially of the use of repositories, is that the system becomes agnostic of persistence. What today is a call to 2 web service, can easily become a query to a BD without having to touch the rest of the code.

# Technologies
The API is written in NodeJS (v. 12.9.0), express (v. 4.17.1), awilix (v. 3.0.9)
