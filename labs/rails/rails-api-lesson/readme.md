---
title: Building a Rails API
type: lesson
duration: "1:30"
creator:
    name: Shawn Rodriguez
    city: LA
competencies: Server Applications
---

#Building a Rails API

### Objectives
*After this lesson, students will be able to:*

- Create RESTful JSON endpoints for API requests using Rails
- Add namespaced controllers for serving a JSON API
- Add namespaced routes for a JSON API

### Preparation
*Before this lesson, students should already be able to:*

- Build models, routes, and controllers in Rails
- Seed a database with a seed.rb file


## RESTful API in Rails - Intro (5 mins)

Simply put: “API is program [that] lets the user to use methods of your application from outside the application“. In this lesson, we will create a RESTful API implementing CRUD functionality on our collection of bowties - or our bowtie table in our database - from outside the web application.

Normally, you'll have forms for new and edit functionality providing a UI for users to add and edit bowties. But for an API you do not need any view as a user do not interact with your application directly; instead you'll specify the data the third parties should include as parameters in their request.

When users hit our API, we will not redirect in our controller actions; instead we'll return some data with an appropriate status code and a success or failure message. As per convention, you should return data in a format requested by the client calling your API, so for JSON request, return JSON data; for XML request, return XML data.

##Setting up our application - Codealong (20 mins)

Let's get our new app started:

```bash
$ rails new bowties-api -d postgresql -T
```

If we spin up our Rails server and try to visit localhost:3000, we get an `ActiveRecord::NoDatabaseError` message. This is one of the differences between working with SQLite vs. PostgreSQL. This error is super easy to fix:

```bash
$ rake db:create
```

Last thing:  for some reason, Rails is trying to singularize "bowtie" as "bowty", so we need to fix that in our inflections.rb file, which lives in the config directory.  While we're in there, we can also add a custom inflection for "API":

> Note: Explain what inflection means in this context

```ruby
ActiveSupport::Inflector.inflections(:en) do |inflect|
  inflect.irregular 'bowtie', 'bowties'
  inflect.acronym 'API'
end
```

#### Building our model

Let's get started by generating our model:

```bash
$ rails g model Bowtie material pattern style image_url wholesale_price:float retail_price:float
```

Before we forget, let's go ahead and run that migration:

```
$ rake db:migrate
```

#### Our Routes and Controller Actions

First, let's make a list of all our bow ties!  Here's what we want: we want to be able to send an HTTP GET request to `/api/bowties` and get back a JSON object that contains an array of all the bowties in our database.  Let's try to visit that location from our browser and see what happens. No big surprise, we get a routing error that tells us we don't have a route defined.

We can fix that!  Because we're building an API, we're going to write our routes a little bit differently than we have in the past. Let's start by using Rails' `resources` method to generate our routes:

```ruby
resources :bowties
```

First of all, let's check out what that `resources` method did:

```bash
rake routes
Prefix Verb   URI Pattern                 Controller#Action
    bowties GET    /bowties(.:format)          bowties#index
            POST   /bowties(.:format)          bowties#create
 new_bowtie GET    /bowties/new(.:format)      bowties#new
edit_bowtie GET    /bowties/:id/edit(.:format) bowties#edit
     bowtie GET    /bowties/:id(.:format)      bowties#show
            PATCH  /bowties/:id(.:format)      bowties#update
            PUT    /bowties/:id(.:format)      bowties#update
            DELETE /bowties/:id(.:format)      bowties#destroy
```

It automatically built all the routes for CRUD functionality. That's a neat parlor trick, but not exactly what we're looking for. Let's start by getting rid of all those extra routes that we don't need right now:

```ruby
resources :bowties, only: [:index]
```

But remember, we wanted our path to be `/api/bowties`. Rails has a fix for that:

```ruby
namespace :api do
  resources :bowties, only: [:index]
end
```

Within the `config/routes.rb`, you can add an 'api namespace'; in this way, our API functionality will not conflict with the bowties controller of our actual application. Alternatively, if you want to set the default output for a whole controller to be JSON, you can add this in the `config/routes.rb` file:

```ruby
resources :bowties, defaults: { :format => 'json' }
```

If you do not explicitly set the default output, Rails will consider any request as an html request if user forgets to pass a format.

Anyway, let's assume we used the namespace: the next error we will get when we visit `http://localhost:3000/api/bowties` is `ActionController::RoutingError: uninitialized constant API` because we haven't defined a "thing" called API anywhere - so far, we're just referring to it in our `routes.rb` file. We can fix this error by doing the following:

