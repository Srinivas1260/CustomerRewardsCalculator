import {filter} from 'lodash';


export const searchByOptions = (transData, searchData)=>{
    let totalRewards = 0;
    let transactions = [];
    if(searchData){
        transactions = filter(transData, (transactionData)=>{
            if(transactionData.customerId == searchData.customerId){
                totalRewards += transactionData.points;
                let transationDate = new Date(transactionData.date);
                if(transationDate.getMonth() == searchData.month && transationDate.getFullYear() == searchData.year){
                    return true;
                }
            }
            return false;
        });
    }
    return {
        transactions,
        totalRewards
    }
};
const calculateRewardPtsTrans = (transData) => {
    return transData.map(transaction => {
        let points = 0;
        let over100 = transaction.amountSpend - 100;

        if (over100 > 0) {
            // A customer receives 2 points for every dollar spent over $100 in each transaction      
            points += (over100 * 2);
        }
        if (transaction.amt > 50) {
            // plus 1 point for every dollar spent over $50 in each transaction
            points += 50;
        }
        const month = new Date(transaction.date).getMonth();
        const year = new Date(transaction.date).getFullYear();
        return { ...transaction, points, month, year };
    });
}
export const calculateResults = (transData) => {

    const rewardsPerTrans = calculateRewardPtsTrans(transData["Transaction"]);
    let filters = {};
    rewardsPerTrans.forEach((eachReward)=>{
        if( !filters[eachReward["customerId"]] ){
            filters[eachReward["customerId"]] = {

            }
        }
        filters[eachReward["customerId"]]["name"] = eachReward["firstName"] + ' ' + eachReward["lastName"];
        filters[eachReward["customerId"]]["value"] = eachReward["customerId"];
        const year = new Date(eachReward.date).getFullYear();
        if(!filters[eachReward["customerId"]][year]){
            filters[eachReward["customerId"]][year] = {
            }
        }
        const month = new Date(eachReward.date).getMonth();
        filters[eachReward["customerId"]][year][month] = true;
    });
    return {
        filters,
        rewardsPerTrans
    }
}

export const Months = [{
    label: "Jan"
}, {
    label: "Feb"
}, {
    label: "Mar"
}, {
    label: "Apr"
}, {
    label: "May"
}, {
    label: "Jun"
}, {
    label: "Jul"
}, {
    label: "Aug"
}, {
    label: "Sep"
}, {
    label: "Oct"
}, {
    label: "Nov"
}, {
    label: "Dec"
}];