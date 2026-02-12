# Chatbot Interface

A simple, responsive chatbot interface built with Next.js and Tailwind CSS. The bot supports basic local greetings and fetches jokes from an external API.

## 🚀 Setup Steps

1.  **Prerequisites**: Ensure you have Node.js installed (v18+ recommended).
2.  **Install Dependencies**:
    ```bash
    npm install
    ```
3.  **Run Development Server**:
    ```bash
    npm run dev
    ```
4.  **Open in Browser**: Visit [http://localhost:3000](http://localhost:3000).

## 🏗 Component & Architecture Decisions

-   **Framework**: **Next.js 16 (App Router)** was chosen for its server-side rendering capabilities and modern routing structure.
-   **Styling**: **Tailwind CSS v4** provides utility-first styling, ensuring a clean and consistent design without writing custom CSS files.
-   **Icons**: **Lucide React** is used for lightweight, consistent iconography (User, Bot, etc.).
-   **State Management**: React's built-in `useState` and `useEffect` hooks manage the chat history (`messages`) and UI states (`isTyping`), keeping the application lightweight without external state libraries.
-   **Component Structure**:
    -   `ChatLayout.tsx`: The main container managing state and logic.
    -   `MessageList.tsx`: Handles the rendering of message history and auto-scrolling.
    -   `MessageBubble.tsx`: A reusable component for distinct user/bot message styling.
    -   `ChatInput.tsx`: Manages user input and submission.

## 🎨 UX Considerations

-   **Responsiveness**: The interface is fully responsive, adapting from mobile screens to desktop layouts with a centered, rounded-corner card design on larger screens.
-   **Feedback**:
    -   **Typing Indicators**: A "Bot is typing..." animation appears while waiting for a response, mimicking natural conversation.
    -   **Auto-scrolling**: The chat automatically scrolls to the newest message to keep the conversation in view.
-   **Hybrid Logic**:
    -   **Immediate Feedback**: Local logic handles common greetings instantly for a snappy feel.
    -   **Fallback**: If the API fails or logic is missed, a polite fallback message is displayed.

## 🌐 API Used

The chatbot integrates with the **Official Joke API** for dynamic content.

-   **Endpoint**: `https://official-joke-api.appspot.com/random_joke`
-   **Method**: `GET`
-   **Usage**: When a user's message contains the word "joke", the backend route (`/api/chat`) fetches a random joke setup and punchline.

### Backend Route (`/api/chat`)
To keep the client lightweight and secure, the API call is proxied through a Next.js API route. This:
-   Avoids CORS issues.
-   Centralizes error handling.
-   Allows for easy extension to other APIs in the future.
