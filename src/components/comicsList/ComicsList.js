import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../error/Error';

import { motion } from 'framer-motion/dist/framer-motion';

import './comicsList.scss';

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



const ComicsList = () => {

    const [comicsList, setComicsList ] = useState([]);
    const [offset, setOffset] = useState(210);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [comicsEnd, setComicsEnd] = useState(false)

    const {getAllComics, process, setProcess} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, []);

    const onRequest = (offset, initinal) => {
        initinal ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllComics(offset)
            .then(onComicsLoaded)
            .then(() => setProcess('confirmed'));
    }

    const onComicsLoaded = (comicsData) => {
        let end = false
        if (comicsData.length < 8) {
            end = true
        }
        setComicsEnd(end)
        setComicsList(comicsList => [...comicsList, ...comicsData]);
        setOffset(offset => offset + 8);
        setNewItemLoading(false);
    }


    const makeList = (data) => {
        const items = data.map((item, i) => {
            let style = {'objectFit':'cover'}
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ) {
                style = {'objectFit':'unset'}
            }
            return (
                <motion.li initial={{opacity: 0, transition: {duration: 1}}} animate={{opacity: 1, transition: {duration: 1}}} exit={{x: '200%', transition: {duration: 3}}}
                    key={i} className="comics__item">
                    <Link to={`/comics/${item.id}`}>
                        <img src={item.thumbnail} alt={item.name} className="comics__item-img" style={style}/>
                        <div className="comics__item-name">{item.name}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </Link>
                </motion.li>
            )
        })
        return (
            <ul className="comics__grid">
                {items}
            </ul>
        );
    }

    return (
        <div className="comics__list">

        {setContent(process, () => makeList(comicsList), newItemLoading)}

            <button 
                style={{'display': comicsEnd ? 'none' : 'block'}}  
                onClick={() => onRequest(offset)} 
                className="button button__main button__long" 
                disabled={newItemLoading}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;