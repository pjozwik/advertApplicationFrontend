import axios from "axios";

export default axios.create({
    baseURL:'http://localhost:8222/',
    headers: {'Access-Control-Allow-Origin': '*'}
});