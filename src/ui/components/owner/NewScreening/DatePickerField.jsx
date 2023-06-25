import {DateTimePickerField} from "./DateTimePickerField";

export const DatePickerField = (props) => {
    return <DateTimePickerField data={props.time} setData={(t)=>props.setTime(t)} mode={"time"}/>

}
