# Recipe Search Application

## Overview

The Recipe Search Application is a web application developed for the **DataStax Christmas Giveaway**. This project showcases the capabilities of the **DataStax Astra** database, allowing users to search for recipes by title. Built with **Astro**, this application demonstrates how to create a modern web experience while leveraging the power of a cloud-based database.

## Features

- **Search Functionality**: Users can search for recipes by entering keywords in the title.
- **Dynamic Results**: The application retrieves and displays matching recipes in real-time.
- **DataStax Astra Integration**: Utilizes the DataStax Astra database to store and query recipe data.

## Technologies Used

- **Frontend**: Astro
- **Database**: DataStax Astra (Apache Cassandra)
- **JavaScript/TypeScript**: For client-side and server-side logic

## Getting Started

Follow these steps to set up and run the Recipe Search Application locally:

### Prerequisites

- **Node.js** (version 14 or higher)
- **npm** (Node Package Manager)
- A **DataStax Astra** account with a database set up

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/recipe-search-app.git
   cd recipe-search-app
   ```

2. **Install Dependencies**

   Run the following command to install the required dependencies:

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**

   Create a `.env` file in the root of the project and add your DataStax Astra connection details:

   ```plaintext
   ASTRA_DB_API_ENDPOINT=https://<your-database-endpoint>
   ASTRA_DB_APPLICATION_TOKEN=<your-application-token>
   ```

   Replace `<your-database-endpoint>` and `<your-application-token>` with your actual DataStax Astra credentials.

### Running the Application

1. **Start the Development Server**

   Run the following command to start the development server:

   ```bash
   npm run dev
   ```

2. **Access the Application**

   Open your web browser and navigate to `http://localhost:4321` to access the Recipe Search Application.

### Usage

- Enter a recipe title in the search bar and click the "Search" button.
- The application will query the DataStax Astra database for matching recipes and display the results dynamically.

## Contributing

Contributions are welcome! If you have suggestions for improvements or new features, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- **DataStax Astra**: Thank you for providing a powerful cloud-based database solution that makes it easy to manage and query data.
- **Astro**: A special thanks to the Astro framework for enabling the creation of fast and modern web applications.
- **DataStax Christmas Giveaway**: This project was developed as part of the DataStax Christmas Giveaway, showcasing the integration of Astra with modern web technologies.
