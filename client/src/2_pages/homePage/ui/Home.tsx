import React, { useEffect } from 'react';
import Container from '6_shared/ui/Container/Container';
import { useNavigate } from 'react-router-dom';
import { getLSUser } from '../../../6_shared/lib/helpers/localStorage/localStorage';

const Home = () => {
    const navigate = useNavigate();
    
    useEffect(() => {
        if (getLSUser().email && getLSUser().user_id) {
            navigate('/main_menu');
        }
    }, []);
    return (
        <Container>
            <h1 className='pb-10 font-extrabold'>
                Приветствуем вас в сервисе по созданию уникальных Квизов, где вы можете создать любую форму с вопросами
                и ответами, и получить обратную связь любым удобным для вас способ, только на email или telegram
            </h1>
            <p className='pb-6'>Пройдите регистрацию или зарегестрируйтесь</p>
            <button
                className='flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
            >
                Начать
            </button>
        </Container>
    );

};

export default Home;