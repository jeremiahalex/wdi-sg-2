---
title: Modeling Relationships
type: lesson
duration: "1:25"
creator:
    name: Gerry Mathe
    city: London
competencies: Server Applications
---

>Note: Instructors going by baseline sequence should include a review of the Sinatra weekend lab prior to teaching this lesson.

# Modeling Relationships

### Objectives
*After this lesson, students will be able to:*

- Build models with has_many, belongs_to, has_and_belongs_to_many, and has_many :through
- Describe macros that match different relationship types

### Preparation
*Before this lesson, students should already be able to:*

- Create models that inherit from ActiveRecord
- Explain and generate migrations
- Describe a relational database

## Why are relationships important? Intro - 15 mins

A hefty part of designing a relational database is dividing the data elements into related tables. Once you're ready to start working with the data, you rely on relationships between the tables to pull the data together in meaningful ways. For instance, order information is useless unless you know which customer placed a particular order.

By now, you probably realize that you don't store customer and order information in the same table. Instead, you store order and customer data in two related tables and then use a relationship between the two tables to view each order and its corresponding customer information at the same time. If normalized tables are a relational database's foundation, then relationships are the cornerstone.

####Relationship types

An association, in this context, is a connection between two ActiveRecord models. Associations are implemented using macro-style calls, so that you can declaratively add features to your models. For example, by declaring that one model belongs_to another, you instruct your application to maintain Primary Key-Foreign Key information between instances of the two models, and you also get a number of utility methods added to your model.

- ```has_many``` - Indicates a one-to-many connection with another model. This association indicates that each instance of the model has zero or more instances of another mode.
- ```belongs_to``` - A belongs_to association sets up a one-to-one connection with another model, such that each instance of the declaring model "belongs to" one instance of the other model.
- ```has_and_belongs_to_many``` - A has_and_belongs_to_many association creates a direct many-to-many connection with another model, with no intervening model.
- ```has_many :through``` - A has_many :through association is often used to set up a many-to-many connection with another model. This association indicates that the declaring model can be matched with zero or more instances of another model by proceeding through a third model.

Let's explain and create these relationships in the context of our application.

## Describe the app and database we're building - Demo - 5 mins

#### The database for this association

The purpose of this application is to show the different kinds of relations between models with ActiveRecord. We will use Tunr app again.  Remember our models:

* A model Artist
* A model Album
* A model Genre

The relationships will be:

* Artist has many albums
* Artist has many genres through albums
* Album belongs to an artist
* Album has many genres
* Genre has many albums
* Genre has many artists through albums

Take a look at your [starter_code](/starter_code). For our purposes, we're going to keep the empty models and the migrations.

> Note: Describe require_relative, controllers if needed, auto_reload, and app

#### Setup the app

To setup the app we need to:

```bash
$ bundle
$ rake db:create
$ rake db:migrate
$ rake db:seed

# If there is already a database from the previous lesson, you might want to

$ rake db:drop
```

## Create Associations - Code Along - 30 mins

We create relationships with ActiveRecord by adding functions to the models to define what other tables the model is related to. Then, ActiveRecord will take care of of almost everything - by creating relationships in your database - and then populating the foreign_keys columns in the appropriate tables. It will also provide a bunch of useful, dynamic methods for every instance of the model, making it really easy to retrieve data from other models associated with this instance.

#### Create a has_many - belongs_to

An album will always belong_to an artist. Therefore, if we create two albums and assign them to the same artist, we will be able to list these two albums for this specific artist.

Let's open the model Artist and the model Album.

To retrieve all the albums related to a specific artist, we can use the method artist_id in the table albums:

```ruby
artist = Artist.find(1)
albums_for_artist = Album.where(artist_id: artist.id)
```


Then we can apply the inverse logic to retrieve the artist corresponding to an album

```ruby
album = Album.find(1)
artist_for_album = Artist.find(album.artist_id)
```

This logic works, but it's a lot of code, active record will allow us to do all these actions in one line, but first, we need to tell ActiveRecord what the relations are.

