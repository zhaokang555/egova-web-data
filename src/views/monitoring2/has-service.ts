import {component, View} from "flagwind-web";
import autowired from "src/annotations/autowired";
import Service from "views/monitoring2/service";

export default abstract class HasService extends View {
    @autowired(Service)
    protected service: Service;
}
