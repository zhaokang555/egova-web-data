import ServiceBase from "src/services/service-base";
import flagwind from "flagwind-core";
import moment from "moment";
@flagwind.injectable()
export default class Service extends ServiceBase {
    public getTopEightNums() {
        return this._get<{ result: any }>("/datastream/total");
    }

    public getTodayCompanyData() {
        return this._get<{ result: any }>("/datastream/detail?dataStr=" + moment().format("YYYYMMDD"));
    }

    public getFlow() {
        return this._get<{ result: any }>("/datastream/sheet");
    }

    public getRecent(type: string) {
        return this._get<{ result: any }>("/datastream/recent?type=" + type);
    }

    public getTableData(day: string) {
        return this._get<{ result: any }>("/datastream/detail?datastr=" + day);
    }
}