Take a look back at the database structure: the albums table has a column artist_id.  Based on this column name and the code we will add to the models, ActiveRecord will know that this column contains a foreign key and use it behind the scene to link artists and albums.

Update the models like this:

```ruby
class Album < ActiveRecord::Base
  belongs_to :artist
end


class Artist < ActiveRecord::Base
  has_many :albums
end
```

That's all you need to do! If the database structure follows the ActiveRecord conventions, a foreign_key in a table has a name corresponding to the resource that the foreign key refers to plus `_id` (`book_id`, `user_id`, `contract_id`) and the code in the models identifying the `has_many` model and the `belongs_to` model (the `belongs_to` model is ALWAYS the one hosting the foreign key).

Now, to get the albums related to an artist record, just type:

```ruby
Artist.find(1).albums
```

and to find the artist related to an album:

```ruby
Album.find(1).artist
```

That's it! Given that the relationship between the Artist and Album class is a has_many, ActiveRecord will always return an array, even if there is no corresponding result. On the other hand, when we ask for an artist related to an album, the result will always be an artist instance, and you'll notice that the orthography of the methods correspond with this logic too (`albums`, `artist`).

Don't try to overthink it. As a developer, focus on how to use ActiveRecord.


#### Create a has_and_belongs_to_many

A has_and_belongs_to_many association creates a direct many-to-many connection with another model, with no intervening model. For example, if your application includes cars and parts, with each car having many parts and each part appearing in many cars, you could declare the models this way:

```ruby
class Car < ActiveRecord::Base
  has_and_belongs_to_many :parts
end

class Part < ActiveRecord::Base
  has_and_belongs_to_many :cars
end
```

We said when we listed the associations that a genre would have many albums and an album can also have many genres. We will, therefore, need to create a join table to link the resource album and the resource genre.

####Why a join table?

If you create a has_and_belongs_to_many association, you need to explicitly creating a joining table. Why?  It’s simple. Join tables bridge the relationship between two resources that both have many of the other. If one resource has_many and the other belongs_to, you don’t need a join table, because it can be mapped out in two tables no problem. When they both has_many of each other, you need a third table because it creates a third dimension.

> Note: It could help to draw creating a join table between parts and cars or albums, genres on the board.

To create a join table for albums and genres, we need to add another table in the database, let's create a migration:

```bash
rake db:create_migration NAME=create_albums_genres_table
```

Then inside the migration:

```ruby
class CreateAlbumsGenresTable < ActiveRecord::Migration
  def change
    create_join_table :albums, :genres
  end
end
```

Then run the migration:

```bash
rake db:migrate
```

Now, we will need to update the models:

```ruby
class Album < ActiveRecord::Base
  belongs_to :artist
  has_and_belongs_to_many :genres
end

class Genre < ActiveRecord::Base
  has_and_belongs_to_many :albums
end
```

Now in the terminal, you can check that everything is set properly:

```ruby
album1 = Album.first
album2 = Album.last
genre1 = Genre.first
genre2 = Genre.last

album1.genres
#=> []
album1.genres << genre1
album1.genres
# now return an array containing 1 genre object
```

The code above shows that an album can be associated with many genres and vice-versa: a genre can be associated to many albums.

##Independent Practice - Add another association - 20 mins

> *The solution-code Contains the models and the controllers*

We've added a few associations to our app, however, we still need to add an relationship between Artist and Genre. This kind of relationship is called `has_many :through` .

Take to the web and try to implement this association so that we can list all the genres for an artist and all the artists for a genre like this:

```ruby
artist = Artist.last
genre = Genre.first

# you should be able to call these methods
artist.genres
genre.artists
```

For this relationship, *you just need to add methods in the models, but you do not need to change the database structure!*

[This guide](http://guides.rubyonrails.org/association_basics.html) about ActiveRecord contains all the details about the different types of relationships.  Use it for this exercise.

## Conclusion (5 mins)
Review the solution to the previous independent practice activity. Then discuss these questions:

- Describe why we need a join table for a has_and_belongs_to_many relationship?
- What is the name of the columns in the database which stores an id from another table?
- What is the command that executes the migrations to your database?
