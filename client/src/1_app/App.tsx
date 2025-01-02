import React from 'react';
import './styles/index.scss';
import {
    Provider,
} from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import MenuHeader from '../6_shared/ui/MenuHeader/MenuHeader';
import WrapperSection from '../6_shared/ui/WrapperSection/WrapperSection';
import { store } from './providers/redux';
import AppRouter from './providers/router/ui/AppRouter';

const App = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <WrapperSection>
                    <MenuHeader />
                    <AppRouter />
                </WrapperSection>
            </BrowserRouter>
        </Provider>
    );
};

export default App;