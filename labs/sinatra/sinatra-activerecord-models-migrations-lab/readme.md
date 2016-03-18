---
title: Models and migrations
type: lab
duration: "1:25"
creator:
    name: Jay Nappy
    city: NYC
competencies: Server Applications
---

# Models and migrations

## Introduction

> ***Note:*** _This can be a pair programming activity or done independently._

You and the people at Tunr want to add some functionality to your talent management application.  Specifically, they want to be able to keep track of their managers and the songs their artists put out. Use Google and the [official ActiveRecord docs](http://edgeguides.rubyonrails.org/active_record_migrations.html) if you need help and incorporate the requirements below to build on what you did in the previous lesson.  

Be sure to do the requirements below in order and keep an eye on your `schema.rb` file to see that your migrations are working properly!  Also, think about the most appropriate datatype for each migration and use your discretion as you write them.  The views and controllers are set up for you.

## Exercise

#### Requirements

- Create a Manager class that inherits from ActiveRecord

  - For this class, create a table in your database and the corresponding forms that collect and display information about the manager's name, email, and office number.

- Create a Song class that inherits from ActiveRecord

  - For this class, create a table in your database and the corresponding forms that collect and display information about the song title, duration, year of release, and album title.

- Then:

  - Add a phone_number column to the managers table as an integer
  - Change the phone_number column to a string
  - Add a downloads column to the songs table
  - Rename the phone_number column to cell_phone_number in the managers table
  - Remove the downloads column from the songs table
  - Add a column to the songs table called artist_last_name

- Finally, to make sure all is working well, add one artist, manager, and song using the information below:

  - **Artist**:  

    - Name: Kevin Rox
    - Photo URL: "http://png.clipart.me/graphics/thumbs/144/anime-manga-rock-star-guitar-player_144647441.jpg"
    - Nationality: Italian
    - Instrument: Guitar, Home Address: 100 Rocks Lane

  - **Manager**:  

    - Name: Ricky Bobby
    - Email: rbobby@gmail.com
    - Office Number: 516-877-0304  
    - Cell Phone Number: 718-989-1231

  - **Song**:  

    - Title: The Best Song Ever
    - Duration: 3:31
    - Date of Release: 7/13/2015
    - Album Title: Best Album Ever
    - Artist Last Name: Rox

**Bonus:**

- Break out your controllers into a `controllers` folder, with different files for each type of controller – artist, manager, & song. _Don't forget to require them!_
- We're learning this next week, but get a head start if you dare: an artist can have many songs and a manager can have many artists; configure your app to make sure your tables have these relationships using the [official docs](http://guides.rubyonrails.org/association_basics.html).

 _Hint: In addition to the code you have to add to the models, you'll have to add foreign keys to both the `artists` and `songs` tables._



#### Starter code

Use your code from class or grab the [starter-code](starter-code) to get started.

#### Deliverable

Your `schema.rb` file should look like this:

![](http://s29.postimg.org/4sw62q90n/Screen_Shot_2015_07_13_at_12_00_36_PM.png)

## Additional Resources

- [ActiveRecord Official Docs](http://edgeguides.rubyonrails.org/active_record_migrations.html)
