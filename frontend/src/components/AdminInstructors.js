import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import { useSelector  } from "react-redux";
import { Button } from "@material-ui/core";

const InstructorTable = () => {

  const allInstructors = useSelector((state)=> state.admin.allInstructors)
  const [textVal, setTextVal] = useState('')
  const [filteredInstructors, setFilteredInstructors] = useState([])

  useEffect(()=> {
    setFilteredInstructors(allInstructors)
  },[allInstructors])
  
  const handlePayment = ()=> {
    alert("Raj tu hi jeeta sakta hai hame ye hackathon")
  }

  const onChange = (value) => {
    const searchVal = value.toLowerCase();
    let regex = new RegExp(searchVal, "g");
    const byInstructorName = allInstructors.filter((instructor) => {
      if(instructor.teacher.name) {
        return instructor.teacher.name.toLowerCase().match(regex)
      }
    }
    );
    const byEmail = allInstructors.filter((instructor) => {
      if(instructor.teacher.email) {
        return instructor.teacher.email.toLowerCase().match(regex)
      }
    }
    );
    setFilteredInstructors([...new Set([...byInstructorName, ...byEmail])]);
  };

  const columns = [
    {
      name: "Name",
      selector: (row)=> row.teacher.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row)=> row.teacher.email,
      sortable: true,
    },
    {
      name: "Number of courses",
      selector: (row) => row.count
    },
    {
      name: "Details",
      cell: (row) => (
        <Link to={`/instructor/:instructorId`}>View</Link>
      ),
    },
    {
      name: "Details",
      cell: (row) => (
        <Button variant="contained" onClick={()=>handlePayment()} style={{backgroundColor: '#7CFC00'}}> Pay</Button>
      ),
    }
  ];

  return (
    <div className="listTable">
      <form onSubmit={(e) => e.preventDefault()}>
        <TextField
          id="outlined-search"
          placeholder="Search by Name/Email"
          fullWidth
          size="small"
          type="search"
          variant="outlined"
          value={textVal}
          onChange={(e) => {
            setTextVal(e.target.value);
            onChange(e.target.value)
          }}
          InputProps={{
            startAdornment: <InputAdornment position="start"><SearchOutlinedIcon/></InputAdornment>,
          }}
        />
      </form>
      <DataTable
        title="Instructors"
        columns={columns}
        data={filteredInstructors}
        highlightOnHover={true}
        pointerOnHover={true}
        pagination={true}
        paginationPerPage={8}
      />
    </div>
  );
};

export default InstructorTable;
