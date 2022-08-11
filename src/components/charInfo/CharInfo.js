import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../error/Error';
import Spinner from '../spinner/spinner';
import Skeleton from '../skeleton/Skeleton';

import './charInfo.scss';


const CharInfo = (props) => {

    const [char, setChar] = useState(null);


    const { loading, error, getCharacter, clearError } = useMarvelService();

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
    }
    const onCharLoaded = (char) => {
        setChar(char);
    }


    const skeleton = char || loading || error ? null : <Skeleton />
    const errorMessage = error ? <ErrorMessage /> : null;
    const loadingMessage = loading ? <Spinner /> : null;
    const content = !(error || loading || !char) ? <View char={char} /> : null;

    return (
        <div className="char__info">
            {skeleton}
            {errorMessage}
            {loadingMessage}
            {content}
        </div>
    )
}

const View = ({ char }) => {

    const { name, description, thumbnail, homepage, wiki, comics } = char;
    let styleImg = { 'objectFit': 'cover' }
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        styleImg = { 'objectFit': 'unset' }
    }


    return (
        <>
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
        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.string
}

export default CharInfo;