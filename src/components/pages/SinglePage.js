import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from 'framer-motion/dist/framer-motion';

import AppBanner from "../appBanner/AppBanner";

import useMarvelService from "../../services/MarvelService";
import setContent from '../../utils/setContent';

const SinglePage = ({Component, dataType}) => {
    const {id} = useParams();
    const [data, setData] = useState(null);
    const {getComic, getCharacter, clearError, process, setProcess} = useMarvelService();

    useEffect(() => {
        updataData();
        console.log(id)
    }, [id])

    const updataData = () => {
        clearError();

        switch(dataType) {
            case 'comic': 
                getComic(id).then(OnDataLoaded).then(() => setProcess('confirmed'))
                break;
            case 'char': 
                getCharacter(id).then(OnDataLoaded).then(() => setProcess('confirmed'))
                break;
            default:
                console.log('something wrong')
        }
    }

    const OnDataLoaded = (data) => {
        setData(data);
    }

    return (
        <motion.div initial={{ x: '-200%' }} animate={{ x: 0, transition: { duration: 1 } }} exit={{ x: '200%', transition: { duration: 1 } }}>
            <AppBanner/>
            {setContent(process, Component, data)}
        </motion.div>
    )
}

export default SinglePage