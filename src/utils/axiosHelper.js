import axios from "axios";

const axiosGet = async (url, token) => {
  let result = undefined;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  await axios.get(url, config).then((response) => {
    result = response;
  });
  return result;
};

const axiosPost = async (url, body_params, token) => {
  let result = undefined;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  await axios
    .post(url, body_params, config)
    .then((response) => {
      result = response;
    })
    .catch((error) => {
      console.log(error);
    });
  return result;
};

const axiosPostForm = async (url, formData, token) => {
  let result = undefined;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  await axios
    .postForm(url, formData, config)
    .then((response) => {
      result = response;
    })
    .catch((error) => {
      console.log(error);
    });
  return result;
};

const axiosPut = async (url, body_params, token) => {
  let result = undefined;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  await axios
    .put(url, body_params, config)
    .then((response) => {
      result = response;
    })
    .catch((error) => {
      console.log(error);
    });
  return result;
};

const axiosPutForm = async (url, formData, token) => {
  let result = undefined;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  await axios
    .putForm(url, formData, config)
    .then((response) => {
      result = response;
    })
    .catch((error) => {
      console.log(error);
    });
  return result;
};

const axiosDelete = async (url, token) => {
  let result = undefined;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  await axios
    .delete(url, config)
    .then((response) => {
      result = response;
    })
    .catch((error) => {
      console.log(error);
    });
  return result;
};

export { axiosGet, axiosPost, axiosPut, axiosDelete, axiosPostForm };
