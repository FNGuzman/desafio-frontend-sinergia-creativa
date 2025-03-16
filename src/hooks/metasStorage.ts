export const obtenerMetas = () => {
    const storedMetas = localStorage.getItem("metas");
    return storedMetas ? JSON.parse(storedMetas) : null;
};

export const guardarMetas = (metas: any) => {
    localStorage.setItem("metas", JSON.stringify(metas));
};