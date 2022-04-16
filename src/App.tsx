import { Button, Input, Select, Spin } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import Table from './components/Table';
import { StoreContext } from './context/stores/storeContext';
import { Container, Label, NavWrapper } from './styles';
import debounce from './utils/debouce';

const { Search } = Input;
const { Option } = Select;

function App() {
  const { state, actions } = useContext(StoreContext);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [searchGender, setSearchGender] = useState('');
  const [filteredData, setFilteredData] = useState('');

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

  useEffect(() => {
    if (search && searchGender) {
      const fetchUserData = async () =>
        await actions.userDataActions.fetchData({
          page,
          results: 10,
          keyword: search,
          gender: searchGender,
        });
      const debouncedMultiFilter = debounce(fetchUserData, 1000);
      debouncedMultiFilter();
    } else if (search) {
      const fetchUserData = async () =>
        await actions.userDataActions.fetchData({
          page,
          results: 10,
          keyword: search,
        });
      const debouncedFilter = debounce(fetchUserData, 1000);
      debouncedFilter();
    } else if (searchGender) {
      const fetchUserData = async () =>
        await actions.userDataActions.fetchData({
          page,
          results: 10,
          gender: searchGender,
        });
      const debouncedSearchGender = debounce(fetchUserData, 1000);
      debouncedSearchGender();
    }
  }, [search, searchGender]); // eslint-disable-line

  const handleSearchName = (e: string) => {
    setSearch(e);
  };

  const handleFilterGender = (e: string) => {
    setSearchGender(e);
  };

  const handlePaginationChange = (e: number) => {
    const fetchUserData = async () =>
      await actions.userDataActions.fetchData({ page: e, results: 10 });
    fetchUserData();
    setPage(e);
  };

  const handleResetFilter = () => {
    const fetchUserData = async () =>
      await actions.userDataActions.fetchData({ page, results: 10 });
    fetchUserData();
    setSearch('');
    setSearchGender('');
  };

  return (
    <Container>
      <NavWrapper>
        <div>
          <Label>Search</Label>
          <Search
            placeholder="input search text"
            onSearch={handleSearchName}
            enterButton
            style={{ width: '300px' }}
          />
        </div>
        <div>
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
        </div>
      </NavWrapper>
      {state.loadingStates.loading ? (
        <Spin size="large" />
      ) : (
        <Table
          filteredData={filteredData}
          page={page}
          handlePaginationChange={handlePaginationChange}
        />
      )}
    </Container>
  );
}

export default App;
