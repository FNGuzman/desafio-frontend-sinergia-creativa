import { ReactNode } from "react";
import MenuBar from "../menu/MenuBar";
import MobileNav from "../menu/MobileNav";

interface DashboardLayoutProps {
    children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    return (
        <div className="w-full h-screen flex flex-col bg-gray-100 overflow-x-hidden">
            <MenuBar />
            <main className="flex-grow  pb-20 md:pb-6  md:pt-1 overflow-x-hidden">
                {children}
            </main>
            <MobileNav />
        </div>
    );
};

export default DashboardLayout;
