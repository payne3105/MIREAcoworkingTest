import { TimePicker, DatePicker } from "antd";

const columns = [
    {
        title: 'Number',
        dataIndex: 'key',
    },
    {
        title: 'Title',
        dataIndex: 'title',
        copyable: true
    },
    {
        title: 'Deadline',
        dataIndex: 'deadline',
        width: 150,
        align: 'center',
        sorter: (a, b) => a.deadline.localeCompare(b.deadline)
    },
]

export default columns