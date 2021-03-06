import { Injectable, Injector } from "@angular/core";
import {
  HttpInterceptor,
  HttpHandler, 
  HttpRequest, 
  HttpSentEvent, 
  HttpHeaderResponse, 
  HttpProgressEvent, 
  HttpUserEvent,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { environment } from "../../../environments/environment";
import { Observable,of } from "rxjs";
import { mergeMap, catchError ,shareReplay} from "rxjs/operators";


/**
 * 默认HTTP拦截器
 */
@Injectable()
export class DefaultInterceptor implements HttpInterceptor {
  constructor(private injector: Injector){}

  intercept(
    req: HttpRequest<any>, 
    next: HttpHandler
  ):Observable<
    | HttpSentEvent
    | HttpHeaderResponse
    | HttpProgressEvent
    | HttpUserEvent<any>
    | HttpResponse<any>
  > {
    // 1 统一添加baseUrl
    let url = req.url;
    if (!url.startsWith('https://') && !url.startsWith('http://'))  {
      url = environment.baseURL + url;
    }

    debugger;
    // 2 统一设置请求头
    // 3 统一添加loading

    const newReq = req.clone({
      url: url,
    });

    // 使用pipe对响应处理
    return next.handle(newReq).pipe(
      mergeMap((event:any) => {
        // 拦截响应200做处理
        if (event instanceof HttpResponse && event.status === 200) return this.handleDate(event);

        // 若一切都正常，则后续操作
        return of(event);
      }),
      // 捕获错误信息做处理
      catchError((err:HttpErrorResponse) => this.handleDate(err))
    );
  }

  private handleDate(
    event: HttpResponse<any> | HttpErrorResponse
  ):Observable<any> {
    
    switch (event.status) {
      case 200:
        if (event instanceof HttpResponse) {}
        break;
      case 401:
      case 403:
      case 404:
      case 500:
        console.log(event);
        break;
      default:
        if (event instanceof HttpErrorResponse) {
          console.warn('未可知错误，大部分是由于后端不支持CORS或无效配置引起',
          event,);
        }
        break;
    }
    return of(event);
  }
}