export default function formatQuery(string) {

    var search = string;
    if (search == null || search == "") {
        return ({})
    }
    const obj = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').
        replace(/&/g, '","').replace(/=/g, '":"') + '"}');
    return obj

}