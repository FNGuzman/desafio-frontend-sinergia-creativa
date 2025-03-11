import { ReactNode } from "react";
import MenuBar from "../menu/MenuBar";
import MobileNav from "../menu/MobileNav";

interface DashboardLayoutProps {
    children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    return (
        <div className="w-full h-screen flex flex-col bg-gray-100">
            <MenuBar />
            <main className="flex-grow  p-6 pb-20 md:pb-6 pt-6 md:pt-24">
                {children}
            </main>
            <MobileNav />
        </div>
    );
};

export default DashboardLayout;
