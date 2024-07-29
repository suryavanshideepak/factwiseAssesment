import React, { useEffect, useState } from "react";
import { Container, Grid, InputAdornment, TextField, Typography } from "@mui/material";
import AccordionComponent from "../components/AccordionComponent";
import SearchIcon from '@mui/icons-material/Search';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { getData } from "../redux/slice/userSlice";
import { getAgeOfCelebrities } from "../utils/helper";
import { demoData } from "../utils/data";

const initializeData = () => {
  return demoData.map((item) => ({
    id: item.id,
    first: item.first,
    country: item.country,
    description: item.description,
    gender: item.gender,
    last: item.last,
    dob: getAgeOfCelebrities(item.dob),
    email: item.email,
    picture: item.picture,
  }));
};

const CelebrityList = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const data = useSelector((state: RootState) => state.todos.celebrityData);
  const dispatch = useDispatch();
  const [filteredData, setFilteredData] = useState(initializeData());

  const handleSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
  };

  useEffect(() => {
    if (data.length === 0) {
      const initialData = initializeData();
      dispatch(getData(initialData));
    }
  }, [data.length, dispatch]);

  useEffect(() => {
    const newFilteredData = searchQuery.trim() === ''
      ? data
      : data.filter((item) =>
          `${item.first} ${item.last}`.toLowerCase().includes(searchQuery)
        );
    setFilteredData(newFilteredData);
  }, [searchQuery, data]);

  return (
    <Container
      maxWidth="lg"
      style={{
        backgroundColor: "var(--background-color)",
        color: "var(--text-color)",
      }}
    >
      <Typography variant="h4" component="h1" paddingTop={5} gutterBottom>
        Celebrities
      </Typography>
      <Grid item sm={12}>
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          value={searchQuery}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          onChange={handleSearchQuery}
        />
      </Grid>
      <AccordionComponent data={filteredData} setFilteredData={setFilteredData} />
    </Container>
  );
};

export default CelebrityList;
