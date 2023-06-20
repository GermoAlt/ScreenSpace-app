import {useState} from "react";
import {StyleSheet, View} from "react-native";
import SkeletonContent from 'react-native-skeleton-content';

export const Image = () => {
    const [loading, setLoading] = useState()
    return (
        <SkeletonContent containerStyle={styles.container} isLoading={loading}>
            
        </SkeletonContent>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius:15

    }
})
