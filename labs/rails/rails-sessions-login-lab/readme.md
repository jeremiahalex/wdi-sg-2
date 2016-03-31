---
title: Sessions/Login Lab
type: lab
duration: "1:25"
creator:
    name: Micah Rich
    city: LA
competencies: Server Applications
---


# Sessions/Login Lab

## Introduction

> ***Note:*** _This can be a pair programming activity or done independently._

We've seen how to encrypt data and how to set, delete and use cookies for a given a client, whether logged-in or not. Let's practice this by creating a photo-sharing app, Flickr.  

## Exercise

#### Requirements

- Create a Flickr Rails app with a user model using bcrypt-ruby that stores encrypted passwords
- Add a login/signup page
  - The users should be listed on users/index
- Create a resource photos with a title(string) and url(text)
  - Photos should be associated to a user - a Photo belongs to a User, a User has many Photos
  - Only the logged-in users can add photos
  - A User can only edit and delete the photos he/she owns.
- The app should have a profile page for every user and the photos added by this user should be listed on the user/show page

**Bonus:**
- Style your app!
- Try to add a page to update his own profile.
- Try to add a page to list the pictures for the current user.

#### Deliverable

After you've created a user, but you're logged out:

<p align="center">
<img src="http://s30.postimg.org/jcib9ipkx/Screen_Shot_2015_07_19_at_12_53_28_PM.png">
</p>

If you try to create a photo, by clicking on the green "+ New" button, but you're logged out:

<p align="center">
<img src="http://s1.postimg.org/hdi87i8tr/Screen_Shot_2015_07_19_at_12_53_43_PM.png">
</p>

But once you log in:

<p align="center">
<img src="http://s10.postimg.org/fl3npmzrt/Screen_Shot_2015_07_19_at_12_54_04_PM.png">
</p>

#### Resources

- Look to the [solution code](../sessions-logging-in-by-hand-lesson/solution-code) from today's lesson to guide you
- [This RailsCast](http://railscasts.com/episodes/250-authentication-from-scratch) on authentication by hand could help, too; note this is an older version!
- [Hartl's tutorial](https://www.railstutorial.org/book/modeling_users) can always help
