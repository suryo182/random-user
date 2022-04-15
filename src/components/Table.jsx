import React from 'react';
import { Pagination, Table as AntdTable } from 'antd';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <span>{`${text.title} ${text.first} ${text.last}`}</span>,
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    key: 'gender',
  },
  {
    title: 'Location',
    dataIndex: 'location',
    key: 'location',
    render: (text) => <span>{text.city}</span>,
  },
  {
    title: 'Email',
    key: 'email',
    dataIndex: 'email',
  },
];

const Table = ({ filteredData, page, handlePaginationChange }) => {
  return (
    <>
      <AntdTable
        columns={columns}
        dataSource={filteredData}
        pagination={false}
        style={{ marginBottom: '20px' }}
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
};

export default Table;
