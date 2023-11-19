# Expo Router Auth Template

[![jongan69 - ExpoRouterAuthTemplate](https://img.shields.io/static/v1?label=jongan69&message=ExpoRouterAuthTemplate&color=blue&logo=github)](https://github.com/jongan69/ExpoRouterAuthTemplate "Go to GitHub repo")

[![GitHub tag](https://img.shields.io/github/tag/jongan69/ExpoRouterAuthTemplate?include_prereleases=&sort=semver&color=blue)](https://github.com/jongan69/ExpoRouterAuthTemplate/releases/)
[![issues - ExpoRouterAuthTemplate](https://img.shields.io/github/issues/jongan69/ExpoRouterAuthTemplate)](https://github.com/jongan69/ExpoRouterAuthTemplate/issues)
[![stars - ExpoRouterAuthTemplate](https://img.shields.io/github/stars/jongan69/ExpoRouterAuthTemplate?style=social)](https://github.com/jongan69/ExpoRouterAuthTemplate)

![Vercel deployments](https://img.shields.io/github/deployments/jongan69/ExpoRouterAuthTemplate/production?style=flat&logoColor=white&label=Vercel%20Deployment)
[![EAS Update](https://github.com/jongan69/ExpoRouterAuthTemplate/actions/workflows/update.yml/badge.svg)](https://github.com/jongan69/ExpoRouterAuthTemplate/actions/workflows/update.yml)
[![CodeQL](https://github.com/jongan69/ExpoRouterAuthTemplate/actions/workflows/codeql.yml/badge.svg?branch=main)](https://github.com/jongan69/ExpoRouterAuthTemplate/actions/workflows/codeql.yml)
[![pages-build-deployment](https://github.com/jongan69/ExpoRouterAuthTemplate/actions/workflows/pages/pages-build-deployment/badge.svg?branch=main)](https://github.com/jongan69/ExpoRouterAuthTemplate/actions/workflows/pages/pages-build-deployment)

This is a template for building a mobile app with Expo, featuring authentication using Expo Router for routing. The project is configured for deployment on Vercel, making it easy to host your app in the cloud and dynamic on mobile.

[![view - Documentation](https://img.shields.io/badge/view-Documentation-blue?style=for-the-badge)](/docs/ABOUT.md)

## DEMO

[![View Web - Vercel](https://img.shields.io/badge/View_Web-Vercel-2ea44f?style=for-the-badge)](https://test-rn.vercel.app)

[![Try Mobile with Expo Go](https://img.shields.io/badge/Try%20%20Mobile%20App%20with%20Expo%20Go-4630EB.svg?style=flat-square&logo=EXPO&labelColor=f3f3f3&logoColor=000)](https://expo.dev/%40jongan69/expo-router-auth-template?serviceType=eas&distribution=expo-go&scheme=&channel=main&sdkVersion=49.0.0)

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
