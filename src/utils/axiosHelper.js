import axios from 'axios';

const axiosGet = async (url, parameters = {}) => {
    let result = undefined
    axios.get(url,{
        params:parameters
    })
    .then((response) => {
        result = response
    })
    .finally(() => {
        return result
    })
}

const axiosPost = async (url, body_params) => {
    let result = undefined
    await axios.post(url, body_params)
    .then((response) => {
        result = response
    })
    .catch((error) => {
        console.log(error);
    })
    return result
}

export { axiosGet, axiosPost }
