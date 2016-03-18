---
title: Building Models with ActiveRecord & Migrations
type: lesson
duration: "1:25"
creator:
    name: Gerry Mathe / Jay Nappy
    city: NYC
competencies: Relational DBs
---

# Building Models with ActiveRecord & Migrations

### Objectives
*After this lesson, students will be able to:*

- Create a class that inherits from ActiveRecord
- Create a table schema to describe the class/model in our database
- Write a migration to update our model with new attributes
- Write a migration to change our model's attributes
- Write a migration to delete a model's attribute

### Preparation
*Before this lesson, students should already be able to:*

- Explain the concept of MVC
- Create a Rails-like folder structure in a Sinatra app
- Define what object properties and methods are
- Write getter and setter methods to get retrieve and set property values


## Wait, what are Models? - Intro (15 mins)

#### Refresh on Models

We have used Sinatra to create simple applications. However, we can apply the design pattern of MVC to make more complex applications. When we designed classes - or models of objects - we said we were 'modeling' them. So, our models allow us to deal with objects in our code.

> Note: It could be helpful to draw the request/response cycle diagram and talk through how MVC fits in.

#### But objects are just a collection of data, how can we map them to a relational database?

Well, that's where ORMs come in.  ORM stands for: Object Relational Mapping, and it's a technique that connects the rich objects of an application to tables in a relational database management system. Let's draw on the board how a user object, instantiated from the User class, could map to a Users table in our database.

Let's pretend we have a User class with the attributes id, name, age, and address:

```ruby
class User
  attr_accessor :id, :name, :age, :address
end
```

And let's pretend that we create a new user, Rob stark, whose object is shown below:

```ruby
=> #<User:0x007fc8b18c5718 @address="1 Winterfell Lane", @age=16, @id=1, @name="Rob Stark">
```

With an ORM, we're able to take that instance of class User and map it to our relational database:

```psql
 id |   name    | age |                      address                       | king?
----+-----------+-----+----------------------------------------------------+-------
  1 | Rob Stark |  16 | 1 Winterfell Lane                                  | t
(1 row)
```

Using ORMs, the properties and relationships of the objects in an application can be easily stored and retrieved from a database without writing SQL statements directly and with less database access code, overall.

#### An Actively Awesome ORM: ActiveRecord

Taken from [rubyonrails.org](guides.rubyonrails.org/active_record_basics.html):

Active Record, as an ORM Framework, gives us several mechanisms, the most important being the ability to:

- represent models and their data
- represent associations between these models
- represent inheritance hierarchies through related models
- validate models before they get persisted to the database
- perform database operations in an object-oriented fashion

Active Record is the M in MVC - the model - which is the layer of the system responsible for representing business data and logic.

This will all make a lot more sense once we start using it...so, let's start using it!


## Requiring and using ActiveRecord - Demo (10 mins)

> Instructor Note: Send over the starter code

We're a successful talent management agency, Tunr, and we have designed a Sinatra app to manage our artists. Let's take a look at our app.rb & config.ru files.  Talk with a partner for a minute and discuss differences from our Sinatra apps in the beginning of the week as well as what you think each line does and how they relate to the rest of the app.

> Note: Read through the app.rb & config.ru files and point out the comments below and how they reflect each code segment; ask students to add this to their code; and point out that ActiveRecord is a gem


Do you notice any odd methods in the seven restful actions? I do:

```ruby
Artist.all #what?
Artist.create(params[:artist]) #who?
Artist.find(params[:id]) #nah uh!!
```

We get all these awesome methods - that we don't have to write ourselves - and we can call them on our Artist class; and this is all possible when we require ActiveRecord (yes, it's just another gem!)

## Setting up a class and our DB with ActiveRecord - Codealong (15 mins)

These ```.all``` ```.find``` ActiveRecord methods will write the SQL for us, and since we've connected our database, we can pull any data we need real, real easily.  But before we can, we have to set up our file and classes to use ActiveRecord and a database to talk to:

#### Get the ActiveRecord library

ActiveRecord is a gem!  But since we're building an app with a bunch of gems, we'll use Bundler. We'll only specify gems that we need, but for now, let's `bundle init` in the app's root directory and add:

