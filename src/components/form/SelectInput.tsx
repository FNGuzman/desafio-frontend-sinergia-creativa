interface SelectInputProps {
    label: string;
    value: string | number;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    options: { value: string | number; label: string }[];
}

const SelectInput = ({ label, value, onChange, options }: SelectInputProps) => (
    <div className="w-full">
        <label className="text-sm font-semibold text-gray-300 block">{label}</label>
        <div className="relative">
            <select
                className="bg-[linear-gradient(to_right,var(--color-primary),var(--color-secondary))] text-white p-3 pr-10 rounded-xl text-sm outline-none w-full shadow-md border border-white/20 focus:ring-2 focus:ring-white hover:opacity-90 appearance-none"
                value={value}
                onChange={onChange}
            >
                {options.map((option) => (
                    <option className="bg-gray-900 text-white" key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    </div>
);

export default SelectInput;
