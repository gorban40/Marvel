import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from 'framer-motion/dist/framer-motion';

import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/spinner";
import ErrorMessage from "../error/Error";
import AppBanner from "../appBanner/AppBanner";
import { Helmet } from "react-helmet";

const SinglePage = ({Component, dataType}) => {
    const {id} = useParams();
    const [data, setData] = useState(null);
    const {loading, error, getComic, getCharacter, clearError} = useMarvelService();

    useEffect(() => {
        updataData();
        console.log(id)
    }, [id])

    const updataData = () => {
        clearError();

        switch(dataType) {
            case 'comic': 
                getComic(id).then(OnDataLoaded);
                break;
            case 'char': 
                getCharacter(id).then(OnDataLoaded);
                break;
            default:
                console.log('something wrong')
        }
    }

    const OnDataLoaded = (data) => {
        setData(data);
    }

    const spinner = loading ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;
    const content = !(loading || error || !data) ? <Component data={data}/> : null;

    return (
        <motion.div initial={{ x: '-200%' }} animate={{ x: 0, transition: { duration: 1 } }} exit={{ x: '200%', transition: { duration: 1 } }}>
            <AppBanner/>
            {errorMessage}
            {spinner}
            {content}
        </motion.div>
    )
}

export default SinglePage