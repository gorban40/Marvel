import AppBanner from "../appBanner/AppBanner";
import ComicsList from "../comicsList/ComicsList";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import { motion } from 'framer-motion/dist/framer-motion';

const ComicsPage = () => {

    return (
        <>
            <motion.div initial={{x: '-100%'}} animate={{x: 0, transition: {duration: 1}}} exit={{x: '200%', transition: {duration: 1}}}>
                <Helmet>
                    <meta
                        name="description"
                        content="Page with list of our comics"
                        />
                    <title>Comics page</title>
                </Helmet>
                <AppBanner />
                <ComicsList />
                <Link to=':comicsId'/>
            </motion.div>
        </>
    )
}

export default ComicsPage;