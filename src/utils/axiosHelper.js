import axios from 'axios';

const axiosGet = async (url, token) => {
    let result = undefined
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    await axios.get(url,
        config
    )
    .then((response) => {
        result = response
    })
    return result
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
