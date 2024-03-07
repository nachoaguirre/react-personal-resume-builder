
# React Personal Resume Builder

This project is a personal resume site builder, developed with React and Vite. It's perfect for professionals looking to have a personal website to showcase their experience, skills, and to connect with others. It is completely open source and easily customizable to fit your specific needs.

## Features

- **Dynamic Sections:** Includes sections for "About Me", "Resume", and "Contact".
- **Multi Language:** Currently allows the visitor to switch between english and spanish. It also has a browser language detector to set the default language.
- **Easy Configuration:** Set up your site with ease using environment variables and configuration files.
- **Customizable Theme:** Customize appareance changing colors easily.
- **Responsive Design:** Designed to look great on both mobile and desktop devices.
- **Functional Contact Form without backend code:** This template uses emailjs service to allow sending emails in contact form. Emailjs is free to use.


## Getting Started

### Prerequisites

- Install [Node.js](https://nodejs.org) in your computer

- This project uses [Yarn](https://yarnpkg.com) as package manager, but you can use npm safely
```bash
npm install --global yarn
```

### Installation

Clone this repository
```bash
git clone git@github.com:nachoaguirre/react-personal-resume-builder.git
```

Enter the project directory
```bash
cd react-personal-resume-builder
```

Install dependencies
```bash
yarn install
```

Duplicate .env.dist file into .env file
```bash
cp .env.dist .env
```

Duplicate src/config.dist.js file into src/config.js file
```bash
cp src/config.dist.js src/config.js
```

Duplicate src/theme.dist.scss file into src/theme.scss file
```bash
cp src/theme.dist.scss src/theme.scss
```

### Run Locally

Once you have installed the project and created the `.env` file you can run the following command to start the development server:

```bash
yarn dev
```

This will start the development server, the terminal will show you the local address where the project is running. Just open your browser and go to that address.

## Customizating

### Site Configuration

You can customize the site by modifying the `src/config.js` file. This file contains the site's configuration, such as your personal data, and the sections settings.

| Property | Description |
| -------- | ----------- |
| `name` | Your name |
| `role` | Your title or job, used in header and site title |
| `birthday` | Used to calculate your age dynamically in About section |
| `baseUrl` | The main URL of your site, used to set the canonical meta tag |
| `useAnalytics` | If set to `true`, the site will use Google Analytics, ensure to set the `VITE_ANALYTICS_ID` env variable (G-XXXXXXXXXX) |
| `useAnalyticsInDev` | If set to `true`, Analytics tracking will be enabled in development mode |
| `sections` | An array of objects, each object represents a section in the site. You can change the title name of each section, change the visibility, and set the icon to be displayed in the navigation bar. |

### Theme Configuration

You can customize the site's theme by modifying the `src/theme.scss` file. This file contains the site's theme configuration, such as colors, fonts, and other styles.

### Site Contents

You should customize the site's content by modifying the `public/locales/en/translation.json` and `public/locales/es/translation.json` files. This files contains the site's content in english and spanish.

### Enable Contact Form

The contact form uses emailjs service to send emails.

Emailjs is a free service that allows you to send emails from your website. You can sign up for free at [emailjs.com](https://www.emailjs.com/).

The free plan allows you to send 200 emails per month.

To enable the contact form, you need to set the following environment variables with your emailjs data:

`VITE_EMAILJS_SERVICE_ID`

`VITE_EMAILJS_TEMPLATE_ID`

`VITE_EMAILJS_PUBLIC_KEY`

### Enable Recaptcha in Contact Form

To enable recaptcha in contact form, you need to set the following environment variable with your recaptcha site key:

`VITE_RECAPTCHA_SITE_KEY`

### Enable Google Analytics

To enable Google Analytics, you need to set the following environment variable with your Google Analytics ID:

`VITE_ANALYTICS_ID`


## Deployment

To generate the static files, run the following command:

```bash
yarn build
```

This will generate a new folder called `build/` inside the proyect.

This is the folder you should upload to your hosting/server.
