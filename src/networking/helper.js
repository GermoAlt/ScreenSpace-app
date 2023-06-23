import EncryptedStorage from 'react-native-encrypted-storage';

const getKey = (key) => {
    return EncryptedStorage.getItem(key)
    .then((response) => { return response })
    .catch(e => {
        console.log(e);
        return null
    })

}

const setKey = (key, data) => {
    return EncryptedStorage.setItem(key, data)
    .then((response) => { return response })
    .catch(e => {
        console.log(e);
        return null
    })
}

const removeKey = (key) => {
    return EncryptedStorage.removeItem(key)
    .then((response) => { return response })
    .catch(e => {
        console.log(e);
        return null
    })
}

const clearStorage = () => {
    return EncryptedStorage.clear()
    .then((response) => { return response })
    .catch(e => {
        console.log(e);
        return null
    })
}

export { getKey, setKey, removeKey, clearStorage }