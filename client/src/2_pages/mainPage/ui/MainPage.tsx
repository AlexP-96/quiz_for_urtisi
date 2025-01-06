import {
    FC,
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
    ChartPieIcon,
    CursorArrowRaysIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline';
import {
    ChevronDownIcon,
    PhoneIcon,
    PlayCircleIcon,
} from '@heroicons/react/20/solid';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    SelectorUserArrQuizzes,
    SelectorUserEmail,
} from '../../../4_entities/templateSlice/model/selectors';
import { Bento } from '../../../6_shared/ui/Bento';
import {
    PropsQuizView,
    QuizResData,
} from '../../../6_shared/ui/QuizView/ui/QuizView';

const callsToAction = [
    {
        name: 'Watch demo',
        href: '#',
        icon: PlayCircleIcon,
    },
    {
        name: 'Contact sales',
        href: '#',
        icon: PhoneIcon,
    },
];

const MainPage = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const userEmailSelector = useSelector(SelectorUserEmail);
    const quizData = useSelector(SelectorUserArrQuizzes);

    return (
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
                            <PopoverButton className='flex items-center gap-x-1 text-sm/6 font-semibold text-gray-900'>
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
                                    {quizData.map((item: QuizResData) => (
                                        <div
                                            key={item.quiz_id}
                                            className='group relative flex items-center gap-x-6 rounded-lg p-4 text-sm/6 hover:bg-gray-50'
                                        >
                                            {/*<div className='flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white'>*/}
                                            {/*    <item.icon*/}
                                            {/*        aria-hidden='true'*/}
                                            {/*        className='size-6 text-gray-600 group-hover:text-indigo-600'*/}
                                            {/*    />*/}
                                            {/*</div>*/}
                                            <div className='flex-auto'>
                                                <Link
                                                    to={`/quiz/${item.quiz_id}`}
                                                    className='block font-semibold text-gray-900'
                                                >
                                                    {item.quiz_name}
                                                    <span className='absolute inset-0' />
                                                </Link>
                                                {/*<p className='mt-1 text-gray-600'>{item.description}</p>*/}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className='grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50'>
                                    {callsToAction.map((item) => (
                                        <Link
                                            key={item.name}
                                            to={item.href}
                                            className='flex items-center justify-center gap-x-2.5 p-3 text-sm/6 font-semibold text-gray-900 hover:bg-gray-100'
                                        >
                                            <item.icon
                                                aria-hidden='true'
                                                className='size-5 flex-none text-gray-400'
                                            />
                                            {item.name}
                                        </Link>
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
                        <Link
                            to='/logout'
                            className='rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                        >
                            Выйти
                        </Link>
                    </div>
                </nav>
                <Dialog
                    open={mobileMenuOpen}
                    onClose={setMobileMenuOpen}
                    className='lg:hidden'
                >
                    <div className='fixed inset-0 z-10' />
                    <DialogPanel className='fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10'>
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
                                        <DisclosureButton className='group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50'>
                                            Ваши квизы
                                            <ChevronDownIcon
                                                aria-hidden='true'
                                                className='size-5 flex-none group-data-[open]:rotate-180'
                                            />
                                        </DisclosureButton>
                                        <DisclosurePanel className='mt-2 space-y-2'>
                                            {quizData.map((item: QuizResData) => (
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
            <Bento />
        </>
    );
};

export default MainPage;