import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import AppBanner from '../appBanner/AppBanner';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../error/Error';
import Spinner from '../spinner/spinner';

import { motion } from 'framer-motion/dist/framer-motion';

import './SingleCharPage.scss';

const SingleCharPage = () => {
    const {charName} = useParams();
    const [char, setChar] = useState(null);
    const { loading, error, getCharacterByName, clearError } = useMarvelService();

    useEffect(() => {
        updateComic();
    }, [charName])

    const updateComic = () => {

        clearError();

        getCharacterByName(charName)
            .then(onComicLoaded)
    }
    const onComicLoaded = (char) => {
        setChar(char);
    }

    const errorMessage = error ? <ErrorMessage /> : null;
    const loadingMessage = loading ? <Spinner /> : null;
    const content = !(error || loading || !char) ? <View char={char[0]} /> : null;

    return (
        <motion.div initial={{x: '-200%'}} animate={{x: 0, transition: {duration: 1}}} exit={{x: '200%', transition: {duration: 1}}}>
            <AppBanner/>
            {errorMessage}
            {loadingMessage}
            {content}
        </motion.div>
    )
}

const View = ({char}) => {
    
    const {name, description, thumbnail} = char;

    return (
        <div className="single-comic">
        <img src={thumbnail} alt={name} className="single-comic__img"/>
        <div className="single-comic__info">
            <h2 className="single-comic__name">{name}</h2>
            <p className="single-comic__descr">{description}</p>
        </div>
        <Link to='/' className="single-comic__back">Back to main</Link>
    </div>
    )
}
export default SingleCharPage;