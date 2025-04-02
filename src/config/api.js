const dev = {
    API: "http://localhost:5000"
  };
  
  const prod = {
    API: "https://todo-app-backend-deploy-version.vercel.app"
  };
  
  export const API_URL = process.env.NODE_ENV === 'production' ? prod.API : dev.API;