```ruby
source "https://rubygems.org"  #tells your app where to get the gems from
gem "sinatra", '1.4.0' #allows us to use and run Sinatra
gem "sinatra-activerecord" #allows us to use Sinatra with ActiveRecord  
gem "rake" #gives us tasks and dependencies that can be specified in standard Ruby syntax (don't worry about it if you don't get it)
gem "activerecord" #gives us all the excellent class methods you see above (and more) and allows for object relational mapping
gem "pg" #allows us to use postgresql as a DBMS for our app
gem "tux" #allows us to have an interactive shell to play with object creation
```

And don't forget, what do we do every time we modify the Gemfile? `bundle install`!

#### Database configuration

Now, all our gems from the Gemfile are already being required thanks to the first few lines of `config.ru`, so that's great.

But we're about to start using a SQL database, so we gotta configure our Sinatra application so it knows how to do that.

Let's make a folder called `config` in the root directory. And inside that, `touch config/database.yml`. YAML is a nice little format that essentially works like a Ruby hash, but is written in plaintext. Key-value. Great for configuration, it'll be super easy.

```yaml
development:
  adapter: postgresql
  database: tunr_development
```

The name of the database is up to you, but `something_development` is a good pattern to get into.

That's it – because we used that particular folder & filename & key/values, our `sinatra-activerecord` gem picks that up & automatically uses it. It's really simple.

#### Makin' Models

Now that we're _almost_ configured, let's make a class that uses all this fancy stuff.  Under the models directory, create a file called ```artist.rb``` to allow an Artist class to use ActiveRecord:

```ruby
class Artist < ActiveRecord::Base
end
```

We then need to include this in config.ru:

```
# Models
require './models/artist'
```

So again, this is saying: "We want a class named Artist, and it shall inherit all the code from the Active Record class, which has a bunch of handy methods already written for me."  And now, when you're working with the Artist class, you'll be able to do ```Artist.last``` in your code.  This enables ```Artist.first``` or ```Artist.new()``` or the other methods it has, without any other code having to be written, as long as we have a database.

This is where Rake comes in.

Rake technically stands for 'ruby make', which is a tool we're going to use to do tasks for us. You can program your own rake functions, but ActiveRecord comes with a bunch, and we're gonna use one to create our database in Postgres.

Whereas earlier you learned to do this:

```
$ psql
psql (9.4.1, server 9.3.5)
Type "help" for help.

username=# create database tunr;
CREATE DATABASE
```

Now, we can wrap that up in one terminal command:

`rake db:create`

Run it. Boom, database created.

Now let's boot up our application and see what we get.

```
rackup
```

Start it up, check it out in your browser. Try clicking 'Add Artist' – crap!

