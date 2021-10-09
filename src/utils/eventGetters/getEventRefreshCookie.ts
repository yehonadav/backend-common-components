import {getEventCookie} from "./getEventCookies";
import {LambdaEvent} from "../../types";

export const getEventRefreshCookie = (event: LambdaEvent):string => getEventCookie(event, "refreshToken");