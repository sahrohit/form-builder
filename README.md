<!-- PROJECT LOGO -->
<br />
<div align="center">

  <h3 align="center">Form Builder</h3>

  <p align="center">
Create and Manage forms easily
    <br />

[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/works-on-my-machine.svg)](https://forthebadge.com)

</div>

## About The Project

Form Builder is a very small project built as a submission to the [test](/Challenge.pdf) submitted by techminius

## Built With

<div style="display: flex; flex-wrap: wrap; gap:0.25rem;">
<img src="https://img.icons8.com/color/48/000000/typescript.png" title="Typescript" alt="Typescript" width="50" height="50" />
<img src="https://img.icons8.com/color/48/000000/react-native.png" title="React" alt="React" width="50" height="50" />
<img src="https://img.icons8.com/color/48/000000/nextjs.png" title="Nextjs" alt="Nextjs" width="50" height="50" />
<img src="https://img.icons8.com/color/48/000000/tailwindcss.png" title="Tailwind" alt="Tailwind" width="50" height="50" />
<img src="https://img.icons8.com/color/48/000000/express-js.png" title="Express" alt="Express" width="50" height="50" />
<img src="https://img.icons8.com/color/48/000000/mysql.png" title="MySql" alt="MySql" width="50" height="50" />
</div>

<!-- GETTING STARTED -->

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

2. Copy and rename the `env.example` to `env.local` & update you enviroment variables in all the apps.

   ```js
   API_KEY = YOUR_API_KEY
   ```

3. Run the following commands to start the development server

   ```sh copy
   pnpm dev
   ```
The NextJs application will start at port 3000.

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

   ```js
   API_KEY = YOUR_API_KEY
   ```

4. Run the following commands to start the backend server

   ```sh copy
    pnpm dev
   ```

## Apps

| Apps     | Description                              |
| -------- | ---------------------------------------- |
| api      | API Server for the infrastructure     |
| frontend | Frontend Nextjs app for end users        |


## Getting Started

- [X] General
    - [X] The application must feature user authentication, allowing organizations to register, log in, and manage their accounts.
    - [X] Organizations should be able to create, edit, and delete custom forms.
    - [X] The application should support various form field types, including text inputs, dropdown menus, checkboxes, and radio buttons.
    - [X] Forms must be dynamically rendered based on the organization's design specifications.
    - [X] All form data should be securely stored in a MySQL database, with each submission linked to its respective organization.
- [X] Backend (Express.js)
    - [X] Initialize an Express server to manage API requests.
    - [X] Implement routes for user authentication (signup, login, logout) and form management (creation, editing, deletion).
    - [X] Integrate the server with a MySQL database using the mysql2 package.
    - [X] Secure user authentication using JWT or session-based methods. Ensure passwords are securely hashed.
    - [X] Develop endpoints for form management, including creation, updating, and deletion.
    - [X] Implement dynamic form rendering based on database-stored form designs.
    - [X] Handle form submissions securely, storing data in the MySQL database.
- [X] Frontend (React)
    - [X] Initialize a new React project for the application's frontend.
    - [X] Create components for user authentication (signup, login, logout).
    - [X] Implement robust form validation and error handling.
    - [X] Develop an interface for organizations to manage their forms.
    - [X] Design components for creating and editing form fields and forms.
    - [X] Dynamically render forms for user submission based on backend specifications.Database (MySQL)
    - [X] Design and implement tables for users, organizations, forms, and form fields.
    - [X] Establish relationships between tables to reflect the organizational structure and form hierarchy.
- [X]Security and Validation
    - [X] Implement frontend and backend validation to ensure data integrity.
    - [X] Sanitize all inputs to prevent SQL injection and other common web vulnerabilities.
    - [X] Employ CSRF protection measures.
- [X] Documentation
    - [X] Provide detailed documentation on setting up and running the application, including environment setup and server start instructions.
    - [X] Document the API endpoints and their usage.
- [ ] Testing
    - [ ] Write unit tests for critical components of the application.
    - [ ] Perform integration testing to ensure seamless frontend and backend interaction.
- [ ] CI/CD
    - [X] Implement Continuous Integration and Continuous Deployment using GitHub Actions.
    - [ ] Ensure automated tests are part of the CI/CD pipeline.
    - [X] Document the CI/CD process, including setup and usage instructions.

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