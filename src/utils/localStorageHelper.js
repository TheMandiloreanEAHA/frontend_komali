const saveDataLocalStorage = (keyData, data) => {
  localStorage.setItem(keyData, JSON.stringify(data));
};

const getDataLocalStorage = (key) => {
  const storedData = localStorage.getItem(key);
  if (storedData !== undefined && storedData !== null) {
    const data = JSON.parse(storedData);
    return data;
  } else {
    return undefined;
  }
};

const deleteDataLocalStorage = (key) => {
  localStorage.removeItem(key);
};

export { saveDataLocalStorage, getDataLocalStorage, deleteDataLocalStorage };
