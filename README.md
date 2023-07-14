# User Authentication System

This project is a user authentication system built using Node.js, Express.js, EJS, MongoDB, JWT authentication, Google authentication, and bcrypt for securing passwords in the database. It allows users to sign up using either a normal email or Google login. Once signed in, users are directed to their profile page, where they can log out and reset their password.

## Features

- User registration with email and password or Google login
- User authentication using JWT (JSON Web Tokens)
- Password security with bcrypt encryption
- Profile page displaying user information
- Logout functionality
- Password reset option

## Technologies Used

- Node.js
- Express.js
- EJS (Embedded JavaScript) templating engine
- MongoDB (NoSQL database)
- JWT (JSON Web Tokens)
- Google authentication API
- bcrypt (Password encryption)

## Installation

To run this project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/harshy1620/User_Auth_System_Node.git
   ```

2. Navigate to the project directory:

   ```bash
   cd User_Auth_System_Node
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Set up the environment variables:

   - Rename the `.env.example` file to `.env`.
   - Replace the placeholders in the `.env` file with your own values. For example, set your MongoDB connection string and Google authentication credentials.

5. Start the application:

   ```bash
   npm start
   ```

6. Open your browser and visit `http://localhost:9000` to view the application.

## Usage

- Sign up:
  - Visit the registration page and fill in the required details.
  - Choose the desired registration method (email or Google login).
  - Submit the form to create a new account.

- Sign in:
  - Visit the login page and enter your credentials.
  - Click the "Sign In" button to log in.

- Profile page:
  - After successful login, you will be redirected to your profile page.
  - View your personal information on the profile page.

- Logout:
  - To log out, click the "Logout" button.

- Password reset:
  - If you forget your password, click the "Forgot Password" link on the profile page.
  - Follow the instructions to reset your password.

## Contributing

Contributions are welcome! If you have any suggestions or improvements, please open an issue or submit a pull request.

## Acknowledgements

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [EJS](https://ejs.co/)
- [MongoDB](https://www.mongodb.com/)
- [JWT (JSON Web Tokens)](https://jwt.io/)
- [Google Authentication](https://developers.google.com/identity/protocols/oauth2)
- [bcrypt](https://www.npmjs.com/package/bcrypt)

## Contact

For any inquiries or questions, please contact harshyadav6642@gmail.com
