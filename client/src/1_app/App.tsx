import React from 'react';
import './styles/index.scss';
import { Provider } from 'react-redux';
import { HomePage } from '../2_pages/homePage';
import MenuHeader from '../6_shared/ui/MenuHeader/MenuHeader';
import WrapperSection from '../6_shared/ui/WrapperSection/WrapperSection';
import { store } from './providers/redux';

const App = () => {

    return (
        <Provider store={store}>
            <WrapperSection>
                <MenuHeader />
            </WrapperSection>
        </Provider>
    );
};

export default App;