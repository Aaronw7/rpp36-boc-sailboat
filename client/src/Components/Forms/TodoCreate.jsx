import React from 'react';
import { useFormik, useField } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import CategoryCreate from './CategoryCreate.jsx';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const TodoCreate = (props) => {

  const formik = useFormik({
    initialValues: {
      userID: props.userID,
      taskName: '',
      start: '',
      end: '',
      category: 0,
      description: '',
      completed: false,
      appointment: false
    },
    validationSchema: Yup.object({
      taskName: Yup.string()
        .required('Required'),
      category: Yup.string()
        .required('Required')
    }),
    onSubmit: values => {
       axios.post('/todo', values)
       .then(props.handleTodo)
    },
  });

  let categoryModal
  if (props.showModal) {
    categoryModal = <CategoryCreate userID={props.userID} handleClick={props.handleCategorySubmit} close={props.handleClick}/>
  }

  return(
    <>
  <form onSubmit={formik.handleSubmit} class="todo-form">
    <div>
      <label htmlFor="taskName">Task Name </label>
      <input
      id="taskName"
      name="taskName"
      type="text"
      class="input"
      onChange={formik.handleChange}
      value={formik.values.taskName}
      />
      {formik.touched.taskName && formik.errors.taskName ? (
      <div>{formik.errors.taskName}</div>
      ) : null}
    </div>

    <div>
      <label htmlFor="start">Start </label>
      <input
      id="start"
      name="start"
      type="datetime-local"
      class="input"
      onChange={formik.handleChange}
      value={formik.values.start}
      />
    </div>

    <div>
      <label htmlFor="end">End </label>
      <input
      id="end"
      name="end"
      type="datetime-local"
      class="input"
      onChange={formik.handleChange}
      value={formik.values.end}
      />
    </div>

    <Box sx={{width: 360, marginTop: '20px'}}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={5}
          label="Age"
          value={formik.values.category}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        >
          {props.categories.map((option, i) => {
            return (
              <MenuItem value={option.value} label={option.key} key={i}/>
            )
          })}
        </Select>
      </FormControl>
    </Box>
    <button type="button" onClick={props.handleClick}>Add Category</button>


    {/* <div>
      <label htmlFor="category">Category </label>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="category">Category2</InputLabel>
          <select
            labelId="category"
            id="category"
            name="category"
            // class="input"
            value={formik.values.category}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            // style={{ display: "block" }}
          >
            {props.categories.map((option, i) => {
              return (
                <option value={option.value} label={option.key} key={i}/>
              )
            })}
          </select>
        </FormControl>
      </Box>
      <button type="button" onClick={props.handleClick}>Add Category</button>
    </div> */}

    <div>
      <label htmlFor="description">Description </label>
      <textarea
      id="description"
      name="description"
      class="description-input"
      onChange={formik.handleChange}
      value={formik.values.description}
      />
    </div>

    <button type="submit">Submit</button>
  </form>
  {categoryModal}
  </>
  )
}

export default TodoCreate;