import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Pagenation from './Pagination';
import { addingTableData } from '../Action';
import { connect } from 'react-redux';
import "./Table.css";

function Table(props){
const api = "https://api.punkapi.com/v2/beers";

const [tableData,setTable] = useState([]);
useEffect(()=>{
     axios.get(api)
.then(res=>{
    console.log(res.data);
    setTable(res.data);
})
.catch(err=>{console.log(err)})
addingTableData(tableData);
},[])
const [currentPage,setCurrentPage] = useState(1);
const postPerPage = 10;
const totalpages = tableData.length;
const lastPost = currentPage * postPerPage;
const firstPost = lastPost - postPerPage;
const currentPost = tableData.slice(firstPost,lastPost);

const pageNavigation=(page)=>{
    setCurrentPage(page);
}
const prevPage=()=>{
    if(currentPage !== 1){
        setCurrentPage(currentPage - 1)
    }
}
const nextPage=()=>{
    if(currentPage !== totalpages){
        setCurrentPage(currentPage + 1)
    }
}
return(
<div>
    <table className="table table-bordered tables" style={{fontSize:"11px",textAlign:"center"}}>
        <th>ID</th>
        <th>NAME</th>
        <th>TAGLINE</th>
        <th>FIRST BREWED</th>
        <th>DESCRIPTION</th>
        <th>IMAGE</th>
        <th>ABV</th>
        <th>IBU</th>
        <th>TARGET FG</th>
        <th>TARGET OG</th>
        <th>EBC</th>
        <th>SRM</th>
        <th>PH</th>
        <th>ATTENUATION LEVEL</th>
        <th>VOLUME</th>
        <th>BOIL VOLUME</th>
        <th>METHOD</th>
        <th>INGREDIENTS</th>
        <th>FOOD PAIRING</th>
        <th>BREWERS TIPS</th>
        <th>CONTRIBUTED BY</th>    
    <tbody>
    {currentPost.map(data=>{return(
    <tr key={data.id}>
        <td>{data.id}</td>
        <td>{data.name}</td>
        <td>{data.tagline}</td>
        <td>{data.first_brewed}</td>
        <td> {data.description}</td>
        <td><img height="140px" width="75px" src={data.image_url} alt =""/></td>
        <td>{data.abv}</td>
        <td>{data.ibu}</td>
        <td>{data.target_fg}</td>
        <td>{data.target_og}</td>
        <td>{data.ebc}</td>
        <td>{data.srm}</td>
        <td>{data.ph}</td>
        <td>{data.attenuation_level}</td>
        <td>{data.volume.value} {data.volume.unit}</td>
        <td>{data.boil_volume.value} {data.boil_volume.unit}</td>
        <td>
        <span style={{fontWeight:"bold"}}>{Object.keys(data.method).slice(0,1)}</span> <br/>
        {Object.keys(data.method.mash_temp[0]).slice(0,1)} : {data.method.mash_temp[0].temp.value} {data.method.mash_temp[0].temp.unit}<br/>
        {Object.keys(data.method.mash_temp[0]).slice(1,2)} : {data.method.mash_temp[0].duration}<br/>
        <span style={{fontWeight:"bold"}}>{Object.keys(data.method).slice(1,2)}</span> <br/>
        {Object.keys(data.method.fermentation).slice(0,1)} : {data.method.fermentation.temp.value} {data.method.fermentation.temp.unit}<br/>
        <span style={{fontWeight:"bold"}}>{Object.keys(data.method).slice(2,3)}</span> : {data.method.twist === null ? "null" : data.method.twist}<br/>
        </td>        
        
        <td>
        <span style={{fontWeight:"bold"}}>{Object.keys(data.ingredients).slice(0,1)}</span> <br/>
        { data.ingredients.malt.map(malts=>{return(
        <li> {Object.keys(malts).slice(0,1)} : {malts.name}<br/>
        {Object.keys(malts).slice(1,2)} : {malts.amount.value} {malts.amount.unit}<br/><br/>
        </li>
        )})}
        
        <span style={{fontWeight:"bold"}}>{Object.keys(data.ingredients).slice(1,2)}</span> <br/><br/>
        { data.ingredients.hops.map(hop=>{return(
        <li>
        {Object.keys(hop).slice(0,1)} : {hop.name}<br/>
        {Object.keys(hop).slice(1,2)} : {hop.amount.value} {hop.amount.unit}<br/>
        {Object.keys(hop).slice(2,3)} : {hop.add}<br/>
        {Object.keys(hop).slice(3,4)} : {hop.attribute}<br/><br/>
        </li>
        )})}
            
        <span style={{fontWeight:"bold"}}>{Object.keys(data.ingredients).slice(2,3)}</span> : {data.ingredients.yeast}<br/>
        </td>
        <td>{data.food_pairing.map(foodlist=>{return(<li>{foodlist}</li>)})}</td>
        <td>{data.brewers_tips}</td>
        <td>{data.contributed_by}</td>

     </tr>)})}
     </tbody>
    </table>
    <Pagenation postPerPage={postPerPage} totalPages={totalpages} pageNavigation={pageNavigation} prevPage={prevPage} nextPage={nextPage}/>
</div>
)
}
const mapStateToProps = (state)=>{
    return{
        TableData:state,
    }
}
export default connect(mapStateToProps)(Table);
