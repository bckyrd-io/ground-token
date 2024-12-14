# Ground Token (for playgrounds)

This app allows administrators to manage playgrounds and their locations. Users can view, add, and delete playgrounds with GPS location integration. It's built using React Native and integrates mock JSON data for demonstration purposes.

## Features

### Admin Dashboard
- Displays weekly usage statistics with a bar chart.
- Summary cards for key metrics (e.g., total users, active users).
- Recent activity logs with timestamps.
- Management buttons to navigate to user and playground management screens.

### Playground Management
- Add playgrounds with:
  - Name
  - Description
  - GPS location fetched from the device.
- List all playgrounds with their details:
  - Name
  - Description
  - Latitude and Longitude.
- Delete playgrounds directly from the list.
- Mock JSON data is preloaded to simulate playground entries.

## Screens

### Admin Dashboard
- **Summary Cards:** Quick insights into users and revenue.
- **Weekly Usage Graph:** Visual representation of user activity.
- **Recent Activities:** Log of actions taken by users or admins.

### Admin Playgrounds
- **Form to Add Playgrounds:** Input fields for name, description, and a button to fetch GPS location.
- **Playground List:** Displays all added playgrounds with a delete button for each.

## Technologies Used
- **React Native:** Framework for building native mobile apps using JavaScript.
- **Expo Location:** Fetches the GPS location of the device.
- **React Native Chart Kit:** Displays bar charts.

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/your-repo-url
   cd ground-token
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
4. Open the app on your device using the Expo Go app or an emulator.

## Mock Data
The app uses mock JSON data to populate initial playground entries and dashboard metrics.
- **Playgrounds:** Predefined entries with name, description, and GPS coordinates.
- **Dashboard Metrics:** Weekly usage data and summary cards.

## Usage

### Adding a Playground
1. Navigate to the **Admin Playgrounds** screen.
2. Fill in the playground name and description.
3. Fetch the current GPS location by tapping the **Get GPS Location** button.
4. Tap **Add Playground** to save.

### Deleting a Playground
1. Scroll through the list of playgrounds.
2. Tap the **Delete** button on the entry you want to remove.


## User Scenario

- A user downloads the Playgrounds Management App to explore nearby playgrounds. After launching the app, they quickly locate the Playgrounds section and browse through the list of available options. They find a playground close to their home, check its details, and note the coordinates to visit later. Impressed by the clean design and ease of navigation, they decide to recommend the app to friends who also enjoy family outings.

- An admin logs into the app to manage playground listings. In the Admin Dashboard, they review key metrics like the number of users and weekly activity. They then navigate to the Playground Management section to update information about a playground, including its description and GPS coordinates. After ensuring the details are accurate, they add a new entry for a recently developed playground and delete an obsolete one, all within minutes. 

## Screenshots
![Dashboard Screenshot](#)
![Add Playground Form](#)

## Contributing

1. Fork the repository.
2. Create a new branch for your feature:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Description of changes"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.

## Contact
For questions or suggestions, please reach out to [your email or GitHub profile].
