import * as React from 'react';
import {IconButton} from "react-native-paper";
import {StyleSheet} from "react-native";
import {COLORS} from "../../styles/Colors";

export const SeatWrapper = (props) => {
    const {i, idx, letters, handleSeatSelection} = props

    const [selected, setSelected] = React.useState(false)
  
    const handleSeatPress = (value) => {
        const isSelected = !selected
        const selection = `Fila:${letters[value.row]}, Butaca:${value.col}`
        handleSeatSelection({seatSelection: selection, seatSelected: isSelected})
    }



    return (
        <IconButton icon={"sofa-single"} size={35} 
        selected={selected} iconColor={selected ? COLORS.selectedSeat : COLORS.vacantSeat} 
        style={styles.icon} key={"icon-"+i+idx} 
        onPress={()=>{ 
            setSelected(!selected)
            handleSeatPress({row:idx, col:i+1})
        }}/>
    )
}

const styles = StyleSheet.create({
    container: {
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
    },
    seatContainer:{

    },
    row:{
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        margin:0
    },
    title:{
        fontSize:40,
        color:COLORS.secondary,
        fontWeight:"bold",
        lineHeight:40,
        marginLeft:15
    },
    text:{
        fontSize:25,
        color:COLORS.primary,
        marginRight:10
    }, 
    icon:{
        padding:0,
        margin:0
    }
})
