import React, { useEffect, useState } from "react";
import {
  TextField,
  Typography,
  Avatar,
  Grid,
  FormControl,
  Select,
  MenuItem,
  Stack,
  SelectChangeEvent,
  OutlinedInput,
  IconButton,
  useMediaQuery
} from "@mui/material";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { JsonData } from "../utils/types";
import DeleteModal from "./DeleteModal";
import { capitalizeFLetter, getAgeOfCelebrities } from "../utils/helper";
import { useDispatch } from "react-redux";
import { getData } from "../redux/slice/userSlice";
import SnackbarMUI from "./SnackbarMUI";

interface AccordionComponentProps {
  data: JsonData[],
  setFilteredData:any
}

const options = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'transgender', label: 'Transgender' },
  { value: 'rather not say', label: 'Rather not say' },
  { value: 'other', label: 'Other' },
];

const AccordionComponent: React.FC<AccordionComponentProps> = ({data,setFilteredData}) => {
  const isMobile = useMediaQuery('(max-width: 600px)');
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const [editState, setEditState] = useState<Record<number, boolean>>({});
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false)
  const [error, setError] = useState<string>('');
  const [id, setId] = useState<number | null>(null);
  const [open, setOpen] = React.useState(false);
  const [selectedGender, setSelectedGender] = useState<string>('');
  const [isSuccessSnackbar, setIsSucessSnackbar] = useState<boolean>(false)
  const [formData, setFormData] = useState<JsonData>({
    id: 0,
    first: '',
    country: '',
    description: '',
    gender: '',
    last: '',
    dob: '',
    email: '',
    picture: '',
  });
  const [isEditing, setIsEditing] = useState<boolean>(false); // New state for edit mode
  console.log(data, "data")

  const dispatch = useDispatch();


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, id: number) => {
    setDisabled(true);
    const { name, value } = e.target;
    let newValue = value;
    let errorMessage = '';
  
    if (name === 'dob') {
      newValue = value.replace(/\D/g, '');
      if (newValue !== value || newValue.length > 2) {
        errorMessage = 'only digits are allowed';
      } 
    } else if (name === 'country') {
      newValue = value.replace(/[^a-zA-Z ]/g, '');
      if (newValue !== value) {
        errorMessage = 'Numeric characters are not allowed';
      }
    }
  
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: newValue,
    }));
  
    if (errorMessage) {
      setError(errorMessage);
      setOpen(true);
    } else {
      setError('');
      setOpen(false);
    }
  };
  

  
  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    if (!isEditing) {
      setExpanded(isExpanded ? panel : false);
    }
  };

  const handleEditTextField = (id: number) => {
    setEditState((prevState) => ({ ...prevState, [id]: true }));
    const editData = data.find((item) => item.id === id);
    setId(id);
    if (editData) {
      setFormData(editData);
      setIsEditing(true); // Set editing mode to true
    }
  };

  const handleClickToCancel = (id: number) => {
    setEditState((prevState) => ({ ...prevState, [id]: false }));
    setIsEditing(false); // Set editing mode to false
  };

  const handleDelete = (id: number) => {
    setIsDeleteModalOpen(true);
    setId(id);
  };

  const onCloseModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleConfirmDelete = () => {

    console.log("deleted clicked")
    if (id) {
      const filteredDataAfterDelete = data?.filter((item) => item.id !== id);
      setFilteredData(filteredDataAfterDelete);
     
      dispatch(getData(filteredDataAfterDelete));
    }
    console.log("deleted dispatch")

    onCloseModal();
  };

  const handleGenderChange = (event: SelectChangeEvent) => {
    setDisabled(true)
    setSelectedGender(event.target.value as string);
  };

  const handleClickToSaveDetails = () => {
    if (formData.country !== '' && formData.description !== '' && formData.first !== '' && formData.dob) {
      const userIndex = data.findIndex((user) => user.id === id);
      if (userIndex !== -1) {
        const updatedUsers = [
          ...data.slice(0, userIndex),
          { ...data[userIndex], ...formData, gender: selectedGender },
          ...data.slice(userIndex + 1),
        ];
        dispatch(getData(updatedUsers));
        setEditState((prevState) => ({ ...prevState, [id as any]: false }));
        setIsEditing(false);
        setDisabled(false)
        setIsSucessSnackbar(true)
        setError('User Details Updated')
      }
    } else {
      setOpen(true);
      setError('Please fill all fields...');
    }
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    setIsSucessSnackbar(false)
    setError('')
  };

  useEffect(() => {
    if (formData.gender !== '') {
      setSelectedGender(formData.gender);
    }
  }, [formData.gender]);
  return (
    <>
      {
        data.map((item, index) => {
          const ageOfUser = getAgeOfCelebrities(formData?.dob)
          return (
            <>
              <Accordion
                key={index}
                expanded={expanded === `panel-${item.id}`}
                onChange={handleChange(`panel-${item.id}`)}
                sx={{ borderRadius: '12px', margin: 1, border: '1px solid lightgray' }}
              >
                <AccordionSummary
                  expandIcon={expanded === `panel-${item.id}` ? <RemoveIcon /> : <AddIcon />}
                  aria-controls={`panel-${item.id}-content`}
                  id={`panel-${item.id}-header`}
                >
                  <Typography sx={{ width: isMobile ? '25%' : '12%', flexShrink: 0 }}>
                    <Avatar src={item.picture} sx={{ width: 56, height: 56 }} />
                  </Typography>
                  {
                    editState[item.id] ?
                      <TextField
                        id="name"
                        variant="outlined"
                        name="first"
                        value={formData.first}
                        onChange={(e) => handleInputChange(e, item.id)}
                        inputProps={{
                          "aria-readonly": true
                        }}
                      /> : <Typography
                        fontSize={18}
                        fontWeight={'bold'}
                        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                      >{`${item.first} ${item.last}`}</Typography>
                  }
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                      <label style={{ color: 'gray', marginBottom: 5 }}>Age</label>
                      {
                        !editState[item.id] ?
                          <Typography>
                            {`${item.dob} Years`}
                          </Typography> : <TextField
                            fullWidth
                            id="dob"
                            name="dob"
                            variant="outlined"
                            inputProps={{ maxLength: 2 }}
                            onChange={(e) => handleInputChange(e, item.id)}
                            value={formData.dob}
                          />
                      }
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <FormControl fullWidth variant="outlined">
                        <label style={{ color: 'gray', marginBottom: 5 }}>Gender</label>
                        {
                          !editState[item.id] ?
                            <Typography>
                              {capitalizeFLetter(item.gender)}
                            </Typography> : <><Select
                              labelId="gender-label"
                              id="gender"
                              name="gender"
                              value={selectedGender}
                              onChange={handleGenderChange}
                            >
                              {options.map(option => (
                                <MenuItem key={option.value} value={option.value}>
                                  {option.label}
                                </MenuItem>
                              ))}
                            </Select>
                            </>
                        }

                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <label style={{ color: 'gray', marginBottom: 5 }}>Country</label>
                      {
                        !editState[item.id] ?
                          <Typography>
                            {item.country}
                          </Typography> : <TextField
                            fullWidth
                            id="country"
                            name="country"
                            variant="outlined"
                            value={formData.country}
                            onChange={(e) => handleInputChange(e, item.id)}
                          />
                      }
                    </Grid>
                    <Grid item xs={12}>
                      <label style={{ color: 'gray', marginBottom: 5 }}>Description</label>
                      {
                        !editState[item.id] ?
                          <Typography>
                            {item.description}
                          </Typography> :
                          <OutlinedInput
                            sx={{
                              '& .css-1sqnrkk-MuiInputBase-input-MuiOutlinedInput-input::placeholder': {
                                fontSize: '12px'
                              }
                            }}
                            onChange={(e) => handleInputChange(e, item.id)}
                            name="description"
                            fullWidth
                            id="outlined-multiline-static"
                            value={formData.description}
                            multiline
                            rows={5}
                            inputProps={{ style: { fontSize: 16 } }}
                          />
                      }
                    </Grid>
                  </Grid>
                  <Stack justifyContent={'flex-end'} direction={'row'} spacing={2} marginTop={2}>
                    {!editState[item.id] ?
                      <IconButton
                        onClick={() => handleDelete(item.id)}
                      >
                        <DeleteOutlineOutlinedIcon
                          color="error"
                          fontSize="medium"
                        />
                      </IconButton>
                      : <IconButton
                        onClick={() => handleClickToCancel(item.id)}
                      >
                        <CancelOutlinedIcon
                          color="error"
                          fontSize="medium"
                        />
                      </IconButton>
                    }
                    {item.dob > '20' && !editState[item.id] ?
                      <IconButton
                        onClick={() => handleEditTextField(item.id)}
                      >
                        <CreateOutlinedIcon
                          color="primary"
                          fontSize="medium"
                        />
                      </IconButton>
                      : item.dob > '20' &&
                      <IconButton disabled={!disabled}
                        onClick={handleClickToSaveDetails}
                      >
                        <CheckCircleOutlineIcon
                          color={!disabled ? 'disabled' : 'success'}
                          fontSize="medium"
                        />
                      </IconButton>}
                  </Stack>
                </AccordionDetails>
              </Accordion>
            </>
          )
        })
      }
      <DeleteModal
        onClose={onCloseModal}
        open={isDeleteModalOpen}
        onConfirm={handleConfirmDelete}
      />
      <SnackbarMUI
        onClose={handleClose}
        severity="error"
        variant="filled"
        open={open}
        message={error}
      />
      <SnackbarMUI
        onClose={handleClose}
        severity="success"
        variant="filled"
        open={isSuccessSnackbar}
        message={error}
      />

    </>
  )
}
export default AccordionComponent