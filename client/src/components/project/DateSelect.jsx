import { useEffect, useState } from "react";
import Select from "../common/Select";
import { checkValidations } from "../../utils/checkValidations";

export default function DateSelect ({
    defaultDate,
    width,
    handleInputChange,
    handleErrorChange
}) {
    const time = new Date()
    const [resetDate, setResetDate] = useState([]);

    useEffect(()=>{
        console.log('실행');
        if(defaultDate.length) {
            const parsingDate = new Date(defaultDate);
            setResetDate([
                parsingDate.getFullYear(),
                parsingDate.getMonth()+1,
                parsingDate.getDate(),
            ])
        }
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
                            handleInputChange(null,String(new Date(resetDate[0],resetDate[1]-1,e)), 'closedAt')
                            handleErrorChange(null,String(new Date(resetDate[0],resetDate[1],e)), 'closedAt', checkValidations)
                        } else {
                            handleInputChange(null,'', 'closedAt')
                            handleErrorChange(null,'', 'closedAt', checkValidations)
                        }
                    }}
                />
            )}
        </>
    );
};