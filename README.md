Running the project

You need to install each project dependencies, so you need to open 2 terminals, one in each folder and run the command npm i in each folder:

Node version: 18.18.2

The database is centralized in the docker-compose file in the backend folder, so you should have Docker on your machine and run it as the first step.

docker-compose up -d

Then you can run the api and app running in each terminal:

npm run dev

What would be my firts improvements if I had more time:

- Implement tests in both projects;
- Create validations;
- Improve the design of the frontend;
- Create ErrorHandlers;
- Implement the update functions in frontend, because in the backend it is already implemented;

In my current solution, it is possible to add new categories, and once you created a new category, when you try to create a new product, that category will be there.

The only thing that needs to be done is to implement the update functions on the frontend because in the backend, when changing a category, there's a part where it checks if there are any products with that category, and recalculates the product's price.