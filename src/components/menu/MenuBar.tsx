import { NAV_LINKS } from "../../constants/routes";
import { useLocation, Link } from "react-router-dom";
import { HomeIcon } from '@heroicons/react/24/outline';

const MenuBar = () => {
    const location = useLocation();

    return (
        <header className="bg-[linear-gradient(to_right,var(--color-primary),var(--color-secondary))] shadow-md">
            <nav className="hidden md:flex justify-center w-full p-4">
                <div className="flex space-x-4 px-6 py-2">
                    {NAV_LINKS.map(({ name, path, icon: Icon = HomeIcon }, index) => {
                        const isActive = location.pathname === path;
                        return (
                            <Link
                                key={index}
                                to={path}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition duration-300 ease-in-out ${isActive ? 'bg-[var(--color-light)] text-[var(--color-primary)] shadow-lg' : 'text-[var(--color-light)] hover:bg-[var(--color-muted)]/40'}`}
                            >
                                <Icon className="h-5 w-5" />
                                <span>{name}</span>
                            </Link>
                        );
                    })}
                </div>
            </nav>
        </header>
    );
};

export default MenuBar;