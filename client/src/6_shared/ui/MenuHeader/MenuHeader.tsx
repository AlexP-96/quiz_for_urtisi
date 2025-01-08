import {
    useEffect,
    useState,
} from 'react';
import {
    Dialog,
    DialogPanel,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Popover,
    PopoverButton,
    PopoverGroup,
    PopoverPanel,
} from '@headlessui/react';
import {
    Bars3Icon,
    XMarkIcon,
} from '@heroicons/react/24/outline';
import {
    ChevronDownIcon,
} from '@heroicons/react/20/solid';
import {
    useDispatch,
    useSelector,
} from 'react-redux';
import {
    Link,
    useNavigate,
} from 'react-router-dom';
import {
    emailUser,
    openModal, userId,
} from '4_entities/templateSlice';
import {
    SelectorUserArrQuizzes,
    SelectorUserEmail,
} from '4_entities/templateSlice/model/selectors';
import {Button} from '../Button/Button';
import {QuizResData} from '../QuizzesView/ui/QuizView';
import {Modal} from "6_shared/ui/Modal";
import {AppDispatch} from "1_app/providers/redux/store/store";

interface IUserData {
    user_id: string;
    email: string;
    token: string;
}

export default function MenuHeader() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const dispatch: AppDispatch = useDispatch();
    const userEmailSelector = useSelector(SelectorUserEmail);
    const quizDataSelector = useSelector(SelectorUserArrQuizzes);
    const isUserEmailSelector = useSelector(SelectorUserEmail);
    console.log('quizDataSelector',quizDataSelector)
    const navigate = useNavigate();
    const dataUserStorage: IUserData = JSON.parse(localStorage.getItem('data_user')) ?? {email: '', token: '', user_id: ''}

    useEffect(() => {
        if (dataUserStorage.email) dispatch(emailUser(dataUserStorage.email))
        if (dataUserStorage.user_id) dispatch(userId(dataUserStorage.user_id))
        if (isUserEmailSelector) navigate('/main_menu');

    }, []);
    const handlerLogout = () => {
        setIsVisibleModal(true)
    }
    //todo сделать модальное окно глобальным и единым, попробовать положить в главный компонент и сделать е хуком
    return (
        <>
            {
                isVisibleModal &&
                <Modal visible={isVisibleModal} handlerClose={() => setIsVisibleModal(false)}>
                    Вы действительно хотите выйти?
                    <Button
                        className='rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
                        Да
                    </Button>
                </Modal>
            }
            <header className='bg-white'>
                {!isUserEmailSelector
                    ?
                    <>
                        <nav
                            aria-label='Global'
                            className='mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8'
                        >
                            <div className='flex lg:flex-1'>
                                AlexQuiz
                            </div>
                            <div className='flex lg:hidden'>
                                <Button
                                    type='button'
                                    eventClick={() => setMobileMenuOpen(true)}
                                    className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700'
                                >
                                    <span className='sr-only'>Open main menu</span>
                                    <Bars3Icon
                                        aria-hidden='true'
                                        className='size-6'
                                    />
                                </Button>
                            </div>
                            <div className='hidden lg:flex lg:flex-1 lg:justify-end'>
                                <Link
                                    to='/login'
                                    className='text-sm/6 font-semibold text-gray-900 pr-4   '
                                >
                                    Войти
                                </Link>
                            </div>
                            <div className='hidden lg:flex lg:flex-2 lg:justify-end'>
                                <Link
                                    to='/register'
                                    className='rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                                >
                                    Регистрация
                                </Link>
                            </div>
                        </nav>
                        <Dialog
                            open={mobileMenuOpen}
                            onClose={setMobileMenuOpen}
                            className='lg:hidden'
                        >
                            <div className='fixed inset-0 z-10'/>
                            <DialogPanel
                                className='fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10'>
                                <div className='mt-6 flow-root'>
                                    <div className='-my-6 divide-y divide-gray-500/10'>
                                        <div className='py-6'>
                                            <Link
                                                to='/login'
                                                className='-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50'
                                            >
                                                Войти
                                            </Link>
                                        </div>
                                        <div className='lg:flex lg:flex-2 lg:justify-end'>
                                            <Link
                                                to='/register'
                                                className='rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                                            >
                                                Регистрация
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </DialogPanel>
                        </Dialog>
                    </>
                    :
                    <>
                        <div className='bg-white'>
                            <nav
                                aria-label='Global'
                                className='mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8'
                            >
                                <div className='flex lg:hidden'>
                                    <button
                                        type='button'
                                        onClick={() => setMobileMenuOpen(true)}
                                        className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700'
                                    >
                                        <span className='sr-only'>Open main menu</span>
                                        <Bars3Icon
                                            aria-hidden='true'
                                            className='size-6'
                                        />
                                    </button>
                                </div>
                                <PopoverGroup className='hidden lg:flex lg:gap-x-12'>
                                    <Popover className='relative'>
                                        <PopoverButton
                                            className='flex items-center gap-x-1 text-sm/6 font-semibold text-gray-900'>
                                            Ваши квизы
                                            <ChevronDownIcon
                                                aria-hidden='true'
                                                className='size-5 flex-none text-gray-400'
                                            />
                                        </PopoverButton>

                                        <PopoverPanel
                                            transition
                                            className='absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in'
                                        >
                                            <div className='p-4'>
                                                {quizDataSelector.map((item: QuizResData) => (
                                                    <div
                                                        key={item.quiz_id}
                                                        className='group relative flex items-center gap-x-6 rounded-lg p-4 text-sm/6 hover:bg-gray-50'
                                                    >
                                                        <div className='flex-auto'>
                                                            <Link
                                                                to={`/quiz/${item.quiz_id}`}
                                                                className='block font-semibold text-gray-900'
                                                            >
                                                                {item.quiz_name}
                                                                <span className='absolute inset-0'/>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </PopoverPanel>
                                    </Popover>

                                    <Link
                                        to='/questions'
                                        className='text-sm/6 font-semibold text-gray-900'
                                    >
                                        Вопросы
                                    </Link>
                                    <Link
                                        to='/forms'
                                        className='text-sm/6 font-semibold text-gray-900'
                                    >
                                        Форма обратной связи
                                    </Link>
                                    <Link
                                        to='/help'
                                        className='text-sm/6 font-semibold text-gray-900'
                                    >
                                        Инструкция
                                    </Link>
                                </PopoverGroup>
                                <p className='text-2l'>Приветствую вас {userEmailSelector}</p>
                                <div className='hidden lg:flex lg:flex-2 lg:justify-end'>
                                    <Button
                                        eventClick={handlerLogout}
                                        className='rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                                    >
                                        Выйти
                                    </Button>
                                </div>
                            </nav>
                            <Dialog
                                open={mobileMenuOpen}
                                onClose={setMobileMenuOpen}
                                className='lg:hidden'
                            >
                                <div className='fixed inset-0 z-10'/>
                                <DialogPanel
                                    className='fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10'>
                                    <div className='flex items-center justify-between'>
                                        <button
                                            type='button'
                                            onClick={() => setMobileMenuOpen(false)}
                                            className='-m-2.5 rounded-md p-2.5 text-gray-700'
                                        >
                                            <span className='sr-only'>Close menu</span>
                                            <XMarkIcon
                                                aria-hidden='true'
                                                className='size-6'
                                            />
                                        </button>
                                    </div>
                                    <div className='mt-6 flow-root'>
                                        <div className='-my-6 divide-y divide-gray-500/10'>
                                            <div className='space-y-2 py-6'>
                                                <Disclosure
                                                    as='div'
                                                    className='-mx-3'
                                                >
                                                    <DisclosureButton
                                                        className='group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50'>
                                                        Ваши квизы
                                                        <ChevronDownIcon
                                                            aria-hidden='true'
                                                            className='size-5 flex-none group-data-[open]:rotate-180'
                                                        />
                                                    </DisclosureButton>
                                                    <DisclosurePanel className='mt-2 space-y-2'>
                                                        {quizDataSelector.map((item: QuizResData) => (
                                                            <Link
                                                                key={item.quiz_id}
                                                                to={`/quiz/${item.quiz_id}`}
                                                                className='block rounded-lg py-2 pl-6 pr-3 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50'
                                                            >
                                                                {item.quiz_name}
                                                            </Link>
                                                        ))}
                                                    </DisclosurePanel>
                                                </Disclosure>
                                                <Link
                                                    to='/questions'
                                                    className='-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50'
                                                >
                                                    Вопросы
                                                </Link>
                                                <Link
                                                    to='/forms'
                                                    className='-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50'
                                                >
                                                    Форма обратной связи
                                                </Link>
                                                <Link
                                                    to='/help'
                                                    className='-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50'
                                                >
                                                    Инструкция
                                                </Link>
                                            </div>
                                            <div className='py-6'>
                                                <p>Приветствую {userEmailSelector}</p>
                                            </div>
                                        </div>
                                    </div>
                                </DialogPanel>
                            </Dialog>
                        </div>
                    </>
                }
            </header>
        </>
    );
}