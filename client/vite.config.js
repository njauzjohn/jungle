import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss(),
   // server.allowedHosts ( "https://87f6-102-68-77-105.ngrok-free.app")
 
  ],
  
  // server : {
    
  //   allowedHosts :"https://87f6-102-68-77-105.ngrok-free.app"
  // }

})
