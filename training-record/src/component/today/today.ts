export const calculateToday = () => {
    const date = new Date();    
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    console.log(year+'-'+month+'-'+day)
    return year+'-'+month+'-'+day
}
