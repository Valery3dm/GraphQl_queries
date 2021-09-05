import React, {useEffect, useState} from 'react';

import { useMutation, useQuery } from '@apollo/client';

import { ButtonGroup, Button, makeStyles, TextField, Box } from '@material-ui/core';

import { GET_ALL_USERS, GET_ONE_USER } from './query/user';
import { CREATE_USER } from './mutations/users';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    maxWidth: 450
  },
  fieldWrapper: {
    padding: 10
  },
  textFieldWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: 20
  },
  wrapperAll: {
    border: 'solid 1px black',
    boxShadow: '4px 4px 8px 0px rgba(34, 60, 80, 0.2)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonWrapper: {
    paddingBottom: 20
  },
  userWrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 10,
    padding: 10,
    border: 'solid 1px black',
    boxShadow: '4px 4px 8px 0px rgba(34, 60, 80, 0.2)'
  }
}));

const App = () => {
  const classes = useStyles();
  const {data, loading, refetch} = useQuery(GET_ALL_USERS);
  const {data: oneUser, loading: loadingOneUser} = useQuery(GET_ONE_USER, {
    variables: {
      id: 1
    }
  });
  const [newUser] = useMutation(CREATE_USER);
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [age, setAge] = useState('');
  

  useEffect(() => {
    if(!loading) {
      setUsers(data.getAllUsers)
    }
  }, [data, loading]);

  const addUser = e => {
    e.preventDefault()
    newUser({
      variables: {
        input: {
          username, age
        }
      }
    }).then(({data}) => {
      console.log(data);
      setUsername('');
      setAge(0);
    })
  }

  const getAll = e => {
    e.preventDefault();
    refetch();
  }

  if(loading) {
    return <h1>Loading...</h1>
  }

  return (
    <div className={classes.root}>
      <Box className={classes.wrapperAll}>
        <form className={classes.textFieldWrapper} noValidate autoComplete="off">
          <TextField
            id="outlined-basic"
            label="Your name:"
            variant="outlined"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className={classes.fieldWrapper}
          />
          <TextField
            id="outlined-basic"
            label="Your age:"
            variant="outlined"
            value={age}
            onChange={e => setAge(e.target.value)}
            className={classes.fieldWrapper}
          />
        </form>
        <ButtonGroup className={classes.buttonWrapper} size="large" color="primary" aria-label="large outlined primary button group">
          <Button onClick={e => addUser(e)}>Create</Button>
          <Button onClick={e => getAll(e)}>Get</Button>
        </ButtonGroup>
      </Box>
      <div className="listWrapper">
        {users.map(user =>
          <div key={user.id} className={classes.userWrapper}>
            {user.id} {user.username} {user.age}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
