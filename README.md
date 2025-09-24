# ChainSim Platform

A comprehensive platform for tokenized securities development, testing, and compliance.

## Features

- **Sandbox Environment**: Test tokenized issuance, trading, and settlement
- **Portfolio Analysis**: Upload holdings and simulate tokenization scenarios
- **RegRadar**: Real-time regulatory intelligence and compliance monitoring
- **Readiness Center**: Guided assessments and implementation checklists
- **Investor Communications**: Generate professional reports and presentations
- **Risk & Compliance**: Stress testing and compliance validation

## Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Radix UI components
- Lucide React icons

### Backend
- Node.js with Express
- TypeScript
- MongoDB with Mongoose
- JWT authentication
- Express rate limiting
- Helmet for security

## Quick Start

### Prerequisites
- Node.js 18+ 
- MongoDB (local or cloud)
- npm or yarn

### Installation

1. **Clone and setup the project:**
   ```bash
   cd chainsim-platform
   ```

2. **Setup Frontend:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. **Setup Backend:**
   ```bash
   cd ../backend
   npm install
   
   # Create .env file from env.example
   cp env.example .env
   
   # Edit .env with your configuration
   # Start MongoDB (if running locally)
   # Run the backend
   npm run dev
   ```

4. **Setup Database:**
   - Install MongoDB locally or use MongoDB Atlas
   - Update MONGODB_URI in backend/.env
   - The application will create the necessary collections on first run

### Environment Variables

Create a `.env` file in the backend directory with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3001

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/chainsim

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d

# API Keys (for external services)
OPENAI_API_KEY=your-openai-api-key-here
SEC_API_KEY=your-sec-api-key-here
FINRA_API_KEY=your-finra-api-key-here
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update user profile
- `PUT /api/auth/preferences` - Update user preferences

### Projects & Simulations
- `GET /api/sandbox/projects` - Get user projects
- `POST /api/sandbox/projects` - Create new project
- `GET /api/sandbox/projects/:id` - Get project details
- `POST /api/sandbox/simulations` - Create simulation
- `POST /api/sandbox/simulations/:id/run` - Run simulation

### Portfolio Analysis
- `POST /api/portfolio/upload` - Upload portfolio data
- `POST /api/portfolio/report` - Generate portfolio report
- `GET /api/portfolio/templates` - Get portfolio templates
- `POST /api/portfolio/analyze-tokenization` - Analyze tokenization readiness

### Regulatory Intelligence
- `GET /api/regradar/updates` - Get regulatory updates
- `GET /api/regradar/sources` - Get regulatory sources
- `GET /api/regradar/compliance-checklist` - Get compliance checklist
- `POST /api/regradar/compliance-report` - Generate compliance report

### Analytics
- `GET /api/analytics/platform` - Get platform analytics
- `GET /api/analytics/projects/:id` - Get project analytics
- `GET /api/analytics/simulations` - Get simulation analytics
- `GET /api/analytics/usage-trends` - Get usage trends

## Database Schema

### Users
- Authentication and profile information
- Subscription and usage tracking
- Preferences and settings

### Projects
- Project metadata and settings
- Statistics and activity tracking
- Collaboration settings

### Simulations
- Simulation configuration and results
- Performance metrics and risk analysis
- Audit trail and compliance data

## Development

### Frontend Development
```bash
cd frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

### Backend Development
```bash
cd backend
npm run dev          # Start development server with hot reload
npm run build        # Build TypeScript to JavaScript
npm start            # Start production server
```

### Run both (root)
From the project root:
```bash
npm run dev   # starts backend, waits for health, then starts frontend
npm run open  # opens http://localhost:5173 in your default browser
```

### Database Management
The application uses MongoDB with Mongoose ODM. Collections are created automatically when first accessed.

## Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Deploy

### Backend (Railway/Heroku)
1. Connect your GitHub repository
2. Set environment variables
3. Set build command: `npm run build`
4. Set start command: `npm start`
5. Deploy

### Railway (Recommended, Full Stack)
See `DEPLOY_RAILWAY.md` for a step-by-step guide to deploy both services on Railway using MongoDB Atlas.

### Database (MongoDB Atlas)
1. Create MongoDB Atlas cluster
2. Get connection string
3. Update MONGODB_URI in environment variables
4. Configure network access and database user

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the ISC License.

## Support

For support and questions, please contact the development team or create an issue in the repository.
