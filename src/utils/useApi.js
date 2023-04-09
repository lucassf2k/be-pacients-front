import { useEffect, useState, useMemo, useCallback } from "react";

async function getData(endpoint) {

    try {
        const response = await fetch(`http://127.0.0.1:8080/${endpoint}`);
        return await response.json();
    } catch (error) {
        return error;
    }
}

function useApi(endpoint) {
    const [data, setData] = useState(null);

    const refreshData = useCallback(async (endpoint)=>{
        const data = await getData(endpoint);
        setData(data);
    });

    useEffect(() => {
        refreshData(endpoint);
    }, []);


    return [data,refreshData];
}


export default useApi;