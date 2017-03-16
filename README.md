# Gamehub | Social networking for gamers

(This is the front end repo. The back end repo can be found [here](https://github.com/ngcarter/gamehub_backend). The readmes are identical, though, so there is no need to read both unless you really like our writing.)

Gamers have to share Twitter, Reddit, and Facebook with people who just don't understand. What if there were a social networking app just for gamers? That is the question that drove this project. We made a Rails API that serves JSON and an Angular app that interacts with that API. The current version has two models: Post and Comment. Post `has_many :comments`, and Comment `belongs_to :post`. Visitors to the site can create, read, update, and delete posts and comments. We also have basic search functionality.

## Installation instructions

You can see the app live [here](https://shortnd.github.io/gamehub_frontend/). If you want to query the Rails API directly, you can try to do so [here](https://gamehub-rails-api.herokuapp.com/). Just be aware that cross-origin resource sharing (CORS) is restricted to our own front end.

If you want to run either part locally, follow the appropriate instructions below. Just be aware that in order to run things locally, you will probably have to substitute 'localhost:3000' for 'gamehub-rails-api.herokuapp.com' and 'localhost:8080' for 'shortnd.github.io', wherever they appear.

### Back end

1. Install Rails if you have not done so already.
2. Install PostgreSQL if you have not done so already.
3. Open the terminal.
4. Navigate to the directory where you want the back end.
5. Run the following commands:
```
git clone git@github.com:ngcarter/gamehub_backend.git
cd gamehub_backend
bundle install
rails db:drop db:create db:migrate db:seed
rails s
```

### Front end

1. Open the terminal (or another terminal tab/window).
2. Navigate to the directory where you want the front end.
3. Run the following commands:
```
git clone git@github.com:shortnd/gamehub_frontend.git
cd gamehub_frontend
hs
```

## Division of labor

#### [Nat Carter](https://github.com/ngcarter)
- Rails API
- User authentication rabbit hole

#### [Gill Gurpreet](https://github.com/585873)
- Seed data
- RSpec
- ERDs

#### [Collin OConnell](https://github.com/shortnd)
- Angular app
- Styling

## Unsolved problems

We _really_, _really_ wanted to have users. In particular, it would be nice if each post and comment were associated with the user who created it and could only be updated and deleted by that user.

Unfortunately, this requires user authentication, which it turns out is extremely difficult to implement in this stack. We spent a lot of time trying to figure it out (using devise_token_auth and ng-token-auth), but ultimately we did not have time to fully integrate it into the front end.

Next steps ...
- Make user authentication work, and implement the associated features mentioned above.
- Allow users to tag their posts and comments to associate them with games and/or categories, à la Twitter.
- Allow users to follow other users, à la Twitter.
- Allow users to filter posts depending on who they are following, which tags the posts have, etc.
- Allow users to up-vote or down-vote posts and comments, à la Reddit.
