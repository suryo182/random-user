import { Button, Input, Select, Spin } from "antd";
import React, { useContext, useEffect, useState } from "react";
import Table from "./components/Table";
import { StoreContext } from "./context/stores/storeContext";
import { Container, Label, NavWrapper } from "./styles";
import debounce from "./utils/debouce";

const { Search } = Input;
const { Option } = Select;

function App() {
  const { state, actions } = useContext(StoreContext);
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [searchGender, setSearchGender] = useState<string>("");
  const [filteredData, setFilteredData] = useState<string>("");

  useEffect(() => {
    if (actions) {
      const fetchUserData = async () =>
        await actions.userDataActions.fetchData({ page, results: 10 });
      fetchUserData();
    }
  }, []); // eslint-disable-line

  useEffect(() => {
    if (state.userDataStates.list.length > 0) {
      setFilteredData(state.userDataStates.list);
    }
  }, [state]);

  useEffect(() => {
    if (search && searchGender && actions) {
      const fetchUserData = async () =>
        await actions.userDataActions.fetchData({
          page,
          results: 10,
          keyword: search,
          gender: searchGender,
        });
      const debouncedMultiFilter = debounce(fetchUserData, 200);
      debouncedMultiFilter();
    } else if (search && actions) {
      const fetchUserData = async () =>
        await actions.userDataActions.fetchData({
          page,
          results: 10,
          keyword: search,
        });
      const debouncedFilter = debounce(fetchUserData, 200);
      debouncedFilter();
    } else if (searchGender && actions) {
      const fetchUserData = async () =>
        await actions.userDataActions.fetchData({
          page,
          results: 10,
          gender: searchGender,
        });
      const debouncedSearchGender = debounce(fetchUserData, 200);
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
    setSearch("");
    setSearchGender("");
  };

  const handleResetFilter = () => {
    const fetchUserData = async () =>
      await actions.userDataActions.fetchData({ page, results: 10 });
    fetchUserData();
    setSearch("");
    setSearchGender("");
  };

  return (
    <Container>
      <NavWrapper>
        <div>
          <Label>Search</Label>
          <Search
            id="search"
            type="text"
            placeholder="input search text"
            onSearch={handleSearchName}
            enterButton
            style={{ width: "300px" }}
          />
        </div>
        <div>
          <Label>Gender</Label>
          <Select
            id="gender"
            style={{ width: "300px", marginRight: "12px" }}
            onChange={handleFilterGender}
            value={searchGender}
          >
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
          </Select>
          <Button style={{ width: "150px" }} onClick={handleResetFilter}>
            Reset Filter
          </Button>
        </div>
      </NavWrapper>
      {state && state.loadingStates && state.loadingStates.loading ? (
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
