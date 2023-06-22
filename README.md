# Voosh Assignment

This assignment is a web application that allows users to register, login, place orders, and view order details. It provides both email/password login and Google sign-in options.

## Demo Video

You can watch the demo video of the Voosh Assignment by clicking on the link below:

[Voosh Assignment Demo Video](https://bit.ly/voosh-demo)

In the demo video, you will see a step-by-step demonstration of the registration process, login options, order placement, and viewing order details in the Voosh Assignment web application.

## Flow

1. Registration:

   - Users can register by providing their email, phone, and name.
   - After successful registration, users are redirected to the order page.
   - If the user has already placed an order, they will see their order details.
   - If the user has not yet placed an order, they will see a form to add an order (item, quantity, cost).
   - Users can only add one order.

2. Login:

   - Users can log in using their registered email and password.
   - Alternatively, users can use the Google sign-in option.
   - Google sign-in synchronizes with the database using the user's email and password.

3. Order Page:

   - Once logged in, users can access the order page.
   - If the user has already placed an order, they will see their order details.
   - If the user has not yet placed an order, they will see a form to add an order (item, quantity, cost).

4. Logout:
   - Users can log out from the application.

## Installation

To run the Voosh Assignment locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/voosh-assignment.git
   ```

2. Navigate to the project directory:

   ```bash
   cd voosh-assignment
   ```

3. Install the dependencies in both client and sever:

   ```bash
   npm install
   ```

4. Start the application in server and client:

   ```bash
   npm start
   ```

   The application will be accessible at `http://localhost:3000`.
