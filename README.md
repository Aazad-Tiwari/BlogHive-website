# Blog Hive

Welcome to **Blog Hive**, a modern blog platform where technology meets creativity. Designed with a focus on performance, responsiveness, and usability, Blog Hive is powered by some of the most cutting-edge tools in web development.

## Features

- **User Authentication**: Powered by Appwrite for secure login and logout.
- **CRUD Operations**: Create, read, update, and delete posts effortlessly.
- **Responsive Design**: Built with Tailwind CSS for seamless viewing on any device.
- **Dynamic Routing**: React Router ensures smooth navigation across pages.
- **Form Management**: React Hook Form for efficient and elegant form handling.
- **State Management**: Centralized state with Redux to handle application data.

## Tech Stack

### Frontend

- **React**: For building reusable, declarative UI components.
- **React Router**: For dynamic routing and navigation.
- **Redux**: For centralized state management.
- **React Hook Form**: For form validation and handling user inputs.
- **Tailwind CSS**: For crafting responsive and modern designs.

### Backend

- **Appwrite**: For authentication, database, and server-side functionality.

### Hosting

- **Vercel**: For fast and reliable hosting.

## Installation

Follow the steps below to set up the project on your local machine:

### Prerequisites

- Node.js installed on your system.

### Setup

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set environment variables:**

   Create a `.env` file in the root directory and add the following:

   ```plaintext
   VITE_APPWRITE_URL = <Your Appwrite Endpoint>
   VITE_APPWRITE_PROJECT_ID = <Your Appwrite Project ID>
   VITE_APPWRITE_DATABASE_ID = <Your Appwrite Database ID>
   VITE_APPWRITE_COLLECTION_ID = <Your Appwrite Collection ID>
   VITE_APPWRITE_BUCKET_ID = <Your Appwrite Bucket ID>
   VITE_API_KEY = <Tinymce API key>
   ```

4. **Start the development server:**

   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173`.

## Deployment

The website is hosted on **Vercel**. To deploy:

1. Push your changes to the main branch (or any specific branch linked to Vercel).
2. Vercel will automatically build and deploy the project.

Ensure your environment variables are properly set in Vercel's project settings.

## Common Issues

### CORS Errors

If you encounter CORS issues, ensure the Appwrite backend allows the origin of your deployed URL in its settings.

### Missing API Key in Commit History

If you've accidentally committed sensitive information, follow these steps to remove it:

1. Use Git filter-repo or BFG to clean the history.
2. Regenerate the API key from your Appwrite console.
3. Update the `.env` file with the new key.

## Why Blog Hive?

Blog Hive is a showcase of modern web development technologies. By leveraging tools like **React**, **Redux**, **Tailwind CSS**, and **Appwrite**, this project highlights expertise in:

- **Frontend Development**: Crafting elegant UIs and ensuring seamless user interactions.
- **Backend Integration**: Using Appwrite to handle authentication and database tasks.
- **State Management**: Employing Redux for efficient application state handling.
- **Routing**: Implementing dynamic navigation with React Router.
- **Form Handling**: Managing user inputs with React Hook Form.
- **Responsive Design**: Utilizing Tailwind CSS to deliver pixel-perfect layouts.

## Contributing

Contributions are welcome! Feel free to fork the repository and submit a pull request with your improvements.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

- Built with ❤️ using React, Tailwind CSS, Redux, and Appwrite.
- Inspired by the latest trends in web development.
