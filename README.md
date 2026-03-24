# MERN AI Chat App with OpenRouter SDK

A modern MERN stack application that allows users to interact with AI models using a flow-based interface built with React Flow and powered by the OpenRouter SDK.

## Features

✨ **Core Features:**
- Input prompt in a text box (Text Input Node)
- Display AI response in another box (Result Node)
- Connected by an animated edge in React Flow
- "Run Flow" button to send prompt to AI
- "Save" button to save prompt and response to MongoDB
- "History" sidebar to view and manage saved conversations
- Beautiful, responsive UI

🚀 **Tech Stack:**
- **Frontend:** React, React Flow (@xyflow/react), Axios
- **Backend:** Node.js, Express.js, MongoDB (Mongoose), OpenRouter SDK
- **AI:** OpenRouter API (300+ models available)

🔧 **API Improvements:**
- OpenRouter SDK integration for better reliability
- New `/api/conversations` endpoint to retrieve all conversations
- New `DELETE /api/conversations/:id` endpoint to delete conversations
- Health check endpoint `/api/health`
- Better error handling and logging

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- OpenRouter API Key (sign up at https://openrouter.ai/)

### Backend Setup

1. Navigate to the `backend` directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the `backend` directory with the following:
   ```
   MONGO_URI=mongodb://localhost:27017/mern-ai-app
   OPENROUTER_API_KEY=your_openrouter_api_key_here
   PORT=5000
   ```

4. Start the backend server:
   ```
   npm start
   ```
   The server will run on http://localhost:5000

### Frontend Setup

1. Navigate to the `frontend` directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the React app:
   ```
   npm start
   ```
   The app will run on http://localhost:3000

## Usage

1. Open the app in your browser (http://localhost:3000)
2. Type a prompt in the Text Input Node on the left
3. Click "▶ Run Flow" to get the AI response
4. View the response in the Result Node on the right
5. Click "💾 Save" to save the conversation to the database
6. Click "📋 History" to view all saved conversations
7. Load or delete previous conversations from the history panel

## API Endpoints

### Chat Endpoints
- `POST /api/ask-ai` - Send prompt to AI and get response
  - Body: `{ prompt: string }`
  - Response: `{ response: string }`

- `POST /api/save` - Save prompt and response to database
  - Body: `{ prompt: string, response: string }`
  - Response: `{ message: string, id: string }`

### Conversation Management
- `GET /api/conversations` - Retrieve all saved conversations
  - Response: `[{ _id, prompt, response, timestamp }]`

- `DELETE /api/conversations/:id` - Delete a conversation
  - Response: `{ message: string }`

### Health Check
- `GET /api/health` - Check server status
  - Response: `{ status: "ok", timestamp: Date }`

## Database Schema

```javascript
{
  _id: ObjectId,
  prompt: String,
  response: String,
  timestamp: Date
}
```

## Available AI Models

The app uses `openrouter/auto` by default, which automatically selects the best available free model. You can change it in `backend/server.js`.

Other models available on OpenRouter (check https://openrouter.ai/models for current availability):
- `openrouter/auto` - Auto-selects best available model (recommended)
- `meta-llama/llama-2-7b-chat:free`
- `meta-llama/llama-3-8b-instruct:free`
- Other models (some may have costs)

To use a different model, update this line in `server.js`:
```javascript
model: 'your-desired-model-id'
```

## Deployment

### Backend Deployment (Render)

1. Push the backend code to GitHub
2. Sign up for Render (https://render.com/)
3. Create a new Web Service
4. Connect your GitHub repo
5. Set build command: `npm install`
6. Set start command: `npm start`
7. Add environment variables:
   - `MONGO_URI` - Your MongoDB connection string
   - `OPENROUTER_API_KEY` - Your OpenRouter API key
   - `PORT` - 5000
8. Deploy

### Frontend Deployment (Vercel)

1. Push the frontend code to GitHub
2. Sign up for Vercel (https://vercel.com/)
3. Import your GitHub repo
4. Set build command: `npm run build`
5. Set environment variable:
   - `REACT_APP_API_URL` - Your deployed backend URL (if not using proxy)
6. Deploy

For production, update the proxy in `frontend/package.json` or set the backend URL in API calls.

## Development

### Run Backend in Development
```bash
cd backend
npm start
```

### Run Frontend in Development
```bash
cd frontend
npm start
```

The frontend will automatically proxy requests to `http://localhost:5000` during development.

## Environment Variables

### Backend (.env)
```
MONGO_URI=mongodb://localhost:27017/mern-ai-app
OPENROUTER_API_KEY=sk-or-...
PORT=5000
```

### Frontend (.env.local - if needed)
```
REACT_APP_API_URL=http://localhost:5000
```

## Contributing

Feel free to contribute to this project by submitting issues and pull requests.

## License

MIT License

## Resources

- [OpenRouter Documentation](https://openrouter.ai/docs)
- [React Flow Documentation](https://reactflow.dev/)
- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)