import axios from "axios";

export const RequestConfig = { baseURL: "http://xco.vcargocloud.com/ECOPortal" };
//export const RequestConfig = { baseURL: "http://localhost:8080/ECOPortal" };

export default axios.create( RequestConfig );
