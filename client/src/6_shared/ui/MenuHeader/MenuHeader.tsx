import {
    useEffect,
    useState,
} from 'react';
import {
    Dialog,
    DialogPanel,
} from '@headlessui/react';
import {
    ArrowPathIcon,
    Bars3Icon,
    ChartPieIcon,
    CursorArrowRaysIcon,
    FingerPrintIcon,
    SquaresPlusIcon,
} from '@heroicons/react/24/outline';
import {
    ChevronDownIcon,
    PhoneIcon,
    PlayCircleIcon,
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
    SelectorUserId,
    userId,
} from '../../../4_entities/templateSlice';
import { SelectorUserEmail } from '../../../4_entities/templateSlice/model/selectors';
import { Button } from '../Button/Button';

const products = [
    {
        name: 'Analytics',
        description: 'Get a better understanding of your traffic',
        href: '#',
        icon: ChartPieIcon,
    },
    {
        name: 'Engagement',
        description: 'Speak directly to your customers',
        href: '#',
        icon: CursorArrowRaysIcon,
    },
    {
        name: 'Security',
        description: 'Your customers’ data will be safe and secure',
        href: '#',
        icon: FingerPrintIcon,
    },
    {
        name: 'Integrations',
        description: 'Connect with third-party tools',
        href: '#',
        icon: SquaresPlusIcon,
    },
    {
        name: 'Automations',
        description: 'Build strategic funnels that will convert',
        href: '#',
        icon: ArrowPathIcon,
    },
];
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

interface IUserData {
    user_id: string;
    email: string;
    token: string;
}

export default function MenuHeader() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const dispatch = useDispatch();

    const isUserId = useSelector(SelectorUserId);
    const isUserEmail = useSelector(SelectorUserEmail);

    const navigate = useNavigate();

    const token: IUserData = JSON.parse(localStorage.getItem('data_user')) ?? {
        email: '',
        user_id: '',
        token: '',
    };

    useEffect(() => {
        if (token.token) {
            dispatch(userId(token.user_id));
            dispatch(emailUser(token.email));
        }
    }, []);

    useEffect(() => {
            if (isUserEmail && isUserId) {
                navigate('/main_menu')
            } else {
                navigate('/')
            }
        },
        [
            isUserEmail,
            isUserId,
        ],
    );

    useEffect(() => {
        // /:user_id/quiz_all


    }, []);


    //TODO сделать изменненное меню при авторизации, а старое которое удалить или просто дополнить

    return (
        <header className='bg-white'>
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
                <div className='fixed inset-0 z-10' />
                <DialogPanel className='fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10'>
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
        </header>
    );
}