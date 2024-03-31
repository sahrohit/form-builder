<div align="center">

<h3 align="center">Form Builder</h3>

<p align="center">
Create and Manage forms easily
</p>

[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/works-on-my-machine.svg)](https://forthebadge.com)

</div>

## About The Project

Form Builder is a very small project built as a **submission** to the [test](/Challenge.pdf) submitted by techminius.

### Frontend

The frontend of the application is entirely built on Nextjs with it new app router and server components. Most of the components are server-rendered acheiveing super fast and dynamic pages (considering the best format for communication between server and client in html rather than json).

The component library of choice is shadcn/ui providing enough customizability, and react-hook-form is used for form management.

```
frontend
└── src/
    ├── actions # All Reusable Server Actions
    ├── app/
    │   ├── (admin) # Admin Pages
    │   ├── (marketing) # Marketing Pages - including Landing Pages
    │   └── forms # Forms - create,edit or submit
    ├── components/
    │   ├── cards # Reusable cards across the app
    │   ├── forms # All the forms used in the app
    │   ├── modals # Modals used in the app - auth etc.
    │   ├── navigation # Navbar Component
    │   └── ui # Reusable UI component - mostly shadcn
    ├── lib
    ├── styles
    └── types
```

### API

The API is built with expressjs following the REST standard also considering CORS, Rate Limiting and proper error handling.

The database used is MySQL (as specified in the [test](/Challenge.pdf)), PostgreSQL would have been my choice of database. `Drizzle ORM` is used as ORM on top of `mysql2` driver for safe queries to the database.

```
api
└── src/
    ├── controllers # Core application logic - controllers
    ├── middlewares # middlewares including - auth etc
    ├── routes # Routes declarations
    ├── schema # Schema declarations including drizzle schemas
    ├── services # Reusable services
    ├── utils/
    │   ├── ...
    │   ├── db.ts # DB Connection, Schema & Migration config
    │   ├── jwt.ts # Generate or Verify JWT tokens
    │   └── ...
    ├── migrate.ts # Script for db migration (used drizzle-kit push:mysql)
    └── server.ts # Starting Point for the API
```

### Utilities

Biome.js is used for liniting and fomratting of code, which is a better and alternative as compared to prettier and eslint.

Github Actions is used to do build, typecheck and lint check after each commit.

PNPM is used instead of NPM for better DX.

## Built With

<div style="display: flex; flex-wrap: wrap; gap:0.25rem;">
<img src="https://img.icons8.com/color/48/000000/typescript.png" title="Typescript" alt="Typescript" width="50" height="50" />
<img src="https://img.icons8.com/color/48/000000/react-native.png" title="React" alt="React" width="50" height="50" />
<img src="https://img.icons8.com/color/48/000000/nextjs.png" title="Nextjs" alt="Nextjs" width="50" height="50" />
<img src="https://img.icons8.com/color/48/000000/tailwindcss.png" title="Tailwind" alt="Tailwind" width="50" height="50" />
<img src="https://img.icons8.com/color/48/000000/express-js.png" title="Express" alt="Express" width="50" height="50" />
<img src="https://img.icons8.com/color/48/000000/mysql.png" title="MySql" alt="MySql" width="50" height="50" />
</div>

## Apps

| Apps     | Description                       |
| -------- | --------------------------------- |
| api      | API Server for the infrastructure |
| frontend | Frontend Nextjs app for end users |

## Getting Started

To get a local copy up and running follow these simple example steps.

### Installation

1. Clone the repo
   ```sh copy
   git clone https://github.com/sahrohit/form-builder.git
   ```

### To Initialize The Frontend

1. Open the `frontend` directory.

   ```sh copy
   cd frontend
   ```

1. Install the project dependencies using pnpm (`npm install -g pnpm` if pnpm is not installed)

   ```sh copy
   pnpm install
   ```

1. Copy and rename the `env.example` to `env.local` & update you enviroment variables in all the apps.

   ```env
   API_KEY = YOUR_API_KEY
   ```

1. Run the following commands to start the development server

   ```sh copy
   pnpm dev
   ```

   The Next Js application will start at port 3000.

### To Initialize The Backend

1. Navigate to the api folder.
   ```sh copy
   cd api
   ```
2. Install the project dependencies using pnpm (`npm install -g pnpm` if pnpm is not installed)

   ```sh copy
   pnpm install
   ```

3. Copy and rename the `env.example` to `env.local` & update you enviroment variables in all the apps. (including `PORT` & `DATABASE_URL`)

   ```env
   API_KEY = YOUR_API_KEY
   ```

4. Run the following commands to start the backend server

   ```sh copy
    pnpm dev
   ```

   The API will start on specified port (4000), you can do a check by running `curl http://localhost:4000/healthcheck`

## Things to be done

- [x] General
  - [x] The application must feature user authentication, allowing organizations to register, log in, and manage their accounts.
  - [x] Organizations should be able to create, edit, and delete custom forms.
  - [x] The application should support various form field types, including text inputs, dropdown menus, checkboxes, and radio buttons.
  - [x] Forms must be dynamically rendered based on the organization's design specifications.
  - [x] All form data should be securely stored in a MySQL database, with each submission linked to its respective organization.
- [x] Backend (Express.js)
  - [x] Initialize an Express server to manage API requests.
  - [x] Implement routes for user authentication (signup, login, logout) and form management (creation, editing, deletion).
  - [x] Integrate the server with a MySQL database using the mysql2 package.
  - [x] Secure user authentication using JWT or session-based methods. Ensure passwords are securely hashed.
  - [x] Develop endpoints for form management, including creation, updating, and deletion.
  - [x] Implement dynamic form rendering based on database-stored form designs.
  - [x] Handle form submissions securely, storing data in the MySQL database.
- [x] Frontend (React)
  - [x] Initialize a new React project for the application's frontend.
  - [x] Create components for user authentication (signup, login, logout).
  - [x] Implement robust form validation and error handling.
  - [x] Develop an interface for organizations to manage their forms.
  - [x] Design components for creating and editing form fields and forms.
  - [x] Dynamically render forms for user submission based on backend specifications.Database (MySQL)
  - [x] Design and implement tables for users, organizations, forms, and form fields.
  - [x] Establish relationships between tables to reflect the organizational structure and form hierarchy.
- [x] Security and Validation
  - [x] Implement frontend and backend validation to ensure data integrity.
  - [x] Sanitize all inputs to prevent SQL injection and other common web vulnerabilities.
  - [x] Employ CSRF protection measures.
- [x] Documentation
  - [x] Provide detailed documentation on setting up and running the application, including environment setup and server start instructions.
  - [x] Document the API endpoints and their usage.
- [ ] Testing
  - [ ] Write unit tests for critical components of the application.
  - [ ] Perform integration testing to ensure seamless frontend and backend interaction.
- [ ] CI/CD
  - [x] Implement Continuous Integration and Continuous Deployment using GitHub Actions.
  - [ ] Ensure automated tests are part of the CI/CD pipeline.
  - [x] Document the CI/CD process, including setup and usage instructions.

### Further Improvements

- [ ] Swap out MySQL infavour of PostgreSQL
- [ ] Rewrite all data fetching logic with reusable react-query functions
- [ ] Use Orval to generate restful client using the api.
- [ ] Converting project into a turbo repo and share re-usable logic and types.
- [ ]

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.
