# Restaurant Finder App

## Problem

Customers working at Cogent Labs in Roppongi often face difficulties deciding where to eat for lunch. They need a web app that simplifies this process by suggesting restaurants near the office. The app should also allow keyword-based searches for specific types of food or cuisines. Additionally, viewing pictures and reviews would help them make informed decisions about trying new places.

## Solution

The **Restaurant Finder App** helps users discover restaurants near Cogent Labs, view detailed information about each restaurant, and display the selected restaurant on a map. The app integrates with the **Foursquare Places API** to fetch restaurant data and uses the **Google Maps API** for map rendering and location visualization.

### Key Features:

1. **Random Selection of a Restaurant**: Randomly selects a restaurant within a 1km radius of the Cogent Labs Office (35.6646782,139.7378198).

2. **Interactive Map View**: Provides a map view displaying the location of the randomly selected restaurant and the Cogent Labs Office.

3. **Keyword-Based Restaurant Search**: Allows users to search for restaurants within a 1km radius of the office using specific keywords (e.g., "sushi", "pizza").

4. **Detailed Restaurant Reviews Page**: Displays user reviews, ratings, and photos for each restaurant in a page, giving users more context and information before making a choice.

## Prerequisites

Before running the application, ensure the following:

1. **Node.js** (>=v20.15) installed on your machine.

2. **API Keys**
   - **Foursquare API Key**: Sign up at [Foursquare Developers](https://docs.foursquare.com/developer/reference/places-api-get-started) to get your API key.
   - **Google Maps API Key**: Enable the Maps JavaScript API at [Google Cloud Console](https://console.cloud.google.com/).

## How to Run the App

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/tszyanalau/restaurant-finder-app.git
   cd restaurant-finder-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Add environment variables:
   - Create a `.env.local` file and add the following:
     ```env
     VITE_FS_API_KEY=your_foursquare_api_key
     VITE_GOOGLE_API_KEY=your_google_maps_api_key
     ```

### Run the App

Start the development server:

```bash
npm run dev
```

Open the app at [http://localhost:5173](http://localhost:5173).

## Available Scripts

The following scripts are available for development, testing, and building the project:

- **`npm run build`**: Builds the app for production using Vite.
- **`npm run lint`**: Checks code quality using ESLint.
- **`npm run lint:fix`**: Fixes linting issues automatically.
- **`npm run prettier:fix`**: Formats code and assets using Prettier.
- **`npm run test`**: Runs unit tests using Vitest.
- **`npm run test:watch`**: Watches for changes and re-runs tests.
- **`npm run test:ui`**: Launches the Vitest UI for interactive test exploration.

## Technical Choices

### **1. React with TypeScript**

- React provides a modular and component-based architecture for building the UI.
- TypeScript adds type safety, reducing runtime errors and improving code maintainability.

### **2. Foursquare API**

- Integrated for keyword-based restaurant searches (`/places/search`) and fetching detailed restaurant data (`/places/{fsq_id}`), including photos, reviews, and location.
- Provides robust and well-documented [API](https://docs.foursquare.com/developer/reference/search-data).

### **3. Google Maps API**

- Used for interactive map rendering and precise location visualization.
- Allows placing custom markers (e.g., office location and selected restaurant).

### **4. React Router**

- Enables client-side routing for seamless navigation between pages.
- Used for dynamic routes like `/restaurant/:id` to display restaurant details.

### **5. Bootstrap**

- Bootstrap ensures responsive design, making the app usable across devices.
- Pre-built UI components accelerate development.

### **6. Redux Toolkit**

- Manages global application state efficiently.
- Simplifies data fetching and caching via **RTK Query**, reducing boilerplate code.

### **7. Vite**

- Chosen for its fast development server and optimized build process.
- Offers better performance than traditional build tools like Webpack.
- Supports TypeScript out of the box, eliminating additional setup.

### **8. Vitest**

- A modern testing framework used for unit testing React components and utilities.
- Provides fast and reliable test execution.

### **9. ESLint and Prettier**

- **ESLint** enforces consistent code quality.
- **Prettier** ensures uniform code formatting, reducing friction in collaborative environments.

### **10. Commitlint and lint-staged**

- **Commitlint** enforces meaningful commit messages, aiding in better version control.
- **lint-staged** runs pre-commit checks on staged files, ensuring only formatted code is committed.

## Trade-offs and Decisions

1. **Google Places API vs. Foursquare API**:

   - The **Google Places API** offers better integration with Google Maps, including native support for routes, directions and rich place data like URL of the official Google page for the place.
   - The **Foursquare API** was chosen due to its robust restaurant-specific data and the ability to directly call the API from the frontend without requiring a backend proxy, reducing development time. While this approach exposes the API key and is not ideal for production, it was a trade-off given the time constraints.

2. **Using Default Bootstrap Styles**:
   - The app uses Bootstrap's default styles and classes for rapid UI development. While this accelerates initial development, it lacks custom theming and branding.

## What Could Be Improved

1. **Secure API Calls**:

   - Set up a backend server to proxy API calls and secure API keys.
   - Protect API usage and prevent unauthorized access.

2. **Switch to Google Places API**:

   - If time permits, switching to the Google Places API could offer better synergy with Google Maps for richer functionality

3. **Enhanced Testing**:

   - Add integration tests and end-to-end workflows using tools like **Cypress**.
   - Perform cross-browser and cross-device testing to ensure consistent functionality and usability using tools like **Percy**.

4. **Detailed Restaurant Reviews Page**:

   - Add a dedicated page by using the Get Place Tips API (`/places/{fsq_id}/tips`) to display detailed reviews for each restaurant, including the feedbacks with photos.

5. **Custom Theming**:

   - Replace Bootstrap’s default styles with a tailored theme for a more polished UI.

6. **Changelog and Release Management**:
   - **Changelog**: Use Changesets for automated changelog generation and semantic versioning.
   - **Release Process**: Use tools like GitHub Actions to automate the release process, including tagging versions and generating release notes.
