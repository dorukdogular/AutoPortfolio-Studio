# AutoPortfolio Studio

![AutoPortfolio Studio Logo](https://raw.githubusercontent.com/dorukdogular/autoportfolio-studio/main/logo.svg) <!-- TODO: Replace with actual path to logo -->

**AutoPortfolio Studio** is a modern, AI-powered web application that allows you to generate, customize, and download a complete personal portfolio website in minutes. No accounts, no databases, no hassle—everything runs in your browser.

Go from an idea to a production-ready, downloadable `.zip` file containing a beautiful, responsive, and personalized portfolio.

## Key Features

-   **🤖 AI-Powered Content:** Let Gemini write your bio, suggest project ideas, and even recommend the best layout for your profile.
-   **🎨 Multiple Layouts & Themes:** Choose from 9+ professionally designed, fully responsive layouts and multiple color themes to match your personal brand. You can even generate unique themes with AI.
-   **🔧 Deep Customization:** Fine-tune every aspect of your site, including fonts (from over 100 Google Fonts), colors, sizing, and which sections to show.
-   **🖼️ Live Preview:** See your changes reflected instantly in a real-time preview of your website.
-   **🚀 One-Click Export & Deploy:** Download your entire production-ready website as a clean, simple `.zip` file, and get simple instructions to deploy for free on services like GitHub Pages.
-   **🔒 Privacy First:** No user accounts or data storage. Everything is processed in your browser, ensuring your information remains private.

## Getting Started

Follow these instructions to get a local copy up and running for development and testing purposes.

### Prerequisites

-   A modern web browser.
-   An API Key for the Google Gemini API.

### Installation & Running

This project is designed to run directly in the browser without a local build step.

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/dorukdogular/autoportfolio-studio.git
    cd autoportfolio-studio
    ```

2.  **Set up environment variables:**
    The application requires a Gemini API key to function. You must have a mechanism to provide this key as `process.env.API_KEY` in the execution environment where the app is hosted. The application code is already set up to read this variable.

    **Warning:** For security, it is strongly recommended to host this application on a platform that supports environment variables, rather than hardcoding your API key directly into the client-side code.

3.  **Run the application locally:**
    You can serve the `index.html` file using any simple static server. A popular choice is `live-server`.
    ```sh
    # If you don't have live-server, install it globally
    npm install -g live-server

    # Run the server from the project root
    live-server
    ```
    Your browser should open to the local address where the application is running. For the AI features to work, you would need to set up a local environment that can provide the API key.

## How to Use

1.  **Start Building:** Open the application and click "Start Building for Free".
2.  **Add Your Information:** Fill out the forms in the editor tabs on the left (Basic Info, Projects, Experience, etc.).
3.  **Use the AI Assistant:** Let the AI help you write your bio, suggest projects, or recommend a layout.
4.  **Customize the Design:** Choose a layout, theme, font, and other settings in the design tabs.
5.  **Preview:** Watch your portfolio come to life in the real-time preview panel.
6.  **Download & Deploy:** When you're happy with the result, click "Download .zip". Follow the instructions in the "Deploy" modal to host your site for free on services like GitHub Pages.

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

Please see [`CONTRIBUTING.md`](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

Distributed under the MIT License. See `LICENSE` for more information.