- create a directory called "api" inside the controllers directory
- inside our "api" directory, create a new file called `bowties_controller.rb`


Now, we need to write our controller.  It should look like this:

```ruby
module API
  class BowtiesController < ApplicationController
  end
end
```

"Whoa! What is a module?", you ask? A module is just a collection of methods and/or constants (and Ruby classes--you know, like Rails controllers--_are_ constants, so there!).

Now, if we try to visit `localhost:3000/api/bowties`, we no longer get that `UninitializedConstant API` error message. Instead, it tells us that the index action could not be found for our `API::BowtiesController`.

You know how to fix that! Take **30 seconds** to make that error go away.

```ruby
module API
  class BowtiesController < ApplicationController
    def index
    end
  end
end
```

The next error we should get is something about a missing template. Remember that a Rails controller's default behavior is to render an HTML view template. But that's not what we want in this case. When someone sends a GET request to `/api/bowties`, we want to respond with JSON so let's make that happen by adding the following to our controller:

```ruby
module API
  class BowtiesController < ApplicationController
    def index
      render json: Bowtie.all
    end
  end
end
```

Boom! Now if we visit `/api/bowties`, we get an empty array. Maybe now's a good time to seed our database with some bow ties so that we can actually see some data coming back. Let's do this thing:

Here's some data for our `seeds.rb` file:

```ruby
Bowtie.destroy_all

bowties = Bowtie.create([
  {material: "silk",
    pattern: "houndstooth",
    style: "slim",
    wholesale_price: "14.98",
    retail_price: "24.95",
    image_url: "http://www.thetiebar.com/database/products/BS178_l.jpg"
  },
  {material: "silk",
    pattern: "floral",
    style: "slim",
    wholesale_price: "14.45",
    retail_price: "23.95",
    image_url: "http://www.thetiebar.com/database/products/BS184_l.jpg"
  },
  {material: "silk",
    pattern: "paisley",
    style: "traditional",
    wholesale_price: "15.65",
    retail_price: "26.95",
    image_url: "http://www.thetiebar.com/database/products/B1735_l.jpg"
  },
  {material: "wool",
    pattern: "plaid",
    style: "diamond tip",
    wholesale_price: "16.48",
    retail_price: "29.95",
    image_url: "http://www.thetiebar.com/database/products/BD325_l.jpg"
  },
  {material: "cotton",
    pattern: "gingham",
    style: "traditional",
    wholesale_price: "14.35",
    retail_price: "22.95",
    image_url: "http://www.thetiebar.com/database/products/BC570_l.jpg"
  },
  {material: "wool",
    pattern: "plaid",
    style: "traditional",
    wholesale_price: "16.48",
    retail_price: "29.95",
    image_url: "http://www.thetiebar.com/database/products/BW147_l.jpg"
  },
  {material: "cotton",
    pattern: "plaid",
    style: "slim",
    wholesale_price: "14.45",
    retail_price: "22.95",
    image_url: "http://www.thetiebar.com/database/products/BS202_l.jpg"
  },
  {material: "cotton",
    pattern: "striped",
    style: "diamond tip",
    wholesale_price: "14.48",
    retail_price: "23.95",
    image_url: "http://www.thetiebar.com/database/products/BD335_l.jpg"
  },
  {material: "silk",
    pattern: "geometric",
    style: "slim",
    wholesale_price: "15.95",
    retail_price: "28.95",
    image_url: "http://www.thetiebar.com/database/products/BT122_l.png"
  },
  {material: "silk",
    pattern: "plaid",
    style: "diamond tip",
    wholesale_price: "18.95",
    retail_price: "34.95",
    image_url: "http://www.thetiebar.com/database/products/BD324_l.jpg"
  }
])
```

Let's stop the server and run this with:

```bash
$ rake db:seed
```

Now if we hit up `/api/bowties` we can see some delicious data.

## API for show action - Independent Practice (10 mins)

Use what you just learned about creating an API for the index action and modify the routes and controller accordingly to return a sweet bowtie when you visit `api/bowties/1`:

```json
{material: "silk",
  pattern: "houndstooth",
  style: "slim",
  wholesale_price: "14.98",
  retail_price: "24.95",
  image_url: "http://www.thetiebar.com/database/products/BS178_l.jpg"
}
```

Keep trying the `api/bowties/1` endpoint and work through the errors.


## Review Answers to create API for show action - Codealong (5 mins)

####Getting JSON for just one bowtie

Let's tackle getting our API to return a single bowtie.  What happened when you went to `/api/bowties/1`?

A `No route matches...` error...no surprise there!  

