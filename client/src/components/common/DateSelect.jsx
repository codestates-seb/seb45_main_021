import DatePicker from 'react-datepicker';
import { useState } from 'react';

export default function DateSelect() {
    const [startDate, setStartDate] = useState(new Date());
    return (
        <div>
            <DatePicker
			  selected={startDate}
			  onChange={(date) => setStartDate(date)}
			  dateFormat="yyyy-MM-dd"
			/>
        </div>
    );
}

