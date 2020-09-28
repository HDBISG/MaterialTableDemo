import axios from "axios";

export default axios.create({
  baseURL: "http://xco.vcargocloud.com/ECOPortal",
  // async:true,
  // crossDomain: true,
  // 'Access-Control-Allow-Origin':"*"

  // http://xco.vcargocloud.com/ECOPortal/coexMsgLog/list/json/?sEcho=3&iColumns=11&iDisplayStart=40&iDisplayLength=10&iSortCol_0=0&sSortDir_0=asc&iSortingCols=1&mDataProp_0=coexlogId&mDataProp_1=coexlogMsgRefNo&mDataProp_2=coexlogMsgFunc&mDataProp_3=coexlogDocNo&mDataProp_4=coexlogDocRefNo&mDataProp_5=coexlogDocGroup&mDataProp_6=coexlogMsgVersion&mDataProp_7=coexlogMsgSender&mDataProp_8=coexlogMsgReceiver&mDataProp_9=coexlogProcessStatus&mDataProp_10=coexlogDtCreat
});

