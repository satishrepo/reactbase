import React, { Fragment, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { clearLocalStorage } from '../../common/services/LocalStorage'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Pagination from '@material-ui/lab/Pagination';


const ViewUser = props => {
  console.log('props view user', props)
  const [userList, setUserList] = useState([]);
  const [totalPages, setTotalPages] = useState(0)
  const { viewUserStatus, viewUserResponse, viewUserStatusCode } = props;
  const history = useHistory()

  useEffect(() => {
    loadUsers({}, 1)
  }, [])
  
  useEffect(() => {
    if (viewUserStatus === 'success') {
      setUserList(viewUserResponse.records);
      setTotalPages(Math.ceil(viewUserResponse.pagingData.total/viewUserResponse.pagingData.perPage))
    }

    if (viewUserStatusCode === 403) {
      history.push('/logout')
    }

  }, [viewUserStatus])

  const useStyles = makeStyles({
    table: {
      minWidth: 400,
    },
    root: {
      margin: '8px'
    }
  });

  const classes = useStyles();

  const deleteUser = (userId) => {
    const params = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    }
    fetch('http://localhost:3001/users/' + userId, params)
      .then(response => response.json())
      .then(result => {
        if (result.statusCode === 200) {
          const updatedUsers = userList.filter(item => item._id !== userId)
          setUserList(updatedUsers)
          props.updateUser(updatedUsers)
        }
      }, error => {
        console.log('Error occurred: ', error)
      })
  }

  const loadUsers = (event, page) => {
    const pageObj = {
      currentPage: page,
      perPage: 2
    }
    props.viewUser(pageObj);
  }

  return (
    <Fragment>
      <Container maxWidth="sm">
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userList.map((user, i) => (
                <TableRow key={user.name}>
                  <TableCell component="th" scope="row">{i+1}</TableCell>
                  <TableCell align="left">{user.name}</TableCell>
                  <TableCell align="left">{user.email}</TableCell>
                  <TableCell align="left" key={user._id.toString()}>
                    <Button variant="contained" onClick={() => deleteUser(user._id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <div className={classes.root}>
          <Pagination count={totalPages} color="primary" onChange={loadUsers} variant="outlined" shape="rounded"/>
        </div>
        
      </Container>
    </Fragment>
  )
}

export default ViewUser;