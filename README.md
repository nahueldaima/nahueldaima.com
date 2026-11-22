
# Nahuel Daima Personal Website

![Next.js](https://img.shields.io/badge/Next.js-15-black.svg)
![License](https://img.shields.io/badge/License-MIT-blue.svg)

Welcome to the repository for Nahuel Daima's personal website and blog, built with Next.js and React.

## Table of Contents

- [About](#about)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Scripts](#scripts)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## About

This project is the source code for my personal website and blog. It's built with Next.js to provide a performant and scalable solution for sharing my experiences and thoughts as a technology enthusiast and digital nomad.

## Features

- **Next.js (App Router) + React**: every page is prerendered to static HTML at build time.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **Markdown content**: posts live in `content/<locale>/tech/<slug>.md`, rendered at build time.
- **Internationalization**: English and Spanish under `/en` and `/es`.
- **SEO Optimization**: per-page meta, hreflang alternates, and a generated sitemap and RSS feed.
- **Responsive Design**: Fully responsive design for all devices.

## Installation

To get a local copy up and running, follow these simple steps:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/nahueldaima/nahueldaima.com.git
    ```

2. **Navigate to the project directory**:
    ```bash
    cd nahueldaima.com
    ```

3. **Install dependencies**:
    ```bash
    npm install
    ```

## Usage

To start the development server, run:
```bash
npm run dev
```

To build the project for production and run it, run:
```bash
npm run build
npm start
```

## Scripts

- **`dev`**: Start the development server.
- **`build`**: Build the project for production (all pages prerendered).
- **`start`**: Serve the production build on `$PORT` (default 3000).
- **`lint`**: Run ESLint to check for linting errors.
- **`lint:fix`**: Run ESLint and fix linting errors.
- **`icons`**: Regenerate the bundled icon set after editing `scripts/build-icons.mjs`.

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project.
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the Branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Nahuel Daima - [LinkedIn](https://www.linkedin.com/in/nahueldaima/?locale=en_US) - [Twitter](https://x.com/leodaima)

Project Link: [https://github.com/nahueldaima/nahueldaima.com](https://github.com/nahueldaima/nahueldaima.com)

## Some shortcuts

On MD if I want to open a link to a page on the same tab: `<ProseA href="https://example.com" target="_self">Example</ProseA>`