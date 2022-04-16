import { Pagination, Table as AntdTable } from "antd";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    sorter: (a: any, b: any) => a.name.first.localeCompare(b.name.first),
    render: (text: any) => (
      <span>{`${text.title} ${text.first} ${text.last}`}</span>
    ),
  },
  {
    title: "Gender",
    dataIndex: "gender",
    key: "gender",
    sorter: (a: any, b: any) => a.gender.localeCompare(b.gender),
  },
  {
    title: "Location",
    dataIndex: "location",
    key: "location",
    sorter: (a: any, b: any) => a.location.city.localeCompare(b.location.city),
    render: (text: any) => <span>{text.city}</span>,
  },
  {
    title: "Email",
    key: "email",
    dataIndex: "email",
    sorter: (a: any, b: any) => a.email.localeCompare(b.email),
  },
];

interface TableProps {
  filteredData?: any;
  page?: number;
  handlePaginationChange?: any;
}

function Table({ filteredData, page, handlePaginationChange }: TableProps) {
  return (
    <>
      <AntdTable
        columns={columns}
        dataSource={filteredData}
        pagination={false}
        style={{ marginBottom: "20px" }}
        rowKey="phone"
      />
      <Pagination
        defaultCurrent={1}
        current={page}
        total={50}
        onChange={handlePaginationChange}
      />
    </>
  );
}

export default Table;
