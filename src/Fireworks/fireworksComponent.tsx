import {useEffect, useState, FC} from "react";
import {FireworksRenderer} from "./fireworksRenderer/fireworksRenderer.ts";
import './fireworksComponent.css'

interface FireworksComponentProps {
    children: JSX.Element;
}

const FireworksComponent:FC<FireworksComponentProps> = ({children}) => {
    const [fireworksInitialized, setFireworksInitialized] = useState(false);

    useEffect(() => {
        if(!fireworksInitialized) {
            setFireworksInitialized(true);

            const canvas = document.getElementById('fireworks') as HTMLCanvasElement;
            const fireworksRenderer = new FireworksRenderer(canvas!);

            fireworksRenderer.animate();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    return (
        <>
            <canvas id={'fireworks'}></canvas>
            {children}
        </>
    );
};

export default FireworksComponent;