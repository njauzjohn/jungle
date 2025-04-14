export const Pricecurrency =(price)=>{
    return new Intl.NumberFormat('en',{
        style : 'currency',
        currency : 'Ksh'
    }).format(price)
}