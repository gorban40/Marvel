import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../error/Error';

import './comicsList.scss';

const ComicsList = () => {

    const [comicsList, setComicsList ] = useState([]);
    const [offset, setOffset] = useState(99);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [comicsEnd, setComicsEnd] = useState(false)

    const {loading, error, getAllComics} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, []);

    const onRequest = (offset, initinal) => {
        initinal ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllComics(offset)
            .then(onComicsLoaded);
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
                <li key={i} className="comics__item">
                    <Link to={`/comics/${item.id}`}>
                        <img src={item.thumbnail} alt={item.name} className="comics__item-img" style={style}/>
                        <div className="comics__item-name">{item.name}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </Link>
                </li>
            )
        })
        return (
            <ul className="comics__grid">
                {items}
            </ul>
        );
    }

    const items = makeList(comicsList);

    const spinner = loading ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;

    return (
        <div className="comics__list">
                {items}
                {errorMessage}
                {spinner}
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