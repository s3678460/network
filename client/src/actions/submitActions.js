import axios from 'axios';
import {GET_ERRORS, GET_CONTACTS} from './types';


export const submitForm = (clientData,history) => dispatch => {
    axios
            .post('/api/contacts/submit', clientData)
            .then(res => history.push('/success'))
            .catch (err => 
                dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
                );

};

// Get all data

export const getContacts = () => async dispatch => {
    const res = await axios.get("/api/contacts");
    dispatch({
        type: GET_CONTACTS,
        payload: res.data
    })
}