```ruby
namespace :api do
  resources :bowties, only: [:index, :show]
end
```

The next error should have been that we didn't have a show action in our bowties controller.  We can fix that in n our `bowties_controller.rb` file.

```ruby
def show
end
```

Now, you should have had an error saying that the template is missing.  Starting to see a pattern here? We get that error because we haven't told that controller action what to return and Rails isn't able to infer it.  Let's tell it what to do:

```ruby
def show
  render json: Bowtie.find(params[:id])
end
```

When we visit `/api/bowties/1` we see some stunningly attractive JSON. Boom!

## Creating and Updated Bowties - Codealong (20 mins)

Let's get serious and tackle creating a new bowtie. First thing we need to address is routing. What route do we need? Take **30 seconds** and add the appropriate route to your `routes.rb` file.

```ruby
namespace :api do
  resources :bowties, only: [:index, :show, :create]
end
```

Next thing we're going to need? A controller action, of course!

```ruby
def create
end
```

Okay, this is going to look pretty similar to the `create` actions we have written in the past, but there are a few differences.

```ruby
def create
  bowtie = Bowtie.new(bowtie_params)

  if bowtie.save
    render json: bowtie, status: 201, location: [:api, bowtie]
  end
end

private
  def bowtie_params
    params.require(:bowtie).permit(:material, :pattern, :style, :image_url, :wholesale_price, :retail_price)
end
```

> Note: Explain the render line in detail and compare 20X status codes.

