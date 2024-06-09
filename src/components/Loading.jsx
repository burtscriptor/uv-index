import loadingIcon from '../assets/loading.png'

const Loading = () => {
    return (
        <div className="loading-container">
          <img src={loadingIcon} alt="loading icon"></img>
        </div>
    );
};

export default Loading;