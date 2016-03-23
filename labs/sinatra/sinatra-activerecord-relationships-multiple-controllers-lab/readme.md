---
title: Relationships with Multiple Controllers
type: lab
duration: "1:25"
creator:
    name: Gerry Mathe
    city: London
competencies: Server Applications
---

# Relationships with Multiple Controllers

For part two of our Cookbook app, we're going to set up our app to allow users to perform CRUD operations on recipes, courses, and ingredients from a web interface.  Create the controllers with RESTful resources as well as the corresponding views, so users can CRUD.


## Exercise

#### Requirements

- Create recipes, courses, and ingredients controllers, each with seven RESTful routes and the appropriate functionality. Specifically:

  - The edit, show, index, and new actions should render the corresponding views
  - The update, post, and destroy actions should redirect appropriately
  - Look to your Tunr application for inspiration

- Create an edit, index, new, and a show page for each of the models you created in the previous section.
- Your navigation should include a link to all of the index pages as well as the `/new` actions for each model
- Your index page should allow a user to delete each record
- Your show page should link to the edit page

**Bonus**: Make your Cookbook pretty!

#### Starter code

Grab the [starter-code](starter-code) to get started.

#### Deliverable

From a functionality standpoint, your `recipes/new` page should look like this, if you don't “prettify” it:

<p align="center">
  <img src="http://s29.postimg.org/szn16lg1j/Screen_Shot_2015_07_17_at_5_31_25_PM.png">
</p>

## Additional Resources

- A link to the official [associations docs](http://guides.rubyonrails.org/association_basics.html)
