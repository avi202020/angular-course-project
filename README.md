# Documentation
**Angular 6 Forum** is a simple forum where you can make posts to a given category.
* Front-end - SPA (Single-Page-Application) using **Angular 6**
* Back-end - **Node.js + Express.js + MongoDB**

Users can register, login and logout in the forum app. Unauthenticated users can only view posts.
On the other hand, authenticated users can create, edit and delete their posts and comments.
Administrators can add, edit, delete categories, ban and unban users, and delete other users' posts and comments.
# App Build Setup
```
# install dependencies
1. npm install
# run project in dev
2. ng serve
# navigate your browser to http://localhost:4200
```

# Functionality
3 types of roles - Guests, Authenticated Users (logged in), Administrators
```
Guests
    can see home page
    can register
    can login
    can view posts
```
```
Logged in Users
    all the guests' functionality
    can create posts
    can edit their posts
    can delete their posts
    can create comments on theirs and others' posts
    can edit their comments
    can delete their comments
```

```
Administrator:
    all the users' functionality
    can ban users
    can unban users
    can add categories
    can edit categories
    can delete categories
```

Post has a title, an author, a description, a category, date created and comments.

Comment has an author, a description and date created.

Banned users cannot create, edit, delete neither their posts nor their comments.
	
# Future Guidelines
	Users can change password
  Users upload their image
  User profile
# Examples
![Home-Page](./forum-project/src/assets/home-page.png?raw=true)
