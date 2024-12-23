import {
    Button,
    MegaMenu,
    Navbar,
} from 'flowbite-react';
import React from 'react';
import { Link } from 'react-router-dom';

const MenuHeader = () => {
    return (
        <MegaMenu>
            <div className='mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4 md:space-x-8'>
                <Navbar.Brand href='/'>
                    <img
                        alt=''
                        src='/favicon.svg'
                        className='mr-3 h-6 sm:h-9'
                    />
                    <span className='self-center whitespace-nowrap text-xl font-semibold dark:text-white'>Flowbite</span>
                </Navbar.Brand>
                <div className='order-2 hidden items-center md:flex'>
                    <Link
                        to='login'
                        className='mr-1 rounded-lg px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-800 md:mr-2 md:px-5 md:py-2.5'
                    >
                        Войти
                    </Link>
                    <Link
                        to='/register'
                    >
                        <Button>Регистрация</Button>
                    </Link>
                </div>
                <Navbar.Toggle />
                <Navbar.Collapse>
                    <Navbar.Link href='#'>Home</Navbar.Link>
                    <MegaMenu.Dropdown toggle={<>Вспылвающее меню</>}>
                        <ul className='grid grid-cols-3'>
                            <div className='space-y-4 p-4'>
                                <li>
                                    <Link
                                        to='/company'
                                        className='hover:text-primary-600 dark:hover:text-primary-500'
                                    >
                                        О компании
                                    </Link>
                                </li>
                            </div>
                            <div className='space-y-4 p-4'>
                                <li>
                                    <Link
                                        to='/contacts'
                                        className='hover:text-primary-600 dark:hover:text-primary-500'
                                    >
                                        Контакты
                                    </Link>
                                </li>
                            </div>
                        </ul>
                    </MegaMenu.Dropdown>
                    <Link to='/team'>
                        Team
                    </Link>
                </Navbar.Collapse>
            </div>
        </MegaMenu>
    );
};

export default MenuHeader;