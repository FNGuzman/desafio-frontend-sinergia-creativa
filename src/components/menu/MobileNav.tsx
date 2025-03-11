import { NAV_LINKS } from "../../constants/routes";
import { useLocation, Link } from "react-router-dom";
import { HomeIcon } from '@heroicons/react/24/outline';

const MobileNav = () => {
    const location = useLocation();

    return (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-[90%] md:hidden bg-[linear-gradient(to_right,var(--color-primary),var(--color-secondary))] shadow-lg rounded-3xl p-2">
            <nav className="flex justify-around items-center">
                {NAV_LINKS.map(({ name, path, icon: Icon = HomeIcon }, index) => {
                    const isActive = location.pathname === path;

                    return (
                        <Link
                            key={index}
                            to={path}
                            className={`flex flex-col items-center transition-all duration-300 ${isActive ? "text-[var(--color-light)]" : "text-[var(--color-muted)] hover:text-[var(--color-light)]"}`}
                        >
                            <Icon className="w-6 h-6 mb-1 transition-all duration-300" />
                            <span className="text-xs transition-all duration-300">{name}</span>
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
};

export default MobileNav;