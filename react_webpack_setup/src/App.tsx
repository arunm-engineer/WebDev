import './style.css';
import imagePNG from './react.png';
import imageSVG from './react.svg';
import { Counter } from './Counter';

export const App = () => {
    return (
        <>
            <h1>React Webpack Setup - {process.env.name}</h1>
            <img src={imagePNG} alt="React logo PNG" width="300" height="300" />
            <img src={imageSVG} alt="React logo PNG" width="200" />
            <Counter />
        </>
    )
}