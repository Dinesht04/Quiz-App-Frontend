# Quiz-Verse

![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![WebSockets](https://img.shields.io/badge/WebSockets-1A1B1D?style=for-the-badge&logo=websocket&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcn-ui&logoColor=white)
![Auth.js](https://img.shields.io/badge/Auth.js-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Google Gemini API](https://img.shields.io/badge/Google_Gemini_API-4285F4?style=for-the-badge&logo=google&logoColor=white)

---

## Table of Contents

* [About The Project](#about-the-project)
    * [Built With](#built-with)
* [Getting Started](#getting-started)
    * [Prerequisites](#prerequisites)
    * [Installation](#installation)
* [Usage](#usage)
* [Roadmap](#roadmap)
* [Contributing](#contributing)
* [License](#license)
* [Contact](#contact)
* [Acknowledgments](#acknowledgments)

---

## UI WAS MADE BY V0. Auth and states were configured by us.

## About The Project

Quiz-Verse is an open-source real-time quiz application that supports rooms with up to 100 players. The main motive behind creating this app is to provide a ready-to-use solution for:

* College projects
* College club events
* Any other use case where a real-time quiz is needed.

It's free for anyone to copy and use for their own interests. B.Tech can be challenging for those not passionate about it, so feel free to clone and utilize these projects for free marks !! <3

The application features two distinct quiz modes:
* **Lightning Mode:** A "fastest finger first" mode where speed is key.
* **Quiz Mode:** A normal quiz mode, focusing on accuracy.
Each mode consists of 5 questions generated dynamically.

The website is designed to be fully mobile-responsive, ensuring a seamless experience across various devices. In the lobby waiting room, users can engage in a live chat to communicate with each other while waiting for the quiz to start.

![Landing Page](/public/LandingPage.png)

### Built With

Quiz-Verse is built with a modern and robust technology stack to ensure performance and scalability.

* [Next.js](https://nextjs.org/)
* [Tailwind CSS](https://tailwindcss.com/)
* [ws (WebSockets)](https://github.com/websockets/ws)
* [shadcn/ui](https://ui.shadcn.com/)
* [TypeScript](https://www.typescriptlang.org/)

For backend architecture and details, please refer to the [Quiz-App-Backend repository](https://github.com/Dinesht04/Quiz-app-backend/). The application uses [Auth.js](https://authjs.dev/) with [Prisma](https://www.prisma.io/) and a PostgreSQL database for authentication, supporting Login with Google and Guest mode out of the box.

---

## Getting Started

This section provides instructions on how to set up and run your Quiz-Verse project locally.

### Prerequisites

Ensure you have the following software installed on your machine:

* `npm`
    ```bash
    npm install npm@latest -g
    ```

* `Node.js` (npm is included with Node.js)

### Installation

Follow these steps to get your development environment running:

1.  **Clone the frontend repository:**
    ```bash
    git clone https://github.com/Dinesht04/Quiz-App-Frontend.git
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd Quiz-App-Frontend/
    ```

3.  **Install dependencies:**
    ```bash
    npm i
    ```

4.  **Configure Environment Variables:**
    Copy the `example.env.local` and `example.env.prod` files to `.env.local` and `.env.prod` respectively, and populate them with your credentials.

    **For `.env.local` (local development):**
    ```env
    AUTH_SECRET= # Added by `npx auth`. Read more: [https://cli.authjs.dev](https://cli.authjs.dev)
    AUTH_GOOGLE_ID= # Your Google Client ID
    AUTH_GOOGLE_SECRET= # Your Google Client Secret
    DATABASE_URL= # Your PostgreSQL database URL (e.g., postgresql://user:password@host:port/database)
    NEXT_PUBLIC_FRONTEND_PRODUCTION_URL="http://localhost:3000/"
    NEXT_PUBLIC_WEBSOCKET_SERVER_URL="http://localhost:8080/" # Your local backend WebSocket server URL
    ```

    **For `.env.prod` (production build):**
    ```env
    AUTH_SECRET= # Added by `npx auth`. Read more: [https://cli.authjs.dev](https://cli.authjs.dev)
    AUTH_GOOGLE_ID= # Your Google Client ID
    AUTH_GOOGLE_SECRET= # Your Google Client Secret
    DATABASE_URL= # Your PostgreSQL database URL
    NEXT_PUBLIC_FRONTEND_PRODUCTION_URL=http://localhost:3000/
    NEXT_PUBLIC_WEBSOCKET_SERVER_URL= # Your hosted backend link. Backend repo at - [https://github.com/Dinesht04/Quiz-app-backend/](https://github.com/Dinesht04/Quiz-app-backend/)
    ```

5.  **Run the application:**
    You can use the following scripts defined in `package.json`:
    ```json
    "scripts": {
      "dev": "next dev --turbopack",
      "local": "dotenv -f .env.local -- next dev",
      "prod": "dotenv -f .env.prod -- next dev",
      "build": "next build",
      "start": "next start",
      "lint": "next lint",
      "format": "prettier --write ."
    }
    ```
    To start the development server locally:
    ```bash
    npm run local
    ```
    To start the development server connected to the Production Backend:
    ```bash
    npm run prod
    ```

---

## Usage

Here's how to use the Quiz-Verse application:

1.  **Access the application:** Once the server is running, navigate to `http://localhost:3000/` in your web browser.

2.  **Sign In:** You can sign in using your Google account or proceed in Guest mode.
    ![Sign-in](/public/Dashboard.png)
3.  **Create a Room:** From the dashboard, create a new quiz room.
    ![Dashboard](/public/Dashboard.png)
4.  **Share Room Code:** Copy the unique room code and share it with your friends or participants.
    ![Lobby-PreJoin](/public/Lobby-PreJoin.png)
5.  **Join Room:** Participants can join the room using the provided room code. The person who joins first automatically becomes the host.
    * **Live Chat:** In the lobby waiting room, a live chat feature allows users to communicate with each other while waiting for the quiz to begin.
    ![Lobby-PostJoin](/public/Lobby-PostJoin.png)
6.  **Configure Quiz:** As the host, you can select the difficulty using a slider and input the quiz topic. Be descriptive; there's no limit to the topic's length. You can also choose between **Lightning Mode** (fastest finger first) and **Quiz Mode** (normal quiz). Each quiz consists of 5 questions.
    ![Lobby Settings](/public/LobbySettings.png)
7.  **Start Quiz:** Upon clicking "Start," the backend queries the Gemini API to generate 5 questions based on your chosen topic. Once the questions are received, the quiz begins.
8.  **Live Progress:** During the quiz, a live-progress section displays real-time updates.
    ![ONgoing-Quiz](/public/ONgoing-Quiz.png)
    ![ONgoingQuiz2](/public/ONgoingQuiz2.png)
9.  **Quiz End:** When the quiz concludes, you have the option to export the leaderboard or return to the dashboard.
    ![Quiz-End](/public/Quiz-End.png)

---

## Roadmap

Here are some planned features and improvements for Quiz-Verse:

* [X] **Rejoin Room:** Implement the ability for players to rejoin a room after a quiz finishes.
* [ ] **Change Host:** Allow the current host to transfer host privileges to another player in the room.
* [ ] **Auto-Focus in Chat:** Auto-focus on the most recent message in chat, slide down to it automatically.
* [ ] **Enhance UI/UX:** Continuous improvements to the user interface and user experience.
* [ ] **Bug fixes and performance improvements:** Ongoing efforts to ensure stability and optimal performance.

---

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  **Fork the Project.**
2.  **Make/comment on an existing issue** or create a new one to discuss your proposed changes.
3.  **Create your Feature Branch:** `git checkout -b feature/AmazingFeature`
4.  **Commit your Changes:** `git commit -m 'Add some AmazingFeature'`
5.  **Push to the Branch:** `git push origin feature/AmazingFeature`
6.  **Open a Pull Request.**

Please make sure to update tests as appropriate.

---

## License

Distributed under the MIT License. See `LICENSE` for more information. This project is open-source and freely available for use, modification, and distribution.

---

## Contact

Feel free to reach out to the maintainers for any questions or collaborations:

* **Maintainers:**
    * [RajPranshu12](https://x.com/RajPranshu12)
    * [Dinesht_04](https://x.com/Dinesht_04)

Project Link: [https://github.com/Dinesht04/Quiz-App-Frontend/](https://github.com/Dinesht04/Quiz-App-Frontend/)

---

## Acknowledgments

* Inspired By Matiks.
* [ChooseAnOpenSourceLicense.com](https://choosealicense.com/)
* [Img Shields](https://shields.io/)
