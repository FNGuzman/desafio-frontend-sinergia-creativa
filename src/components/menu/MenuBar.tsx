
const MenuBar = () => {
    return (
        <div className="w-full h-screen">
            {/* Header */}
            <header className="bg-teal-400">
                <nav className="flex justify-between w-full bg-purple-500 text-white p-4">
                    {/* Logo / Title */}
                    <a href="#">
                        <span className="font-semibold text-xl tracking-tight">Title</span>
                    </a>

                    {/* Desktop Navigation */}
                    <div className="md:flex hidden items-center space-x-4">
                        <a className="text-white" href="#">Link 1</a>
                        <a className="text-white" href="#">Link 2</a>
                        <a className="text-white" href="#">Link 3</a>
                        <a className="text-white" href="#">Link 4</a>
                    </div>

                    {/* Login & Sign Up */}
                    <div className="flex text-sm">
                        <a className="p-2 ml-2 bg-white text-teal-500 font-semibold leading-none border border-gray-100 rounded hover:border-transparent hover:bg-gray-100" href="#">
                            Login
                        </a>
                        <a className="p-2 ml-2 bg-teal-500 text-gray-100 font-semibold leading-none border border-teal-600 rounded hover:border-transparent hover:bg-teal-600" href="#">
                            Sign up
                        </a>
                    </div>
                </nav>
            </header>

            {/* Main Content */}
            <main className="flex justify-center items-center h-full">
                <h1 className="text-3xl text-center">Welcome</h1>
            </main>

            {/* Mobile Bottom Navigation */}
            <div className="bottomNav fixed bottom-0 w-full md:hidden">
                <nav className="w-full bg-gray-700 text-xs border-t border-blue-500">
                    <ul className="flex justify-around items-center text-white text-center opacity-75 text-lg font-bold">
                        {["Link 1", "Link 2", "Link 3", "Link 4"].map((link, index) => (
                            <li key={index} className="p-4 hover:bg-gray-500">
                                <a href="#">
                                    <span>{link}</span>
                                    <svg className="h-6 w-6 fill-current mx-auto" viewBox="0 0 20 20">
                                        <path
                                            d="M14 8a4 4 0 1 0-8 0v7h8V8zM8.027 2.332A6.003 6.003 0 0 0 4 8v6l-3 2v1h18v-1l-3-2V8a6.003 6.003 0 0 0-4.027-5.668 2 2 0 1 0-3.945 0zM12 18a2 2 0 1 1-4 0h4z"
                                            fillRule="evenodd"
                                        />
                                    </svg>
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default MenuBar;