Now, let's try to create a new bowtie by sending a POST request to our API. We'll use a tool called [Insomnia REST Client](http://insomnia.rest/) to do this.

To create a new POST request using Insomnia, we'll need to do a few things:

- Select the POST method from the dropdown menu
- Make sure we are posting to `http://localhost:3000/api/bowties` (we can figure out the route to post to by running `rake routes`)
- We need to give it a payload. Make sure to select the type as `JSON` and then give it a payload like this:

```json
{
  "bowtie": {
    "material": "cotton",
    "pattern": "striped",
    "style": "traditional",
    "wholesale_price": "18.49",
    "retail_price": "28.99"
  }
}
```

But Rails isn't going to just let you post data from some other domain. We can see that when we try to submit this POST request, we get back a **422 status code (Unprocessable Entity)**. This happens because Rails checks the incoming request for an authenticity token if the request is a POST, PUT, PATCH, or DELETE.  

This is set up as the default for all our controllers in our Application Controller.  It's that line that says `protect_from_forgery with: :exception`.

To fix this, we need to add the following line of code in our bowties controller to override this default behavior:

```ruby
protect_from_forgery with: :null_session
```

Now, if we try to submit that POST request again, we will see that the POST request is successful and that it returns our newly created bowtie as JSON.

Let's tell our `create` action what to do if a record doesn't save because of a failed validation.

Let's start by adding a simple validation to our model so that we can see what happens if a record doesn't save:

```ruby
class Bowtie < ActiveRecord::Base
  validates :pattern, presence: true
end
```

Try to create another bowtie but this time, delete the pattern key-value pair. You can see that we get a **500 (500 Internal Server Error)**.

Now, in our controller we will add an else block to our create action:

```ruby
def create
  bowtie = Bowtie.new(bowtie_params)

  if bowtie.save
    render json: bowtie, status: 201, location: [:api, bowtie]
  else
    render json: bowtie.errors, status: 422
  end
end
```

Let's try our POST request again and see what happens. We can see that the response includes a `422 Unprocessable Entity` status code and it returns the error messages as JSON (in this case, we get `{"pattern":["can't be blank"]}`). Nice!

#### Updating a bowtie

Okay, no surprise here. We're gonna need a route. Quick: go write it!

```ruby
namespace :api do
  resources :bowties, only: [:index, :show, :create, :update]
end
```

Next up: no controller action! Let's define an update action in our bowties controller:

```ruby
def update
  bowtie = Bowtie.find(params[:id])
  if bowtie.update(bowtie_params)
    head 204
  end
end
```

Notice that we aren't returning the newly updated bowtie object in the response body.  We're only sending back a response header with a 204 status code, which is used for a successful request that doesn't have a response body.

But what if an update fails for some reason, like not meeting a validation? We need to add an `else` block in our update action:

```ruby
def update
  bowtie = Bowtie.find(params[:id])
  if bowtie.update(bowtie_params)
    head 204
  else
    render json: bowtie.errors, status: 422
  end
end
```

So let's use Insomnia to send a PATCH request that tries to set an existing bow tie's pattern to null.

```json
{
  "bowtie": {
    "pattern": null
  }
}
```

This should fail because of our validation...and indeed it does! We get back a 422 status code along with the error message.  

## Destroying bowties - Independent Practice (10 mins)

Use what you just learned about creating an API for the other controller action and modify the routes and controller accordingly to delete a bowtie and render a 204 message in the head when use Insomnia to send a DELETE request.

## Review Destroying Bowties Solution - Codealong (5 mins)

As always, we'll start with a route:

```ruby
namespace :api do
  resources :bowties, only: [:index, :show, :create, :update, :destroy]
end
```

Next up: no controller action for "destroy".  Let's write it:

```ruby
def destroy
  bowtie = Bowtie.find(params[:id])
  bowtie.destroy
  head 204
end
```

Congratulations, you just built your first full CRUD Rails API!

## Customizing our JSON response - Codealong (10 mins)

Currently, our API is returning ALL the data from our bowtie objects to the client, but maybe we want to limit the data that gets returned.  For example, maybe we don't want to include the wholesale price or the datetime stamps in our JSON object. Another good example of when you wouldn't want to return all the data is on a user model: in that case, you likely wouldn't want to send clients the email, address, password digest, etc. That is private information!

We can modify the JSON that we send by extending Rails' `as_json` method in our bowtie model.

```ruby
class Bowtie < ActiveRecord::Base
  validates :pattern, presence: true

  def as_json(options={})
    super(except: [:wholesale_price, :created_at, :updated_at])
  end
end
```

Awesome!  Now if we hit our `/api/bowties` endpoint we can see that we are only getting back the attributes that we specified when we extended the `as_json` method.

**Note:** We could also choose to include only certain attributes:

```ruby
def as_json(options={})
  super(only: [:id, :material])
end
```

Let's see how you can also include the data returned from instance methods in your JSON object.  We'll start by writing a method that gives us a very basic description for each bowtie, based on a few of its attributes:

```ruby
def description
  "This #{pattern} bowtie is made from top quality #{material}."
end
```

Now if we call `.description` on an instance of the Bowtie class, we should get a string that looks something like "This plaid bowtie is made from top quality cotton."

To have the return value of our `description` method included in our JSON, we just need to modify the `as_json` method a little bit further:

```ruby
def as_json(options={})
  super(except: [:wholesale_price, :created_at, :updated_at],
  methods: [:description])
end
```

### Rendering Associated Models

If you want to include JSON from a related model, using `as_json` it's quite straightforward:


```bash
$ rails g migration CreateUsers name
$ rails g migration CreateJoinTableUsersBowties users bowties
$ rake db:migrate
```

Let's quickly create a User model:

```bash
touch app/models/user.rb
```

Then let's add some content to the class:

```ruby
class User < ActiveRecord::Base
  has_and_belongs_to_many :bowties
end
```

And the opposite association in the Bowtie class:

```ruby
class Bowtie < ActiveRecord::Base
  has_and_belongs_to_many :users
```

Let's create a user and associate them with a bowtie:

```
$ rails c
> u1 = User.create!(name: "Alex")
=> #<User id: 1, name: "Alex">

> u1.bowties << Bowtie.first
> => #<ActiveRecord::Associations::CollectionProxy [#<Bowtie id: 1, material: "cotton", pattern: "spotty", style: "traditional", image_url: "http://www.thetiebar.com/database/products/BS178_l...", wholesale_price: 18.49, retail_price: 28.99, created_at: "2015-11-08 15:32:49", updated_at: "2015-11-08 20:07:20">]>
```

Now inside the Bowtie model, we can include the user association with `include`:

```ruby
def as_json(options={})
  super(include: [:users],
        except: [:wholesale_price, :created_at, :updated_at],  
        methods: [:description])
end
```

Now we can start the rails app and take a look at `/api/bowties/1` - you should see the associated users!

```json
{
  "id": 1,
  "material": "cotton",
  "pattern": "spotty",
  "style": "traditional",
  "image_url": "http://www.thetiebar.com/database/products/BS178_l.jpg",
  "retail_price": 28.99,
  "description": "This spotty bow tie is made from top quality cotton.",
  "users": [
    {
      "id": 1,
      "name": "Alex"
    }
  ]
}
```

If you need to render quite a lot of complex associations, you can also look at the new JSON templates [JBuilder](https://github.com/rails/jbuilder), or the underrated [ActiveModelSerializers](https://github.com/rails-api/active_model_serializers).

## Conclusion (5 mins)

- Describe the steps involved in modifying routes and controllers to build an API for a given resource.
- What does using namespace allow you do?
- Why are status codes important in API request/response?
