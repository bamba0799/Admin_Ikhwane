import Lottie from 'lottie-react';
import animationData from '../assets/animations/rotate1.json';

const Loader = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
  
    };
    return (
        <div>
            <div className=''>
                <Lottie
                className='w-20 h-20'
                    loop={defaultOptions.loop}
                    autoplay={defaultOptions.autoplay}
                    animationData={defaultOptions.animationData}
                    // rendererSettings={defaultOptions.rendererSettings}
                />
            </div>
        </div>
    );
}

export default Loader;
