import { useGenerarPDF } from "../../../hooks/useGenerarPDF";


const BotonDescargarPDF = () => {
    const { generarPDF } = useGenerarPDF();

    return (
        <div className="p-3 flex justify-center">
            <button
                onClick={generarPDF}
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition"
            >
                📄 Descargar PDF
            </button>
        </div>
    );
};

export default BotonDescargarPDF;
