import {type FC, type ReactNode, useEffect, useState} from "react";
import {FireworksRenderer} from "./fireworksRenderer/fireworksRenderer.ts";
import './fireworksAndConfettiComponent.css'

interface IFireworksAndConfettiComponentProps {
    children: ReactNode;
}

const FireworksAndConfettiComponent: FC<IFireworksAndConfettiComponentProps> = ({children}: IFireworksAndConfettiComponentProps) => {
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

export default FireworksAndConfettiComponent;