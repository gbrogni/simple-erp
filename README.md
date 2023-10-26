Running the project

You need to install each project dependencies, so you need to open 2 terminals, one in each folder and run the command npm i in each folder:

The database are centralized on the docker-compose on the backend folder, so you have to spin it as the first step.

docker-compose up

Then you can run the api and app running in each terminal:

npm run dev


What would be my firts improvements if I had more time:

- Implement tests in both projects;
- Build the backend with a better structure;
- Create validations;


Thinking about adding more categories, as it stands today, it would only be necessary to add the new options to the frontend options list and incorporate these options into the function that calculates the promotional price on the backend.

I would structure the database and data structure for categories to have a list of product IDs. Then, every time a category is changed, there would be a function to recalculate the prices of the products and save them in the database.
It would be a one-to-many relationship from one category to multiple products.
