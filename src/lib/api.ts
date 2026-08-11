import axios from 'axios';

// Issued in the admin panel under Security & Tokens, then supplied here at build
// time. Vite inlines it into the public bundle, so it is a revocable identifier
// for this site — not a confidential credential. See .env.example.
const portfolioToken = import.meta.env.VITE_PORTFOLIO_API_TOKEN;

if (!portfolioToken) {
  console.warn(
    'VITE_PORTFOLIO_API_TOKEN is not set: /api/client/* calls will be rejected with 401.',
  );
}

export const api = axios.create({
  baseURL: import.meta.env.VITE_ADMIN_API_BASE_URL || 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    // Every /api/client/* route is token-gated on the admin side, the AI chat
    // included. Sending it from the shared instance keeps new client calls
    // authenticated by default instead of by remembering to add a header.
    ...(portfolioToken ? { 'X-Portfolio-Key': portfolioToken } : {}),
  },
});
