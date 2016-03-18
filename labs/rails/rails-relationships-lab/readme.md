---
title: Building a Rails app with relationships
type: lab
duration: "1:25"
creator:
    name: Gerry Mathe
    city: LA
competencies: Server Applications
---


# Building a Rails app with relationships

## Introduction

> ***Note:*** _This can be a pair programming activity or done independently._  Instructors may want to do a short lesson on strong params, the Rails console, and migrations in Rails.

Technically, this will be the first time you use relationships in Rails, but you have already connected models using ActiveRecord and created table relationships so this should be easy!

Though the file and folder structure in Rails and Sinatra is different, all the code in the models will be exactly the same!  The commands to create migrations are just about the same too:

```bash
rails g migration MigrationName
rake db:migrate
```

For this lab, build a Cookbook app with several models that interact with one another.

## Exercise

#### Requirements

- Create a Rails app
- Create a model `Recipe` that has these attributes:
	- name (string)
	- instructions (text)
	- servings (integer)
- Create a model `Course` with one attribute: `name` as a string
- Link `Recipe` and `Course` so that a Course has many recipes and a Recipe belongs to a Course
- Be sure to create the RESTful controller actions and the corresponding routes
- Test if the associations work in the console - instead of typing ```tux``` from the command line, use `rails c` for a Rails app
- Finally, set up the appropriate views

**Bonus:**

- Create a model `Ingredient` with a has_and_belongs_to_many relation between Recipe and Ingredient
- Give the option to add Ingredients to Recipes in the views

#### Deliverable

If you include the bonus, and add a few ingredients and courses, your `recipes/new` endpoint should look like this:

<p align="center">
<img src="http://s10.postimg.org/ifjhdgi6x/Screen_Shot_2015_07_18_at_8_53_11_PM.png">
</p>

## Additional Resources

- [ActiveRecord docs](http://guides.rubyonrails.org/association_basics.html)
