
interface AvatarProps {
    size?: 6 | 8 | 10 | 12 | 16 | 20 | 24 | 32;
    src?: string;
    alt?: string;
    className?: string;
}

const Avatar = ({ size = 12, src = 'https://img.freepik.com/psd-gratis/ilustracion-3d-avatar-o-perfil-humano_23-2150671122.jpg?semt=ais_hybrid', alt = "avatar" }: AvatarProps) => {


    return (
        <div className={`inline-block rounded-full overflow-hidden shadow-md w-${size} h-${size}`}>
            <img
                src={src}
                alt={alt}
                className="object-cover h-full w-full"
            />
        </div>
    );
};

export default Avatar;
