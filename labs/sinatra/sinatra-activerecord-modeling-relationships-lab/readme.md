---
title: Relationships Models Lab
type: lab
duration: "1:25"
creator:
    name: Gerry Mathe
    city: London
competencies: Server Applications
---

# Relationships Models Lab

We know how to create an app using MVC architecture, and we've discovered ActiveRecord, which allows us to manipulate records and associations in the database really easily. For the next two lab sessions, we're going to build a Cookbook app, and this is part one.

By the end of part one, you should be able to create records and associations in the Sinatra console (`tux`).  

Generate and run the migrations and create the models with all the associations so that it is possible to link the models in the console.

Do not worry about creating controllers and views - we'll do that in part two.

## Exercise

#### Requirements

- Create a model Recipe with these fields:
  - title (String)
  - description (Text)
  - servings (Integer)
- Create a model Course with these fields:
  - title (String)
- Create a model Ingredient with these fields:
  - name (String)
- The associations are as follows:
  - A recipe belongs to a course
  - A recipe has many ingredients
  - A course has many ingredients through recipes
  - A course has many Recipes
  - An ingredient has many recipes
  - An ingredient has many courses through recipes

**Bonus:**
- Create a few records of seed data for each model and run the seed rake task

#### Starter code

Grab the [starter-code](starter-code) to get started.

#### Deliverable

Once you're finished, from your app's root directory, you should be able to run the following commands to create your database:

```bash
bundle exec rake db:create
bundle exec rake db:migrate
```

Then, in the Sinatra console (`tux`), you should be able to type the following commands:

```ruby
r1 = Recipe.create title: "pizza", description: "some crust and some toppings", servings: 4
r2 = Recipe.create title: "pasta", description: "tastier with bolognese", servings: 3
i1 = Ingredient.create name: "tomatoes"
i2 = Ingredient.create name: "beef"
c1 = Course.create name: "main"
r1.course = c1
r1.save
r2.course = c1
r2.save
c1.reload
c1.recipes #should return an array containing 2 recipes
r1.ingredients << i1
r1.ingredients << i2
r2.ingredients << i1
r2.ingredients << i2
i1.reload
i1.recipes # should return 2 recipes
i1.courses # should return 2 courses
```

If you do not get errors running these commands, your app is ready for the second part of the lab!

## Additional Resources

- A link to [the official associations docs](http://guides.rubyonrails.org/association_basics.html)
