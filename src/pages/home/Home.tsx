import Avatar from "../../components/ui/Avatar";
import ActivityHeader from "./components/ActivityHeader";

const Home = () => {
    return (
        <>
            <div className="flex items-center space-x-3 p-4">
                <Avatar size={12} alt="Guzmán Fernando Nahuel" />
                <div>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                        Bienvenido <span>👋</span>
                    </p>
                    <h1 className="text-lg font-bold">Guzmán Fernando Nahuel</h1>
                </div>
            </div>
            <div>
                <ActivityHeader />
            </div>
        </>

    );
};

export default Home;
