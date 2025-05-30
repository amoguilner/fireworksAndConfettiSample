import {type FC, type ReactNode, useEffect, useState} from "react";
import './fireworksAndConfettiComponent.css'
import {FireworksAndConfettiRenderer} from "./fireworksAndConfettiRenderer.ts";

interface IFireworksAndConfettiComponentProps {
    children: ReactNode;
}

const FireworksAndConfettiComponent: FC<IFireworksAndConfettiComponentProps> = ({children}: IFireworksAndConfettiComponentProps) => {
    const [fireworksInitialized, setFireworksInitialized] = useState(false);
    const initializeCanvasContext = (canvas: HTMLCanvasElement) => {
        const context = canvas.getContext('2d')!;
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
                
        return context;
    }

    useEffect(() => {
        if(!fireworksInitialized) {
            setFireworksInitialized(true);

            const canvas = document.getElementById('fireworks') as HTMLCanvasElement;
            const context = initializeCanvasContext(canvas);
            const renderer = new FireworksAndConfettiRenderer(canvas!, context);

            renderer.animate();
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