---
title: Full CRUD App, with Views, Deployed
type: lab
duration: "1:25"
creator:
    name: Gerry Mathe
    city: LA
competencies: Server Applications
---


# Full CRUD App, with Views, Deployed

## Introduction

> ***Note:*** _This can be a pair programming activity or done independently._

General Assembly is opening a paperback library - yes, it's true (not really). Let's create another Rails app from scratch that will allow our librarian to easily keep inventory of our books.  This app will keep records and show our books, the authors, and book categories, as well as the relationships that exist between each.  Since our librarian loves quick styles, try to add Twitter bootstrap to make your app pretty with minimal effort!

## Exercise

#### Requirements

- Create a Rails app
- Create:
	- An `Author` model with these attributes:
		- first_name (String)
		- last_name (String)
		- dob (Date)
- A model `Book` with these attributes:
    - title (String)
    - summary (Text)

- A model `Category` with these attributes:
    - name (String)

- Associations
  - An Author has many Books
  - A Book belongs to an Author
  - A Book has many Categories
  - A Category has many Books
- Deploy this app on Heroku
- Make sure each resource has CRUD functionality as well as RESTful routes and the corresponding views

**Bonus:**
- Add Twitter bootstrap
- Show all the books associated with a category on the `category#show` page
- Show all the books associated with an author on `author#show` page


#### Deliverable

Check the [solution code](solution-code) and look below for how to structure your show pages:

<p align="center">
<img src="http://s1.postimg.org/eft4upd0f/deliverable_2.png">
</p>

## Additional Resources

- [Twitter Bootstrap Gem](https://github.com/seyhunak/twitter-bootstrap-rails)
- [Twitter Bootstrap Documentation](http://getbootstrap.com/components/)
- [Stackoverflow answer for HABTM views](http://stackoverflow.com/a/27342791/503202)
