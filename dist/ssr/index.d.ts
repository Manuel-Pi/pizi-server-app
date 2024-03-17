import "./main.less";
import { IServerApi } from "./utils/Utils";
declare global {
    const io: any;
    const API: IServerApi;
}
