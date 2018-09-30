import React from 'react';
import {handleResponse,fetchRecuest} from '../../helper';
import {API_URL} from '../../config';
import Loading from '../common/Loading';
import Table from '../list/Table';
import Pagination from './Pagination';



class List extends React.Component{
    constructor(){
        super();
            this.state={
                loading:false,
                currencies:[],
                error:null,
                totalPages:0,
                page:1,
            };
            this.handlePaginationClick=this.handlePaginationClick.bind(this);
        
    };

    componentDidMount(){   
        this.fetchCurrencies();
    }
    fetchCurrencies(){
        this.setState({loading:true});
        const {page} = this.state;
         fetch(`${API_URL}/cryptocurrencies?page=${page}&perPage=10`)
            .then(handleResponse)
            .then((data)=>{
                const{currencies,totalPages}=data;
                // console.log(data);
                this.setState({currencies,totalPages,loading:false});
            })
            .catch((error)=>{
                this.setState({error:error.errorMessage,loading:false});    
            });
    }

 

    handlePaginationClick(direction){
        console.log(this);
        let nextPage=this.state.page;
        nextPage=(direction==='next') ? nextPage+1 : nextPage-1; //increment next page if parametr next 
        this.setState({page:nextPage},()=>{
            //call fetchCurrencies() insize setState callback
            this.fetchCurrencies();
        });
       

    }
    render(){
        const {loading,error,currencies,page,totalPages}=this.state;/******destruction */
        /**
         * render only loading component, if loading state is set to true
         */
        // console.log(this.state);
        if(loading){
            return <div className="loading-container"><Loading /></div>;
        }
        /**
         * render error message only if error occured while fetching date
         */
        if(error){
            return <div className="error">{error}</div>
        }
        return(
            <div>
          <Table 
            currencies={currencies}
          />
          <Pagination 
            page={page}
            totalPages={totalPages}
            handlePaginationClick={this.handlePaginationClick}
          />
          </div>
        );
    };
};

export default List;