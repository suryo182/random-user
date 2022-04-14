import { Input, Select, Button, Table, Spin, Pagination } from 'antd';
import styled from 'styled-components';
import { StoreContext } from './context/stores/storeContext';
import React, { useContext, useEffect, useState } from 'react';

const { Search } = Input;
const { Option } = Select;

const Container = styled.div`
  margin: 5rem auto 0;

  @media (min-width: 768px) {
    max-width: 768px;
  }

  @media (min-width: 1024px) {
    max-width: 1024px;
  }

  @media (min-width: 1280px) {
    max-width: 1280px;
  }

  @media (min-width: 1536px) {
    max-width: 1536px;
  }
`;

const NavWrapper = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const Label = styled.span`
  display: block;
`;

const SearchWrapper = styled.div``;

const FilterGenderWrapper = styled.div``;

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

function App() {
  const { state, actions } = useContext(StoreContext);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [searchGender, setSearchGender] = useState('');
  const [filteredData, setFilteredData] = useState();

  useEffect(() => {
    const fetchUserData = async () =>
      await actions.userDataActions.fetchData({ page, results: 10 });
    fetchUserData();
  }, []); // eslint-disable-line

  useEffect(() => {
    if (state.userDataStates.list.length > 0) {
      setFilteredData(state.userDataStates.list);
    }
  }, [state.userDataStates.list]);

  const handleSearchName = (e) => {
    setSearch(e);
  };

  const handleFilterGender = (e) => {
    setSearchGender(e);
    console.log(e);
  };

  const handlePaginationChange = (e) => {
    const fetchUserData = async () =>
      await actions.userDataActions.fetchData({ page: e, results: 10 });
    fetchUserData();
    setPage(e);
  };

  const handleResetFilter = () => {
    setSearch('');
    setSearchGender('');
  };

  const data = search
    ? filteredData.filter((el) => {
        const clonedEl = { ...el };
        return clonedEl.name.first.toLowerCase().includes(search);
      })
    : searchGender
    ? filteredData.filter((el) => {
        const clonedEl = { ...el };
        return clonedEl.gender.toLowerCase() === searchGender;
      })
    : state.userDataStates.list;

  return (
    <Container>
      <NavWrapper>
        <SearchWrapper>
          <Label>Search</Label>
          <Search
            placeholder="input search text"
            onSearch={handleSearchName}
            enterButton
            style={{ width: '300px' }}
          />
        </SearchWrapper>
        <FilterGenderWrapper>
          <Label>Gender</Label>
          <Select
            style={{ width: '300px', marginRight: '12px' }}
            onChange={handleFilterGender}
            value={searchGender}
          >
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
          </Select>
          <Button style={{ width: '150px' }} onClick={handleResetFilter}>
            Reset Filter
          </Button>
        </FilterGenderWrapper>
      </NavWrapper>
      {state.loadingStates.loading ? (
        <Spin size="large" />
      ) : (
        <div>
          <Table
            columns={columns}
            dataSource={data}
            pagination={false}
            style={{ marginBottom: '20px' }}
          />
          <Pagination
            defaultCurrent={1}
            current={page}
            total={50}
            onChange={handlePaginationChange}
          />
        </div>
      )}
    </Container>
  );
}

export default App;
