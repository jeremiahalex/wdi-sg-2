---
title: Mongoose Modeling – Embedded & Referenced Documents
type: lab
duration: "1:25"
creator:
    name: Gerry Mathe
    city: London
competencies: Server Applications
---

# Mongoose Modeling – Embedded & Referenced Documents

## Introduction

> ***Note:*** _This can be a pair programming activity or done independently._

To practice using Mongoose and embedded and referenced documents, we will design a small data persisting application to keep track of airport data with different models: Airport, Terminal, Flight, and Passenger. You will have to write the models and then hard code data in your `app.js` file according to the requirements below.  Since we're not worried about views in this activity, log the results of your data persistence in the console when the file is executed - with `node app.js` - so we know what's being saved.

## Exercise

#### Requirements

- Create an Express application with four models: Airport, Terminal, Flight, and Passenger
- Include Mongoose and create embedded and referenced models:

  - Airport
    - Name(String)
      - country(String)
      - terminals(Array of embedded Terminal Objects)
      - opened(Date)
  - Terminal
    - name(String)
    - flights(Array of referenced Flight Objects)
    - capacity(Number)
  - Flight
    - from(String)
    - to(String)
    - airline(String)
  - Passenger
    - firstName(String)
    - lastName (String)
    - dob (Date)

- Hard code the following data in `app.js`:

  - A flight from CDG France to JFK New-York, USA on American Airlines with no passengers.  The name of the flight is "flight1"
  - A second flight from Heathrow UK to JFK New-York, USA on British Airways with no passengers.  The name of the flight is "flight2"
  - An airport called "JFK" in the USA opened on a random date in 1990.
  - A terminal called "Terminal 1" `pushed` to airport1 with a capacity of 234324 and two flights: flight1 and flight2

- Save and console.log all the objects and their children in the console - you should see all objects when `node app.js` is executed.

#### Starter code

No starter code for this app - create it from scratch!

#### Deliverable

The app's folder structure should look like this:

```
├── app.js
├── models
│   ├── airport.js
│   ├── flight.js
│   ├── passenger.js
│   └── terminal.js
├── node_modules
└── package.json
```



## Additional Resources

- [Mongoose Documentation](http://mongoosejs.com/)



