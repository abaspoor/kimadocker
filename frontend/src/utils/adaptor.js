import React, {useEffect} from 'react';

const AnswerConverter = (data)=>{
    return (data.map(item=>({
        id:item.id,
        date:item.date,
        time:item.time,
        distance:item.distance,
        passengers:item.passenger_count,
        method:item.transportMethodName
    })));
}



export {AnswerConverter};