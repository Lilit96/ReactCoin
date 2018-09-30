import React from 'react';
/**
 * 
 * fetch error helper
 * @param {object} response
 */


export const handleResponse= async (response)=>{
    return response.json().then(json=>{
        return response.ok ? json : Promise.reject(json);
    });
}


/**
 * render Change Percent Healper @param {string } percent
 */
export const  renderCahngePercent=(percent)=>{
    if(percent>0){
        return <span className="percent-raised">
            {percent}% &uarr;
        </span>
    }
    else if(percent<0){
        return <span className="percent-fallen">
            {percent}% &darr;
        </span>
    }
    else{
        return <span>{percent}</span>;
    }
}

/**
 * fetch request function
 */

 