import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion/dist/framer-motion';

import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';


import './charInfo.scss';


const CharInfo = (props) => {


    const [char, setChar] = useState(null);


    const { getCharacter, clearError, process, setProcess } = useMarvelService();

    useEffect(() => {
        upDateChar();
    }, [props.charId])

    const upDateChar = () => {
        if (!props.charId) {
            return;
        }
        clearError();


        getCharacter(props.charId)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'))
    }
    const onCharLoaded = (char) => {
        setChar(char);
    }


    // const setContent = (process, char) => {
    //     switch (process) {
    //         case 'waiting':
    //             return <Skeleton />;
    //             break;
    //         case 'loading':
    //             return <Spinner />;
    //             break;
    //         case 'confirmed':
    //             return <View char={char} />;
    //             break;
    //         case 'error':
    //             return <ErrorMessage />;
    //             break;
    //         default: 
    //             throw new Error('Unexpected process state');
    //     }
    // }


    // const skeleton = char || loading || error ? null : <Skeleton />
    // const errorMessage = error ? <ErrorMessage /> : null;
    // const loadingMessage = loading ? <Spinner /> : null;
    // const content = !(error || loading || !char) ? <View char={char} /> : null;

    return (
        <div className="char__info">
            {/* {skeleton}
            {errorMessage}
            {loadingMessage}
            {content} */}
            {setContent(process,View, char)}
        </div>
    )
}

const View = ({ data }) => {

    const { name, description, thumbnail, homepage, wiki, comics } = data;
    let styleImg = { 'objectFit': 'cover' }
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        styleImg = { 'objectFit': 'unset' }
    }


    return (
        <motion.div initial={{opacity: 0, transition: {duration: 1}}} animate={{opacity: 1, transition: {duration: 1}}} exit={{opacity: 0, transition: {duration: 3}}}>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={styleImg} />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0 ? null : "Don't have any comics"}
                {
                    comics.map((item, i) => {

                        if (i > 9) return;
                        return (
                            <li key={i} className="char__comics-item">
                                {item.name}
                            </li>
                        )
                    })
                }
            </ul>
        </motion.div>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.string
}

export default CharInfo;