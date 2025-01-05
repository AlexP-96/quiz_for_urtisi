import React from 'react';
import { Button } from '../../../6_shared/ui/Button/Button';
import Container from '../../../6_shared/ui/Container/Container';
import cls from './Home.module.scss';

const Home = () => {
    return (
        <Container>
            <h1 className='pb-10 font-extrabold'>Приветствуем вас в сврвисе по созданию уникальных rdbpjd</h1>
            <p>Пройдите регистрацию или зарегестрируйтесь</p>
            <button className=''>Начать</button>
        </Container>
    );

};

export default Home;