![](http://s30.postimg.org/d5bpwkoo1/Screen_Shot_2015_07_10_at_10_42_37_AM.png)

## Error?? Demo (5 mins)

If you read through what this page is actually telling you, you can probably guess why this happened.

Even though we have a database (`tunr_development`) we never created any tables or schema.  We never made a table, just the database!

Just like we used a wonderful Rake command to help us quickly create a database, we have some to help us create tables, too.

> Note: Explain some of the common commands we'll be using and they'll have access to.

```bash
$ rake -T

rake db:create              # Creates the database f...
rake db:create_migration    # Create a migration (pa...
rake db:drop                # Drops the database fro...
rake db:fixtures:load       # Load fixtures into the...
rake db:migrate             # Migrate the database (...
rake db:migrate:status      # Display status of migr...
rake db:rollback            # Rolls the schema back ...
rake db:schema:cache:clear  # Clear a db/schema_cach...
rake db:schema:cache:dump   # Create a db/schema_cac...
rake db:schema:dump         # Create a db/schema.rb ...
rake db:schema:load         # Load a schema.rb file ...
rake db:seed                # Load the seed data fro...
rake db:setup               # Create the database, l...
rake db:structure:dump      # Dump the database stru...
rake db:structure:load      # Recreate the databases...
rake db:version             # Retrieves the current ...
```

## Let's Create Some Data Tables with migrations...and without SQL! Code Along (10 mins)

You'll notice we've already set up a bit of your Rakefile for you – we're basically just using the commands that the ActiveRecord gem has built in. Don't worry about memorizing the code in this file, but _do_ make sure you understand what the commands it gives us do.

The real meat & potatoes here, after creating a database, is to create a _table_.

To create a table we need to create a "migration".  From [rubyonrails.org](rubyonrails.org):

*"Migrations are a convenient way to alter your database schema over time in a consistent and easy way. They use a Ruby DSL so that you don't have to write SQL by hand, allowing your schema and changes to be database independent. You can think of each migration as being a new 'version' of the database."*

Migrations tell your application what goes into your database, and each one is timestamped, so it knows how to walk through them over time. This is crucial, especially when on a team of developers, because it keeps your database up-to-date even when someone else changes it – the computer always has a history of changes via new migration files.

So let's build a new version of our database that has an artists table:

```bash
rake db:create_migration NAME=create_artists

db/migrate/20150710152405_create_artists.rb
```

Keep in mind those numbers will be different for you – it's a timestamp, which is the date & time the file was created.

You'll notice you have to pass a "NAME" parameter to your migration and that a file is created for you in a new db/migrate folder, with the name of your migration and a timestamp. So easy.

Now let's visit the ```db/migrate/20150710152405_create_artists.rb``` and put the finishing touches on our table:

> Note: Explain the block and how it creates the necessary columns.

```ruby
class CreateArtists < ActiveRecord::Migration
  def change
     create_table :artists do |t|
        t.string :name
        t.string :photo_url
        t.string :nationality

        t.timestamps
     end
  end
end
```

Run the migration with ```rake db:migrate```. That'll fetch any migrations it hasn't run yet and run 'em.

```bash
== 20150710152405 CreateArtistsTable: migrating ===============================
== 20150710152405 CreateArtistsTable: migrated (0.0000s) ======================
```

And we have a table! Nice work!  And _now_ you've got a `schema.rb` file – this file is _sacred_. Not to be touched, only to be admired. It's a snapshot of the current state of your database, and rake is the only one who should be modifying it, ever.

If ever you're unsure what a database looks like, browse your `schema.rb`.

```ruby
ActiveRecord::Schema.define(version: 20150710152405) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "artists", force: :cascade do |t|
    t.string   "name"
    t.string   "photo_url"
    t.string   "nationality"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
```

Gorgeous, success! Now we change it.

## Changes to our DB - Demo (10 mins)

Just like we can write migrations to create tables, we can write migrations to add, change or delete attributes, update data types, change table names, and even delete tables.

We decided we want to collect data about the instruments the artists play, so we need to create a migration:

```bash
rake db:create_migration NAME=add_instrument_to_artists
db/migrate/20150710154423_add_instrument_to_artists.rb
```

In ```db/migrate/20150710154423_add_instrument_to_artists.rb```:

```ruby
class AddInstrumentToArtists < ActiveRecord::Migration
  def change
    add_column :artists, :instruments, :string
  end
end
```

You can probably guess what this line - ```add_column :artists, :instruments, :string``` - says: "add a column to the artists table called 'instruments' with a string as its data type".  Run the migration with ```rake db:migrate``` and BAM, you have a new column.

Do this _every_ time you need to change your database – whether it's adding or removing. Changing the database in any way means making a new migration, and telling the computer what you need done. Think of it as an assistant; you don't do the tedious Postgres work, you just tell it what needs doing and tell it to go do it.

#### Changing or deleting column

By now, you've felt the pattern: create a migration, add the appropriate code to the migration, and then run the migration.  Same applies for each time you want to modify your database.  In the case of a updating a column, you would:

```bash
rake db:create_migration NAME=change_column_in_artists_to_new_column
```

In the migration add:

```ruby
def change
  rename_column :table, :old_column, :new_column
end
```

Then:

```bash
rake db:migrate
```

According to [the official ActiveRecord docs](http://edgeguides.rubyonrails.org/active_record_migrations.html), these are all the migration definitions the change method allows you to use in a migration:

- add_column
- add_index
- add_reference
- add_timestamps
- add_foreign_key
- create_table
- create_join_table
- drop_table (must supply a block)
- drop_join_table (must supply a block)
- remove_timestamps
- rename_column
- rename_index
- remove_reference
- rename_table

As always, if you can't remember the exact syntax, take to the Google!


## Independent Practice (10 minutes)

> ***Note:*** _This can be a pair programming activity or done independently._

For the last part of class, the guys at Tunr, decided they need more information about the people they represent.  Do the following to make it happen:

- Add another column to your artists table named "Address" that stores string data (be careful with the datatype on this one - it's not what you think)
- Add a column with a different data type, and then delete it
- Update an existing column to have a different name

#### Bonus:

- Update the artist show page to display the new data
- Try using `tux` to add/edit/destroy instances of Artist models (and thus, records in your database)
- Register a new artist using the ```artists/new``` end point


## Conclusion (5 mins)
- What is ActiveRecord and how does it interact with your database?
- What are migrations?
- Briefly, describe how to configure your Sinatra app to use ActiveRecord.
