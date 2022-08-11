import ErrorMessage from "../error/Error"; 
import { useNavigate } from "react-router-dom";

const Page404 = () => {
    const navigateBack = useNavigate();


    return (
        <div>
            <ErrorMessage />
            <p style={{'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px'}}>Page doesn't exist</p>
            <button style={{'display': 'block', 'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px', 'marginTop': '30px', 'color': '#9f0013', 'margin': '0 auto'}} onClick={() => navigateBack(-1)}>Go back</button>
        </div>
    )
}
export default Page404