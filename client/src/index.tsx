import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '1_app/App';
import ThemeProvider from '1_app/providers/ThemeProvider/ui/ThemeProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <ThemeProvider>
        <App />
    </ThemeProvider>,
);
