export function convertMoneyToReduction(money){
    const multipliers = ["K", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "No", "Dc"]
    const str = money.toString().length;
    let a = Math.floor(str/3);
    const b = str%3;
    let res, res1, res2;
    let bool = true;
    if(b){
        res = money.toString().substring(0,b*2+1)
        res1 = res.slice(0, b)
        res2 = res.slice(b, b+2)
    } else{
        res = money.toString().substring(0,4)
        res1 = res.slice(0, 3)
        res2 = res.slice(3)
        a--;
    }
    while (bool){
        if(res2.slice(-1) === "0"){
            res2=res2.slice(0,-1);
        } else {
            bool = false;
        }
    }
    if (multipliers[a-1] && res2){
        res = res1 + "," + res2 + multipliers[a-1]
    } else if(multipliers[a-1] && !res2){
        res = res1 + multipliers[a-1];
    } else{
        res = res1;
    }
    return res;
}
export function convertMoneyToRCommasIsFull(money){
    try{
        const str = money.toString().length;
        const mas = []
        let res, res1;
    
        res = money;
    
        let a = Math.floor(str/3);
        const b = str%3;
        if(b){
            res = money.toString().slice(0, b)
            res1 = money.toString().slice(b)
        }
        for (let i = 0; i < a; i++) {
            mas[i]= res1.toString().slice(i*3, i*3+3)
        }
        res = res + "," + mas.join(",")
        return res;
    }catch(e){
        console.log(money)
        console.log(e)
        return money;
    }
    
}
export function convertMoneyToRCommas(money){

}