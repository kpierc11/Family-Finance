💰 Family Finance Web App
A simple and modern web application for managing family finances, built with Next.js on the frontend and .NET Core Web API on the backend.

🚀 Tech Stack
Frontend:

Next.js 15

React 19

Tailwind CSS 4

TypeScript

Backend:

.NET Core Web API

📦 Project Structure
bash
Copy
Edit
/client       → Next.js frontend
/server       → .NET Core backend (API)
🛠️ Prerequisites
Make sure you have the following installed:

Node.js (v18+ recommended)

npm or Yarn

.NET SDK (v6 or later)

(Optional) Visual Studio Code with relevant extensions

📂 Client Setup (Frontend)
Navigate to the client directory and install dependencies:

bash
Copy
Edit
cd client
npm install
Running the Frontend in Development
bash
Copy
Edit
npm run dev
This starts the Next.js development server using Turbopack.

Build and Start (Production)
bash
Copy
Edit
npm run build
npm run start
Linting
bash
Copy
Edit
npm run lint
⚙️ Server Setup (Backend)
Navigate to the server directory and restore dependencies:

bash
Copy
Edit
cd server
dotnet restore
Running the API
bash
Copy
Edit
dotnet run
Make sure the API base URL is configured correctly in the frontend (e.g., .env.local or wherever applicable).

🔄 Running Both Frontend and Backend Concurrently
You can use concurrently (already in devDependencies) to run both projects:

From the root (or via a custom script), set up a command like:

bash
Copy
Edit
concurrently "npm run dev --prefix client" "dotnet run --project server"
🌱 Environment Variables
Create a .env.local file in the client folder to set any required environment variables, e.g.:

env
Copy
Edit
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
Update port or URL based on your backend configuration.

🙌 Contributing
Fork the repo

Create your feature branch (git checkout -b feature/YourFeature)

Commit your changes

Push to the branch

Open a pull request

📃 License
This project is licensed under the MIT License.
