import {
    Pagination,
    Dialog,
    Button,
    Table,
    TableColumn,
    Popover,
    Loading,
    Message,
    MessageBox,
    Autocomplete,
    Notification,
    Form,
    FormItem,
    Input,
    InputNumber,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Row,
    Col,
    DatePicker,
    Scrollbar,
    Collapse,
    CollapseItem,
} from 'element-ui';
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';

const element = {
    install: function (Vue) {
        Vue.use(Pagination)
        Vue.use(Dialog)
        Vue.use(Button)
        Vue.use(Table)
        Vue.use(TableColumn)
        Vue.use(Dialog)
        Vue.use(Popover)
        Vue.use(Loading.directive)
        Vue.use(Autocomplete)
        Vue.use(Form)
        Vue.use(FormItem)
        Vue.use(Input)
        Vue.use(InputNumber)
        Vue.use(Dropdown)
        Vue.use(DropdownMenu)
        Vue.use(DropdownItem)
        Vue.use(Row);
        Vue.use(Col);
        Vue.use(DatePicker);
        Vue.use(Scrollbar);
        Vue.use(Collapse);
        Vue.use(CollapseItem);
        Vue.prototype.$loading = Loading.service
        Vue.prototype.$messageBox = MessageBox
        Vue.prototype.$alert = MessageBox.alert
        Vue.prototype.$confirm = MessageBox.confirm
        Vue.prototype.$prompt = MessageBox.prompt
        Vue.prototype.$notify = Notification
        Vue.prototype.$message = Message
        Vue.component(CollapseTransition.name, CollapseTransition)
    }
}

export default element