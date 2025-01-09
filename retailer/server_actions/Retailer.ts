"use server"
import axios from "axios"
const getPriceDistribution=async ()=>{
    const {data}=await axios.get('http://localhost:5000/api/products/price-distribution')
    console.log(data)
    return data;
}

const retailerDistribution=async ()=>{
    const {data}=await axios.get('http://localhost:5000/api/products/retailer-distribution')
    return data;
}

const discountData=async ()=>{
    const {data}=await axios.get('http://localhost:5000/api/products/discount-data')
    return data;
}

const daysUntilExpiry = async ()=>{
    const {data}=await axios.get('http://localhost:5000/api/products/days-until-expiry')
    return data;
}
export {getPriceDistribution,retailerDistribution,discountData,daysUntilExpiry};

