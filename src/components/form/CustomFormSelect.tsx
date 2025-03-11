import { useState } from "react";

interface Option {
    id: string;
    label: string;
}

interface SelectProps {
    options: Option[];
    onSelect: (selectedId: string | null) => void;
    placeholder?: string;
}

const CustomFormSelect = ({ options, onSelect, placeholder = "Seleccione una Opción" }: SelectProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    const handleSelect = (id: string | null) => {
        setSelectedOption(id);
        onSelect(id);
        setIsOpen(false);
    };

    return (
        <div className="relative w-full max-w-[180px] sm:max-w-[220px] lg:max-w-[250px]">
            {/* Botón principal */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-full shadow-sm hover:bg-gray-200 transition"
            >
                <span>
                    {selectedOption ? options.find((opt) => opt.id === selectedOption)?.label : placeholder}
                </span>
                <svg
                    className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {/* Menú desplegable */}
            {isOpen && (
                <div className="absolute top-full left-0 mt-2 w-full bg-white shadow-lg rounded-md z-10">
                    <ul className="py-2">
                        {options.map((option) => (
                            <li key={option.id}>
                                <button
                                    onClick={() => handleSelect(option.id)}
                                    className="w-full text-left px-4 py-2 hover:bg-blue-500 hover:text-white text-gray-700"
                                >
                                    {option.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default CustomFormSelect;
