interface AvatarProps {
    size: 6 | 8 | 10 | 12 | 16 | 20; // Tamaño en Tailwind (ej: 8, 10, 12)
    alt: string;
}

const Avatar = ({ size, alt }: AvatarProps) => {
    const sizeClasses: Record<number, string> = {
        6: "w-6 h-6",
        8: "w-8 h-8",
        10: "w-10 h-10",
        12: "w-12 h-12",
        16: "w-16 h-16",
        20: "w-20 h-20",
    };

    return (
        <div className={`inline-block rounded-full overflow-hidden shadow-md ${sizeClasses[size] || "w-12 h-12"}`}>
            <img
                src="https://img.freepik.com/psd-gratis/ilustracion-3d-avatar-o-perfil-humano_23-2150671122.jpg?semt=ais_hybrid"
                alt={alt}
                className="w-full h-full object-cover"
            />
        </div>
    );
};

export default Avatar;
