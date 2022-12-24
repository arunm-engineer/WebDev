import './style.css';
import imagePNG from './react.png';
import imageSVG from './react.svg';

export const App = () => {
    return (
        <>
            <h1>React Webpack Setup</h1>
            <img src={imagePNG} alt="React logo PNG" width="300" height="300" />
            <img src={imageSVG} alt="React logo PNG" width="200" />
        </>
    )
}