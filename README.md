# Where's Waldo

## Description
This project is part of the TOP curriculum, a project made to test knowledge of fullstack capabilities such as REST API, React, Prisma ORM, JWT, node, express, SQL/postgres, server-side and client side programming and debugging.

Link to project instructions: https://www.theodinproject.com/lessons/nodejs-where-s-waldo-a-photo-tagging-app

The main focus of this project is on tie together a REST API backend with a frontend application (in this case a React app). The task is to build a version of the game "Where's Waldo" where the user interacts with the frontend and all game verification, score keeping, leaderboard etc is hosted on the backend.

Information about the location of the characters are stored in a database, far away from the user to prevent cheating. Game sessions are handled with JWTs.

## Getting Started
Live build: **https://wheres-waldo-crl96.netlify.app/**

#### Run locally

##### Backend Server Installation

1. Clone the repository

2. Navigate to the backend directory: 
```terminal
cd wheres-waldo/backend
```

3. Run build command to install packages and init prisma client:
```terminal
npm run init-install
```

4. Setup a PostgreSQL database and add it's credentials to the .env in the next step.

5. Create a .env file in the backend directory, look at the .env.sample for clarification.

6. Run init db command to sync your postgres db with prisma schema: 
```terminal
npm run init-db
```

7. Open Prisma Studio with **npx prisma studio** and manually add the correct coordinates (normalized as a percentage of image size) for your characters to the "Character" table

8. Run the server:
```terminal
npm run start
```

##### Frontend React Installation

1. Clone the repository (if you haven't already)

2. Navigate to the frontend directory : 
```terminal
cd wheres-waldo/frontend
```

3. Install packages and dependencies:
```terminal
npm install
```

4. Create a .env file in the current directory, look at the .env.sample for clarification.

5. Run React app in dev server:
```terminal
npm run dev
```

6. Navigate to **http://localhost:5173**

## Technologies Used
Programming Languages: Javascript, HTML/JSX, CSS, SQL

Server-side Tools: NodeJS, Express, JWT, Prisma ORM, PostgreSQL

Frontend Tools: React, Vite, CSS, HTML/JSX