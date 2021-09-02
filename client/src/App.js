import React, {useEffect, useState} from 'react';

import { useMutation, useQuery } from '@apollo/client';

import { Button, Form } from 'react-bootstrap';

import { GET_ALL_USERS, GET_ONE_USER } from './query/user';
import { CREATE_USER } from './mutations/users';

import './App.css';

const App = () => {
  const {data, loading, error, refetch} = useQuery(GET_ALL_USERS, {pollInterval: 500});
  const {data: oneUser, loading: loadingOneUser} = useQuery(GET_ONE_USER, {
    variables: {
      id: 1
    }
  });
  const [newUser] = useMutation(CREATE_USER);
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [age, setAge] = useState(0);

  console.log(oneUser);

  useEffect(() => {
    if(!loading) {
      setUsers(data.getAllUsers)
    }
  }, [data]);

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
    <div className="App">
      <Form className="formWrapper">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Your name:</Form.Label>
          <Form.Control
            value={username}
            type="text"
            placeholder="Enter name"
            onChange={e => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Your age:</Form.Label>
          <Form.Control value={age} type="number" placeholder="Enter age" onChange={e => setAge(e.target.value)} />
        </Form.Group>
          <div className="buttonsWrapper">
            <Button variant="outline-dark" onClick={e => addUser(e)}>Create</Button>
            <Button variant="outline-dark" onClick={e => getAll(e)}>Get</Button>
          </div>
      </Form>
      <div calssName="listWrapper">
        {users.map(user => 
          <div key={user.id} className="user">
            {user.id} {user.username} {user.age}
          </div>  
        )}
      </div>
    </div>
  );
}

export default App;
