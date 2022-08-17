import { useEffect, useState, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion/dist/framer-motion';

import useMarvelService from '../../services/MarvelService';
import Skeleton from '../skeleton/Skeleton';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../error/Error';

import './charList.scss';

const setContent = (process, Component, newItemLoading) => {
    switch (process) {
        case 'waiting':
            return <Spinner />;
            break;
        case 'loading':
            return newItemLoading ? <Component/> : <Spinner />;
            break;
        case 'confirmed':
            return <Component />;
            break;
        case 'error':
            return <ErrorMessage />;
            break;
        default:
            throw new Error('Unexpected process state');
    }
}

const CharList = (props) => {
    const [charList, setCharList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);

    const { getAllCharacters, process, setProcess } = useMarvelService();

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
            .then(() => setProcess('confirmed'))
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
                <motion.li initial={{opacity: 0, transition: {duration: 1}}} animate={{opacity: 1, transition: {duration: 1}}} exit={{x: '200%', transition: {duration: 3}}}
                    className="char__item"
                    key={item.id}
                    ref={(el) => refArr.current[i] = el}
                    onClick={() => {
                        props.onCharSelector(item.id);
                        onFocusrChar(i)
                    }}>
                    <img src={item.thumbnail} alt={item.name} style={style} />
                    <div className="char__name">{item.name}</div>
                </motion.li>
            )
        });
        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

    const elements = useMemo(() => {
        return setContent(process, () => makeList(charList), newItemLoading)
    }, [process])

    return (
        <div className="char__list">

            {elements}

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