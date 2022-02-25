import { HttpHeaders } from '@angular/common/http'; 



export class ApiConf {

    //APIヘッダー情報
    static readonly httpOption = {
        "contentType" : "application/json",
        "Auth" : "Authorization",
        "observe" : "response",
        "body" : "" 
    }
}
