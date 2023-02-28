import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { WEBSOCKET_ENDPOINT, WEBSOCKET_NOTIFY_TOPIC } from '../constants/base-url.constants';
import { NotificationService } from './notification.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  stompClient: any;

  constructor(private notificationService: NotificationService,private http: HttpClient) { }

  connect(): void {
    console.log('webSocket Connection');
    const ws = new SockJS(WEBSOCKET_ENDPOINT);
    this.stompClient = Stomp.over(ws);
    const _this = this;
    _this.stompClient.connect({}, function(frame) {
        _this.stompClient.subscribe(WEBSOCKET_NOTIFY_TOPIC, function(sdkEvent) {
            _this.onMessageReceived(sdkEvent);
        });
    }, this.errorCallBack);
}


  disconnect(): void {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
    console.log('Disconnected');
  }

   // on error, schedule a reconnection attempt
   errorCallBack(error) {
    console.log('errorCallBack -> ' + error);
    setTimeout(() => {
        this.connect();
    }, 5000);
}
  onMessageReceived(message) {
    console.log('Message Recieved from Server :: ' + message);
   // Emits the event.
    this.notificationService.notificationMessage.emit(JSON.parse(message.body));
  }

  GetNotif = (matChef:any,codServ:any): Observable<any[]> => {
    return this.http.get<any[]>("http://localhost:8082/notification/getnotif/"+matChef+"/"+codServ);
  };  
  
  GetNotifByMat = (matChef:any): Observable<any[]> => {
    return this.http.get<any[]>("http://localhost:8082/notification/getnotifByMat/"+matChef);
  };  
  GetAllNotif = (): Observable<any[]> => {
    return this.http.get<any[]>("http://localhost:8082/notification/findall");
  };
  GetNotifRh = (): Observable<any[]> => {
    return this.http.get<any[]>("http://localhost:8082/notification/getnotifRh");
  };
  AjouNotif(user:any){
    return this.http.post("http://localhost:8082/notification/send",user)

  }
  getnbrnotif= (mat:any,cod:any): Observable<any[]> => {
    return this.http.get<any[]>("http://localhost:8082/notification/getMax/"+mat+"/"+cod);
  };

  UpdateEtatNotif(data:any):Observable<any>{
    return this.http.put<any>("http://localhost:8082/notification/updateEtatNotif",data);
  }
}
