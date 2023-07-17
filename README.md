# Technotrove Server

Welcome to the Technotrove Server! This is the backend API for the Technotrove user interface, built with a strong focus on TypeScript.

The Technotrove Server is responsible for managing user profiles, project creation, and image uploading. It provides an infrastructure for user creation with password encryption, user authentication using JWT, and project management linked to user profiles.

## Key Features

- User account creation and password encryption
- User authentication with JWT
- Project creation linked to user profiles
- Image uploading for projects

## Tech Stack

- Core: Express.js, TypeScript
- Database: Prisma, PostgreSQL
- Security: bcrypt, JWT
- Image Handling: Cloudinary
- HTTP Request Logging: Morgan
- File Upload: Multer

Getting Started

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Nicolas-Rodriguez-Ch/technoTroveServer
   ```

2. **Install the dependencies**:

   ```bash
   cd technotroveserver
   npm install
   ```

3. **Start the development server:**:

   ```bash
   npx prisma migrate dev
   npm run dev
   ```

## Postman Collection

To test out the Technotrove Server API, feel free to use our shared Postman requests. You can find the collection here.

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/13473689-81d6b22b-f7ce-4793-be9b-d61526f84e3b?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D13473689-81d6b22b-f7ce-4793-be9b-d61526f84e3b%26entityType%3Dcollection%26workspaceId%3D2a7615bb-7af4-4c7c-8578-9ce7d14a24c9)

## Environment Variables

The application uses the following environment variables which should be defined in a `.env` file at the root directory:

```bash
DATABASE_URL="<your-database-url>"
PORT=<your-port>
SECRET_KEY="<your-secret-key>"
CLOUDINARY_CLOUD_NAME="<your-cloudinary-cloud-name>"
CLOUDINARY_API_KEY="<your-cloudinary-api-key>"
CLOUDINARY_API_SECRET="<your-cloudinary-api-secret>"
```
In the root directory, you can find a [.env.example](.env.example) file with the environment variables that are being used throughout the project.

Please replace your-database-url, your-port, your-secret-key, your-cloudinary-cloud-name, your-cloudinary-api-key, and your-cloudinary-api-secret with your actual data.

## License

This project is licensed under the terms of the MIT license. See the [LICENSE](LICENSE) file for details.
