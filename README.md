# Cinema Swipe

[![jongan69 - cinemaswipe](https://img.shields.io/static/v1?label=jongan69&message=cinemaswipe&color=blue&logo=github)](https://github.com/jongan69/cinemaswipe "Go to GitHub repo")

[![GitHub tag](https://img.shields.io/github/tag/jongan69/cinemaswipe?include_prereleases=&sort=semver&color=blue)](https://github.com/jongan69/cinemaswipe/releases/)
[![issues - ExpoRouterAuthTemplate](https://img.shields.io/github/issues/jongan69/cinemaswipe)](https://github.com/jongan69/cinemaswipe/issues)
[![stars - ExpoRouterAuthTemplate](https://img.shields.io/github/stars/jongan69/cinemaswipe?style=social)](https://github.com/jongan69/cinemaswipe)

![Vercel deployments](https://img.shields.io/github/deployments/jongan69/cinemaswipe/production?style=flat&logoColor=white&label=Vercel%20Deployment)
[![EAS Update](https://github.com/jongan69/cinemaswipe/actions/workflows/update.yml/badge.svg)](https://github.com/jongan69/cinemaswipe/actions/workflows/update.yml)
[![CodeQL](https://github.com/jongan69/cinemaswipe/actions/workflows/codeql.yml/badge.svg?branch=master)](https://github.com/jongan69/cinemaswipe/actions/workflows/codeql.yml)

This is a template for building a mobile app with Expo, featuring authentication using Expo Router for routing. The project is configured for deployment on Vercel, making it easy to host your app in the cloud and dynamic on mobile.

[![view - Documentation](https://img.shields.io/badge/view-Documentation-blue?style=for-the-badge)](/docs/ABOUT.md)

## DEMO

[![View Web - Vercel](https://img.shields.io/badge/View_Web-Vercel-2ea44f?style=for-the-badge)](https://cinemaswipe.vercel.app/)

[![Try Mobile with Expo Go](https://img.shields.io/badge/Try%20%20Mobile%20App%20with%20Expo%20Go-4630EB.svg?style=flat-square&logo=EXPO&labelColor=f3f3f3&logoColor=000)](https://expo.dev/%40jongan69/cinema-swipe?serviceType=eas&distribution=expo-go&scheme=&channel=master&sdkVersion=49.0.0)

## Getting Started

Follow these steps to get started with the Expo Router Auth Template:

### Prerequisites

- Make sure you have Node.js and npm installed on your machine.
- Install the Expo CLI globally by running:

  ```bash
  npm install -g expo-cli
  ```

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/expo-router-auth-template.git
   ```

2. Change into the project directory:

   ```bash
   cd expo-router-auth-template
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

### Configuration

1. **Authentication Configuration:**

   - Configure your authentication provider in the `src/auth` directory.

2. **Vercel Deployment:**

   - Ensure you have a Vercel account and the Vercel CLI installed.
   - Run the following command to link your project with Vercel:

     ```bash
     vercel
     ```

   - Follow the prompts to set up your deployment.

### Usage

- Start the Expo development server:

  ```bash
  npm start
  ```

- Open the Expo client on your mobile device or use an emulator to preview the app.

## Deployment

### Vercel

1. Push your changes to your GitHub repository.

2. Vercel will automatically detect your project and provide a deployment URL.

## Features

- **Authentication:** Integrated authentication system using Expo Secure Store.

- **Expo Router:** File based routing

- **Vercel Integration:** Seamless deployment on Vercel for web-based hosting.

## Contributing

Feel free to contribute to this project. Please follow the [Contribution Guidelines](CONTRIBUTING.md).

## License

Released under [MIT](/LICENSE) by [@jongan69](https://github.com/jongan69).

### Notes

--- Use "web3": "4.0.2" to avoid error
--- Use npx expo start --go
--- Use npx expo install --fix
--- Use npx expo start --no-dev --minify. --no-dev