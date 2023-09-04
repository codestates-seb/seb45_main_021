import { useState } from "react";

export default function useError({defaultError}) {
    const [error,setError] = useState(defaultError);
    


    return [error, setError];
}


