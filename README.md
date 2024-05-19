<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Project Description

This project is a back-end application featuring an authorization system, email confirmation, and password change functionality. Authorized users can also update their personal information.

## Technologies Used
- NestJS
- JWT for authentication
- Nodemailer for email handling
- MySQL with TypeORM
- PassportJS for authentication strategies

## Features
- User registration and login
- Email confirmation for new users
- Password reset functionality
- Authorized users can update their profile information

## Installation
1. Clone the repository:

```bash
$ git clone https://github.com/MA9IK/kit-start.git
```

2. Install dependencies:
```bash
$ cd kit-start
```
```bash
$ npm install
```


3. Set up environment variables. Create a .env file in the root directory and add the following:

```
DATABASE_TYPE=your database type
DATABASE_HOST=your database host
DATABASE_PORT=your database port
DATABASE_USER=your database user
DATABASE_PASSWORD=your database password
DATABASE_NAME=your database name
JWT_SECRET=your secret token
EMAIL_SERVICE=your email service (e. g., gmail)
EMAIL_USER=your email user
EMAIL_PASSWORD=your password for email
JWT_VERIFICATION_TOKEN_SECRET=your secret token for email&password confirmation
JWT_VERIFICATION_TOKEN_EXPIRATION_TIME=expiration time of your token
EMAIL_CONFIRMATION_URL=base url to confirm email
PASSWORD_RESET_URL=base url to confirm password reset
```

4. Run the application:

```bash
$ npm run start
```
# Usage

## Registration and Login
1. Register a new user by sending a POST request to `/auth/register` with the user details.
2. Confirm the email address by clicking the link sent to the user's email. (Need to send POST request from front-end to back-end with provided token to `/email-confirmation/confirm-email`)
3. Log in by sending a POST request to `/auth/login` with the user's email and password.

## Password Reset
1. Request a password reset by sending a POST request to `/password/reset-password` with the user's token.
2. Follow the instructions sent to the email to reset the password.

## Updating Profile Information
1. Authorized users can update their profile by sending a PATCH request to `/profile/update/:id` with the updated information.

## Contributing
1. Fork the repository.
2. Create a new branch (git checkout -b feature-branch).
3. Make your changes.
4. Commit your changes (git commit -am 'Add new feature').
5. Push to the branch (git push origin feature-branch).
6. Create a new Pull Request.

## License

This project is licensed under the MIT License.