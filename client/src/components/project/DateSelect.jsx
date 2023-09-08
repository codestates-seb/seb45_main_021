import { useEffect, useState } from "react";
import Select from "../common/Select";
import { checkValidations } from "../../utils/checkValidations";

export default function DateSelect ({defaultDate ,width, setDataForm, setErrors}) {
    const time = new Date()
    const [resetDate, setResetDate] = useState([]);

    useEffect(()=>{
        setResetDate([
            defaultDate.getFullYear(),
            defaultDate.getMonth()+1,
            defaultDate.getDate(),
        ])
    },[defaultDate]);
    
    const yearOptions = () => {
        const options = []
        for(let i = time.getFullYear(); i <= time.getFullYear()+10; i++) {
            options.push({value:i, label:i});
        }
        return options;
    }    
    const monthOptions = () => {
        const options = []
        for(let i = (time.getFullYear()===resetDate[0] ? time.getMonth()+1 : 1); i <= 12; i++) {
            options.push({value:i, label:i});
        }
        return options;
    }    
    const dayOptions = () => {
        const options = []
        const days = new Date(resetDate[0], resetDate[1], 0).getDate();
        for(let i = (time.getFullYear()===resetDate[0] && time.getMonth()+1===resetDate[1]) ? time.getMonth()+1 : 1; i <= days; i++) {
            options.push({value:i, label:i});
        }
        return options;
    }    
    
    const setOptions = [yearOptions(), monthOptions(), dayOptions()]

    const settingByIndex = (idx,e) => {
        if(idx === 0) {
            const newDate = [...resetDate];
            newDate[0] = e;
            newDate[1] = '-';
            newDate[2] = '-';
            return newDate;
        } else if (idx === 1) {
            const newDate = [...resetDate];
            newDate[1] = e;
            newDate[2] = '-';
            return newDate;
        } else if (idx === 2) {
            const newDate = [...resetDate];
            newDate[2] = e;
            return newDate;
        }
    }

    return (
        <>
            {resetDate.map((el,idx)=>
                <Select
                    key={idx}
                    width={width}
                    options={setOptions[idx]}
                    defaultLabel={el}
                    onClickHandler={(e)=>{
                        setResetDate(settingByIndex(idx,e));
                        if(idx === 2) {
                            setDataForm(null,new Date(resetDate[0],resetDate[1],e), 'closed_At')
                            setErrors(null,String(new Date(resetDate[0],resetDate[1],e)), 'closed_At', checkValidations)
                        } else {
                            setDataForm(null,'', 'closed_At')
                            setErrors(null,'', 'closed_At', checkValidations)
                        }
                    }}
                />
            )}
        </>
    );
};