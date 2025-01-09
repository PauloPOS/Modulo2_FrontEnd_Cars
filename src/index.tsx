import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';

import 'nprogress/nprogress.css';
import App from 'src/App';
import { SidebarProvider } from 'src/contexts/SidebarContext';
import * as serviceWorker from 'src/serviceWorker';

ReactDOM.render(
  <HelmetProvider>
    <SidebarProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SidebarProvider>
  </HelmetProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();


// import React from 'react';
// import ReactDOM from 'react-dom';
// import { BrowserRouter, useRoutes } from 'react-router-dom';
// import { SidebarProvider } from './contexts/SidebarContext';
// import routes from './router';


// function AppRoutes() {
//   return useRoutes(routes);
// }

// ReactDOM.render(
//   <React.StrictMode>
//     <SidebarProvider>
//       <BrowserRouter>
//         <AppRoutes />
//       </BrowserRouter>
//     </SidebarProvider>
//   </React.StrictMode>,
//   document.getElementById('root')
// );