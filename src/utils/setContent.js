import Skeleton from "../components/skeleton/Skeleton";
import ErrorMessage from "../components/error/Error";
import Spinner from "../components/spinner/spinner";


const setContent = (process, Component, data) => {
    switch (process) {
        case 'waiting':
            return <Skeleton />;
            break;
        case 'loading':
            return <Spinner />;
            break;
        case 'confirmed':
            return <Component data={data} />;
            break;
        case 'error':
            return <ErrorMessage />;
            break;
        default:
            throw new Error('Unexpected process state');
    }
}

export default setContent;