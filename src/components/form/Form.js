import { Form, Formik, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { Link } from "react-router-dom";

import { useState } from "react";
import useMarvelService from "../../services/MarvelService";

import './Form.scss'

const CustomForm = () => {

    const { getCharacterByName, clearError } = useMarvelService();

    const [char, setChar] = useState(null);
    const [charExist, setCharExist] = useState(false);
    const [charNotFound, setCharNotFound] = useState(false);

    const onRequest = (name) => {
        clearError()

        getCharacterByName(name)
            .then(checkChar)
    }
    const checkChar = (charSet) => {
        if (charSet.length > 0) {
            setChar(charSet);
            setCharNotFound(false);
            setCharExist(true);
        } else {
            setCharExist(false);
            setCharNotFound(true);
        }
    }

    return (
        <Formik
            initialValues={{
                name: ''
            }}
            validationSchema={Yup.object({
                name: Yup.string()
                        .required('This field is required')
            })}
            onSubmit={values => onRequest(values.name)}>
            <Form className="form">
                <label htmlFor="name">Write down name of characther...</label>
                <Field
                    placeholder="Enter name"
                    id='name'
                    name='name'
                />
                {
                    charExist ? <div className="form__message form__message_true">There is! Visit {char[0].name} page?</div> : null
                }
                {
                    charNotFound ? <div className="form__message form__message_false">The character was not found. Check the name and try again</div> : null
                }
                <ErrorMessage className="form__message_false" name='name' component='div' />
                <button type="submit" className="button button__main form__btn">
                    <div className="inner">FIND</div>
                </button>
                {
                    charExist ? 
                    <Link to={`/${char[0].id}`}>
                        <button type="submit" className="button button__secondary form__btn form__btn_topage">
                            <div className="inner">TO PAGE</div>
                        </button>
                    </Link> : null
                }
            </Form>
        </Formik>
    )
}

export default CustomForm;