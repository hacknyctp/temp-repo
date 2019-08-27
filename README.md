
# Introduction
Back end API for Wheather Mobile App


# Overview
### The API allows(See examples on postman [here](https://documenter.getpostman.com/view/7764095/SVfNv9Uc?version=latest)) :
- Signing up of a new user via the `api/users/signup` 
- Signing in of an existing user from `api/user/login`
- Get logged in users' current weather via `api/users/weather`
- Get logged in users' week ahead weather via `api/users/5day`
# Authentication
- A logged in user is "signed" by Json Web Token(JWT).
	- Signing in returns the JWT that should be stored locally to authenticate a user.
	- When loggin in, the given password is hashed and checked against the encrypted stored 
- Passwords are encrypted via bcrypt :)

# The weather app that tells you whether or not to bring an umbrella
## Branches/Workflow
-  App will be continuously deployed on the `master` branch
  - Back end development on the `backend` branch
  - Front end development on the `frontend` branch
  - Testing back end and front end integration on `main` branch

