# YMDB - Your Movie Database

**YMDB** is a cinephile hobbyist site for people that love making lists, film discussion, and film exploration.

The site is meant to be a minimalist competitor to sites like Mubi and Letterboxd that appeals to a nerdier audience and that is specifically tailored towards list making and film discussion.  The site will have well-thought out limitations that make users more deliberate in how they chose films for their one and only list, which they can name and describe in the description section however they like.  The site will encourage users to make a list of favorite films, not themed or best-of-decade lists and there will be a YMDb top films list that aggragates film rankings from all user lists to make an overall YMDb community ranking, similar to what rateyourmusic.com has.

## Build Tools

YMDb is a full stack website built with React and Redux on the front-end, MongoDB and Express for the back-end.

<!--
## Project Links

Deployed site:

Heroku deployment: https://yourmoviedatabase.herokuapp.com

Github repo: https://github.com/SeanPhilippi/your-movie-database

Project/Issue tracker: https://github.com/SeanPhilippi/your-movie-database/issues
-->

## Project Start Commands

Front-end: ```npm start```

Server: ```npm run server```

Concurrently: ```npm run both```

## Current State

The Profile component is the most built out and functional component at the moment.  Full CRUD functionality is on display here, with data being fetched from OMDB's api, and saving, updating, and deleting functions making changes to an mlab document.  The login and registration are now functional and using JSON web token, passport, and bcrypt so any password is saved is hashed before being saved to mlab and the authentication token expires after 3 hours.  Log out functionality and building out the home page is next.  Then more built out movie pages, user list page, etc.

To view current progress and TODOs, feel free to visit my Trello board [here](https://trello.com/b/cQnlnnFP/ymdb).

## Future Goals

* Have more movie data visible like director in the search results
* Allow for more than 10 search results to display at a time, with a scroll feature
* Make a button that allows switching between a more polished/published list view and an edit view
* Make site mobile-friendly and fully responsive
* Improve styling and overall user experience.
* Create Home page that has a section for lists ranked by their popularity and a section for top movies according to aggragated YMDb user rankings.
* Have movie pages fetch poster image, imdb link, have add movie to list button.
* implement comment section for user lists and movie pages.
* implement user ranking data for display on home page preview windows and movie pages.
* Add pictures of website to this repo README.md.


<!-- ## Heroku DB Commands

Heroku db migration: ```heroku run knex migrate:latest```

Heroku db seed: ```heroku run knex seed:run``` -->

<!-- ## Website Screenshots

Home Page

<img src="/public/" alt="alt text" width="75%" height="75%">

Profile Page

<img src="/public/" alt="alt text" width="75%" height="75%">

<img src="/public/" alt="alt text" width="75%" height="75%">

<img src="/public/" alt="alt text" width="75%" height="75%">

Movie Page

<img src="/public/" alt="alt text" width="75%" height="75%">

Log in/Register Pages

<img src="/public/" alt="alt text" width="75%" height="75%">

<img src="/public/" alt="alt text" width="75%" height="75%"> -->
