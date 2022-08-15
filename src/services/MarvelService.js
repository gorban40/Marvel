import {useHttp} from '../hooks/http.hook'

const useMarvelService = () => {

    const {loading, request, error, clearError, process, setProcess} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=26ac5d1b60444dc90d4beccab723d36c';

    const _baseOffset = 210;


    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }
    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0])
    }
    const getAllComics = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComics)
    }
    const getComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`)
        return _transformComics(res.data.results[0])
    }
    const getCharacterByName = async (name) => {
        const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
        return res.data.results.map(_transformCharacterByName);
    }


    const _transformComics = (comics) => {
        return {
            id: comics.id,
            name: comics.title,
            price: comics.prices.price ? `${comics.prices.price}` : 'not avaible',
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            description: comics.description || 'There is no description',
            pageCount: comics.pageCount ? `${comics.pageCount} p.` : 'No information about the number of pages',
            language: comics.textObjects.language || 'en-us'
        }
    }
    const _transformCharacter = (char) => {
        let descr = '';
        if (char.description === '') {
            descr = 'Данные про этого персонажа ещё не проработаны';
        } else if(char.description.length > 230) {
            descr = char.description.slice(0, 228) + '...';
        } else {
            descr = char.description;
        }
        return {
            id: char.id,
            name: char.name,
            description: descr,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items,
        }
    }
    const _transformCharacterByName = (char) => {
        let descr = '';
        if (char.description === '') {
            descr = 'Данные про этого персонажа ещё не проработаны';
        } else {
            descr = char.description
        }
        return {
            id: char.id,
            name: char.name,
            description: descr,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
        }
    }

    return {loading, 
            error, 
            process,
            clearError,
            setProcess,  
            getAllCharacters, 
            getCharacter, 
            getAllComics, 
            getComic, 
            getCharacterByName}
}


export default useMarvelService;

