import React from 'react';
import {withRouter} from 'react-router-dom';
import {renderCahngePercent} from '../../helper';
import PropTypes from 'prop-types';


import './Table.css';


const Table=(props)=>{
    const {currencies,history}=props;
    return (
        <div className="Table-container">
        <table className="Table">
            <thead className="Table-head">
                <tr>
                    <th>Cryptocurrencie</th>
                    <th>Price</th>
                    <th>Market kep</th>
                    <th>24H change</th>
                </tr>
            </thead>
            <tbody className="Table-body">
                    {
                    currencies.map((currence)=>(
                        <tr key={currence.id} onClick={()=>history.push(`/currency/${currence.id}`)}>
                        
                            <td>
                                <span className="Table-rank">
                                    {currence.rank}
                                 </span>
                                 {currence.name}
                            </td>
                            <td>
                                <span className="Table-dollar">
                                    $ 
                                 </span>
                                 {currence.price}
                            </td>
                            <td>
                                <span className="Table-dollar">
                                    $ 
                                 </span>
                                 {currence.marketCap}
                            </td>
                            <td>
                                {renderCahngePercent(currence.percentChange24h)}
                            </td>
                           
                        </tr>
                    ))
                    }                       
            </tbody>
        </table>
    </div>
    )
}
Table.propTypes={
    currencies:PropTypes.array.isRequired,
    history:PropTypes.object.isRequired,
};

export default withRouter(Table);
