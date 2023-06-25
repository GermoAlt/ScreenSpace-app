import {useState} from "react";
import {DateTimePickerField} from "./DateTimePickerField";

export const CalendarPickerField = (props) => {
    return <DateTimePickerField data={props.date} setData={(e)=>props.setDate(e)} mode={"date"}/>
}
