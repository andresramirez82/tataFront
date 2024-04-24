import React, { useState, useEffect } from 'react';

interface ImageProps {
    imageData: any;
}

const ImageComponent: React.FC<ImageProps> = ({ imageData }) => {
    const [image, setImage] = useState<string>('');

    useEffect(() => {
        const arrayBuffer = new Uint8Array(imageData.data);
        const blob = new Blob([arrayBuffer], { type: "image/png" });

        const reader = new FileReader();
        reader.readAsDataURL(blob);
        
        reader.onloadend = () => {
            const base64String = reader.result as string;
            console.log(base64String)
            setImage(base64String);
        };

        reader.onerror = (error) => {
            console.error('Error al cargar la imagen:', error);
        };
    }, [imageData]);

    return (
        <div>
            <h2>Imagen</h2>
            {image && <img src={image} alt={'Logo'} />}
        </div>
    );
};

export default ImageComponent;