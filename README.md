## JET Restaurant Finder

The JET Restaurant Finder is a full-stack application that allows users to search for restaurants in the UK by postcode, offering features like filtering by cuisine, sorting by distance or rating, and pagination of results. The system leverages a robust backend with caching capabilities using Redis to enhance performance by storing previously fetched data, reducing the frequency of API requests.

### Features

- **Search Functionality**: Users can search for restaurants based on a UK postcode.
- **Dynamic Filtering**: Users can filter the displayed results by whether the restaurant is currently open and by specific cuisines.
- **Sorting Options**: Restaurants can be sorted by rating or distance from the searched postcode.
- **Pagination**: Results are paginated to enhance user experience by limiting the number of items displayed per page.
- **Interactive Map Links**: Each restaurant's address is clickable, linking to its location on Google Maps, facilitating easy access to directions.


### Technology Stack

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database/Caching**: Redis
- **HTTP Client**: Axios for API requests
- **Styling**: CSS

### Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

#### Prerequisites

- Node.js
- Docker
- Docker Compose

#### Installation

1. **Clone the repository**
   ```sh
   git clone https://github.com/pouyehbnj/restaurant-webapp.git
   cd restaurant-webapp
   ```

2. **Build and run the Docker containers**
   ```sh
   docker-compose up --build
   ```

This command builds the Docker images for the frontend, backend, and Redis server if they don't already exist and starts the containers.

#### Usage

- After running the Docker containers, the application should be accessible via `http://localhost:80` for the frontend.
- The backend API will be accessible via `http://localhost:5000`.

#### Running Tests

To run the automated tests for this system:

```sh
docker-compose -f docker-compose.test.yml up --build
```

This command runs the test suite specified in the Docker service for testing.

### Assumptions

- **Distance Calculation**: It was assumed that the `driveDistanceMeters` field from the API indicates the distance of the restaurant from the searched postcode. This assumption was used to calculate and sort the restaurants based on distance.
- **Operational Status**: It was also assumed that the `isOpenNowForCollection` field from the API indicates if the restaurant is open at the moment or not. 
- **Location Coordinates**: It was assumed that the `coordinates` field in the data represents the geographic coordinates (latitude and longitude) of the restaurant's location. These coordinates are used to link each restaurant’s address to Google Maps, providing users with directional assistance directly from the application.

### Potential Improvements

- **Performance Optimization**: Implementing a reverse proxy like Nginx could enhance performance by managing static content, compressing responses, and caching frequently accessed data.
- **Comprehensive Testing:** Expand both functional and non-functional testing to cover more edge cases, stress tests, and performance benchmarks to ensure the application scales effectively under load and maintains functionality as new features are added.
- **Logging Mechanism**: Implementing a comprehensive logging mechanism to capture detailed information about the application's operational state and user interactions. This would facilitate better debugging, performance monitoring, and security auditing.
- **Advanced Filtering**: Implement more commprehensive filtering options including options for all the available cuisines and additional filtering options such as delivery costs or available deals of the restaurant.
- **UI Enhancements**: Improve the user interface with more interactive elements to enhance user experience.
- **Responsive Design**: Enhance the responsiveness of the front-end to ensure it works seamlessly across all devices and screen sizes.

### API Reference

- **GET `/api/restaurants/:postcode`**: Fetches restaurants based on the postcode with support for various query parameters:
  - **Sort**: `?sort=rating` or `?sort=distance`
  - **Page**: `?page=number`
  - **Open**: `?isOpen=true|false`
  - **Cuisine**: `?cuisine=name`

  Example: `GET /api/restaurants/NE97TY?page=1&sort=rating&isOpen=true&cuisine=Pizza`
