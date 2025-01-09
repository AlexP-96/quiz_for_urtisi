import React, { Suspense } from 'react';
import {
    Route,
    Routes,
} from 'react-router-dom';
import { routeConfig } from '6_shared/config/routeConfig/routeConfig';
import {QuizPage} from "2_pages/quizPage";

const AppRouter = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                {Object.values(routeConfig)
                    .map(({
                        element,
                        path,
                    }) => (
                        <Route
                            key={path}
                            path={path}
                            element={element}
                        />
                    ))}
            </Routes>
        </Suspense>
    );
};

export default AppRouter;