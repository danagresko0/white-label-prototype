# Ionic White Label Prototype App

An Angular-based mobile application built with **Ionic Framework** and **Capacitor**.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Usually comes with Node.js
- **Ionic CLI** - Install globally with: `npm install -g @ionic/cli`
- **Angular CLI** - Install globally with: `npm install -g @angular/cli`

## Installation

1. **Clone the repository** (if applicable):
   ```bash
   git clone <repository-url>
   cd demo
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

## Getting Started

### Development Server

To start the development server and view the app in your browser:

```bash
npm start
```

Or use the Angular CLI directly:

```bash
ng serve
```

The app will be available at `http://localhost:4200/`

### Building for Production

To build the app for production:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start development server with live reload |
| `npm run build` | Build for production |
| `npm run watch` | Build with watch mode and configuration |
| `npm test` | Run unit tests with Karma |
| `npm run lint` | Run ESLint checks |

## Project Structure

```
src/
├── app/                    # Application root component and routing
│   ├── home/              # Home page component
│   ├── profile/           # Profile page component
│   ├── app.component.*    # Root component files
│   └── app.routes.ts      # Route configuration
├── assets/                # Static assets (images, icons, etc.)
├── environments/          # Environment-specific configurations
├── theme/                 # SCSS theme variables
├── global.scss            # Global styles
└── main.ts               # Application entry point
```

## Technologies Used

- **Framework**: Angular 20
- **Mobile Framework**: Ionic Framework 8
- **Mobile Runtime**: Capacitor 8
- **Styling**: SCSS
- **Package Manager**: npm
- **Testing**: Karma + Jasmine

## Development Tips

- **Live Reload**: The development server automatically reloads when you save changes
- **Styling**: Global styles are in `src/global.scss`. Component-specific styles use `*.scss` files
- **Routing**: App routes are defined in `src/app/app.routes.ts`
- **Icons**: ionicons are available through the `@ionic/angular` package

## Building Mobile Apps

To build and deploy for iOS/Android using Capacitor:

1. Build the web app:
   ```bash
   npm run build
   ```

2. Sync to native platforms:
   ```bash
   npx cap sync
   ```

3. Open in Xcode (iOS) or Android Studio (Android):
   ```bash
   npx cap open ios    # For iOS
   npx cap open android # For Android
   ```

For more information, visit [Capacitor Documentation](https://capacitorjs.com/).

## Troubleshooting

- **Port already in use**: If port 4200 is in use, specify a different port: `ng serve --port 4201`
- **Dependencies issues**: Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- **Build failures**: Ensure you're using a compatible Node.js version

## Learn More

- [Ionic Documentation](https://ionicframework.com/docs)
- [Angular Documentation](https://angular.io/docs)
- [Capacitor Documentation](https://capacitorjs.com/)

## License

Ionic Framework - See [Ionic Framework License](https://github.com/ionic-team/ionic-framework/blob/main/LICENSE)
