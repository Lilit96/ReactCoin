import React from 'react';
import {withRouter} from 'react-router-dom';
import {API_URL} from '../../config';
import Loading from './Loading';
import {handleResponse} from '../../helper';

import './Search.css';

class Search extends React.Component{
    constructor(){
        super();
        this.handleChange=this.handleChange.bind(this);
        this.state={
            searchResult:[],
            searchQuery:'',
            loading:false
        };
        this.handleChange=this.handleChange.bind(this);
        this.handleRederekt=this.handleRederekt.bind(this);
    }

    handleChange(event){
       const searchQuery=event.target.value;
       this.setState({
           searchQuery
       });
       if(!searchQuery){
           return ''; 
       }
       this.setState({
            loading:true,
       });
       fetch(`${API_URL}/autocomplete?searchQuery=${searchQuery}`)
       .then(handleResponse)
       .then((result)=>{
       
            this.setState({
                loading:false,
                searchResult:result,
            });
           
       })
    }

    handleRederekt(currencyId){
         /**
         * Clear input value and close outocomplit container,
         * by clearing search query state
         */

        this.setState({
            searchQuery:'',
            searchResult:[],
        });
        this.props.history.push(`/currency/${currencyId}`);

    }

    renderSearchResults(){
        const{searchResult,searchQuery,loading}=this.state;
       
        if(!searchQuery){
            return '';
        }
        if(searchResult.length>0){
            return(
                <div className="Search-result-container">
                {searchResult.map(result=>(
                    <div 
                        className="Search-result"
                        key={result.id}
                        onClick={()=>this.handleRederekt(result.id)}
                    >
                     {result.name}({result.symbol})
                    </div>
                ))}
                </div>
                
            )
        }
        if(!loading){
            return(
                <div className="Search-result-container">
                    <div className="Search-no-result">
                        No results found
                    </div>
                </div>
            )
        }
    }

    render(){
        const{loading,searchQuery}=this.state;
        return (
            <div className="Search">
                <span className="Search-icon"/>
                <input className="Search-input" value={searchQuery} type="text" placeholder="Currency name" onChange={this.handleChange}/>
                {loading &&
                <div className="Search-loading">
                    <Loading width="12px" height="12px"/>
                </div>}
                {this.renderSearchResults()}
            </div>
        );
    }
}

export default withRouter(Search);