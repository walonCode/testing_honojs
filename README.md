# Testing Honojs

## Description

`Testing Honojs` is a full-stack application built using Honojs, designed to provide a robust platform for managing a library system with functionalities for user authentication, book management, lending records, and library management. This project leverages TypeScript and MongoDB to ensure type safety and optimal performance.

## Features

- **User Authentication:** Secure user registration and login
- **Book Management:** CRUD operations for books
- **Lending Management:** Manage lending activities
- **Library Management:** Comprehensive library management system

## Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/walonCode/testing_honojs.git
    cd testing-honojs
    ```

2. **Install the dependencies:**
    ```bash
    pnpm install
    ```

3. **Set up your environment variables:**
    ```bash
    cp .env.example .env
    # Fill in the necessary environment variables
    ```

4. **Start the development server:**
    ```bash
    pnpm dev
    ```

5. **Build the project:**
    ```bash
    pnpm build
    ```

6. **Run the production server:**
    ```bash
    pnpm start
    ```

## Usage

- **Development mode:** Use `pnpm dev` to run the server in development mode with hot-reloading.
- **Production mode:** Use `pnpm start` to run the server in production mode after building the project with `pnpm build`.

## Technologies

- **Backend Framework:** [Hono](https://github.com/honojs/hono)
- **Type Checking:** [TypeScript](https://www.typescriptlang.org/)
- **Database:** [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **Validation:** [Zod](https://zod.dev/)
- **HTML Sanitization:** [Sanitize-HTML](https://github.com/apostrophecms/sanitize-html)

- **Git**
- **pnpm**

## Configuration and Env

Create a `.env` file in the root directory and add the following:

```env
PORT=3000
DATABASE_URL=your_mongo_db_connection_string
JWT_SECRET=your_jwt_secret
```

Ensure all necessary environment variables are set.

## Folder Structure

```
├── .env
├── .gitignore
├── README.md
├── package.json
├── pnpm-lock.yaml
└── src
   ├── configs
   │   └── mongo.ts
   ├── controllers
   │   ├── authController.ts
   │   ├── bookController.ts
   │   ├── lendingController.ts
   │   └── libraryController.ts
   ├── index.ts
   ├── middleware
   ├── models
   │   ├── bookModel.ts
   │   ├── lendingModel.ts
   │   ├── libraryModel.ts
   │   └── userModel.ts
   ├── routers
   │   ├── authRoute.ts
   │   ├── bookRoute.ts
   │   ├── lendingRoute.ts
   │   └── libraryRoute.ts
   ├── utils
   │   ├── logger.ts
   │   ├── sanitizeHtml.ts
   └── validators
       ├── bookSchema.ts
       ├── lendingSchema.ts
       ├── librarySchema.ts
       └── userSchema.ts
└── tsconfig.json
```

## Authors

Created by [@walonCode](https://github.com/walonCode)

## Contribution

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request.

## License

This project is licensed under the [MIT License](LICENSE).

## Badges

[![GitHub Repo](https://img.shields.io/badge/GitHub-repo-blue?style=for-the-badge&logo=github&logoColor=white)](https://github.com/your-username/testing-honojs)
[![Node.js](https://img.shields.io/badge/Node.js-14.17.0-green?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3.9-purple?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
```