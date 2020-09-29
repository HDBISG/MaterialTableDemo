import axios from "axios";

export const RequestConfig = { baseURL: "http://xco.vcargocloud.com/ECOPortal" };

export default axios.create( RequestConfig );
