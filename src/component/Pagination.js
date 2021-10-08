import React from 'react';

const Pagenation = (props)=>{
const pages =[];
for(let i=1;i<=Math.ceil(props.totalPages/props.postPerPage);i++){
    pages.push(i);
}    
return(
    <div className="d-flex justify-content-center">
        <div onClick={()=>props.prevPage()}><a className="button" href="!#">prev</a></div>
        {pages.map(page=>{return( 
            <div  key={page} onClick={()=>props.pageNavigation(page)} className="pl-2 ml-1" style={{height:"30px",width:"30px"}}>
                <a className="button" href="!#">{page}</a>
            </div>)
        })}
        <div onClick={()=>props.nextPage()}><a className="button" href="!#">next</a></div>
    </div>
)
}
export default Pagenation;