import AppBanner from "../appBanner/AppBanner";
import ComicsList from "../comicsList/ComicsList";
import { Link } from "react-router-dom";

const ComicsPage = () => {

    return (
        <>
            <AppBanner />
            <ComicsList />
            <Link to=':comicsId'/>
        </>
    )
}

export default ComicsPage;