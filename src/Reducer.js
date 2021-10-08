const tableData=[];
const Reducer = (state = tableData,action)=>{
    switch(action.type){
        case "addingTableData":
            return [...action.state];
            default:
                return state;
    }
};

export default Reducer;