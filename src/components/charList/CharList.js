import { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';

import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../error/Error';
import Spinner from '../spinner/spinner';
import './charList.scss';

const CharList = (props) => {

    const [charList, setCharList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [charEnded, setCharEnded] = useState(false);



    const {loading, error, getAllCharacters} = useMarvelService();

    const refArr = useRef([]);

    const onFocusrChar = (id) => {
        refArr.current.forEach(item => item.classList.remove("char__item_selected"));
        refArr.current[id].classList.add("char__item_selected");
        refArr.current[id].focus();
    }

    useEffect(() => {
        onRequest(offset, true);
    }, [])

    const onRequest = (offset, initinal) => {
        initinal ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllCharacters(offset)
            .then(onCharListLoaded)
    }
    const onCharListLoaded = (newChars) => {

        let ended = false;
        if (newChars.length < 9) {
            ended = true;
        }

        setCharList(() => [...charList, ...newChars]);
        setNewItemLoading(newItemLoading => false);
        setOffset(offset => offset + 9);
        setCharEnded(charEnded => ended);
    }
    function makeList(data) {
        const items = data.map((item, i) => {
            let style = { 'objectFit': 'cover' }
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                style = { 'objectFit': 'unset' }
            }
            return (
                <li
                    className="char__item"
                    key={item.id}
                    ref={(el) => refArr.current[i] = el}
                    onClick={() => {
                        props.onCharSelector(item.id);
                        onFocusrChar(i)
                    }}>
                    <img src={item.thumbnail} alt={item.name} style={style} />
                    <div className="char__name">{item.name}</div>
                </li>
            )
        });
        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

    const items = makeList(charList);

    const errorMessage = error ? <ErrorMessage /> : null;
    const loadingMessage = loading && !newItemLoading ? <Spinner /> : null;

    return (
        <div className="char__list">
            {errorMessage}
            {loadingMessage}
            {items}
            <button onClick={() => onRequest(offset)}
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{ 'display': charEnded ? 'none' : 'block' }}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

CharList.propTypes = {
    onCharSelector: PropTypes.func.isRequired
}

export default CharList;