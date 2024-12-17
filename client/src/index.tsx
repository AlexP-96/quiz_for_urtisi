import ReactDOM from 'react-dom/client';
import App from "1_app/App";
import {BrowserRouter as Router} from "react-router-dom";
import ThemeProvider from "1_app/providers/ThemeProvider/ui/ThemeProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <Router>
        <ThemeProvider>
            <App/>
        </ThemeProvider>
    </Router>
);
