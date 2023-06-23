import EncryptedStorage from 'react-native-encrypted-storage';

const useEncryptedStorage = () => { 
    const storeUserSession = async (auth) => {
        try {
            await EncryptedStorage.setItem(
                "user_session",
                JSON.stringify({
                    token: auth.accessToken,
                    userName: auth.userName,
                    userPassword: auth.userPassword 
                })
            );
            await EncryptedStorage.setItem("accessToken", auth.accessToken);
        } catch (error) {
            console.log(error)
        }
    }

    const retrieveUserSession = async () => {
        return await EncryptedStorage.getItem("user_session")
    }

    const removeUserSession = async () => {
        try {   
            return await EncryptedStorage.removeItem("user_session");
        } catch (error) {
            console.log(error)
            return false
        }
    }

    const getUserToken = async () => {
        try {   
            const token = await EncryptedStorage.getItem("accessToken");
            return token
        } catch (error) {
            console.log(error)
            return null
        }
    }

    const clearStorage = async () => {
        try {   
          return await EncryptedStorage.clear();
        } catch (error) {
          console.log(error)
          return false
        }
    }
    
    return { storeUserSession, retrieveUserSession, removeUserSession, getUserToken, clearStorage }
}


export default useEncryptedStorage