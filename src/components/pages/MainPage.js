import { useState } from "react";
import { Helmet } from "react-helmet";

import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import decoration from '../../resources/img/vision.png';
import CustomForm from "../form/Form";

import { motion } from 'framer-motion/dist/framer-motion';

const MainPage = () => {

    const [selectedChar, setChar] = useState(null);

    const onCharSelector = (id) => {
        setChar(id);
    }

    return (
            <motion.div initial={{ x: '-200%' }} animate={{ x: 0, transition: { duration: 1 } }} exit={{ x: '200%', transition: { duration: 1 } }}>
                <Helmet>
                <meta
                    name="description"
                    content="Marvel information portal"
                    />
                <title>Marvel information portal</title>
                </Helmet>
                <ErrorBoundary>
                    <RandomChar />
                </ErrorBoundary>
                <div className="char__content">
                    <ErrorBoundary>
                        <CharList onCharSelector={onCharSelector} />
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <div>
                            <CharInfo charId={selectedChar} />
                            <CustomForm />
                        </div>
                    </ErrorBoundary>
                </div>
                <img className="bg-decoration" src={decoration} alt="vision" />
            </motion.div>
    )
}

export default MainPage;