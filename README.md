# Employee Management System Information

## Summary
The **Employees Management System** is a CRUD (Create, Read, Update, Delete) web application built with **Node.js**, **Express**, and **MongoDB**. It provides a web interface for managing employee records, including personal details like name, email, and location. The project uses **EJS** for server-side rendering and **Mongoose** for database interaction. It also includes a **live-reload** setup to enhance the development experience.

## Structure
- **`/models`**: Contains the database schema definitions (e.g., `dataSchema.js`) using Mongoose.
- **`/views`**: Houses EJS templates for the front-end interface, including components (navbar, sidebar) and user-specific pages (add, edit, search, view).
- **`/public`**: Stores static assets such as custom CSS, Bootstrap files, and images.
- **`app.js`**: The central entry point of the application, responsible for server configuration, database connection, and route handling.
- **`.env`**: Stores environment-specific configuration such as database credentials.

## Language & Runtime
**Language**: JavaScript  
**Runtime**: Node.js (CommonJS modules)  
**Package Manager**: npm

## Dependencies
**Main Dependencies**:
- **express**: Web framework for building the API and handling routes.
- **mongoose**: MongoDB object modeling tool.
- **ejs**: Embedded JavaScript templates for the UI.
- **dotenv**: For loading environment variables from a `.env` file.
- **moment**: For parsing, validating, and formatting dates.
- **livereload** & **connect-livereload**: Development tools for automatic browser refreshing.

**Development Dependencies**:
- None explicitly listed in `devDependencies`, but `nodemon` is used in the `watch` script.

## Build & Installation
```bash
# Install dependencies
npm install

# Start the application
npm start

# Run in development mode with auto-reload
npm run watch
```

## Main Files & Resources
- **`app.js`**: Application entry point and route definitions.
- **`models/dataSchema.js`**: Defines the `Employee` model with fields: `firstName`, `lastName`, `email`, `phoneNumber`, `age`, `country`, and `gender`.
- **`views/index.ejs`**: Main dashboard view for listing employees.
- **`.env`**: Configuration for `DB_USER`, `DB_PASS`, `DB_NAME`, `DB_HOST`, and `DB_PORT`.
