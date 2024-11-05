import { useContext } from 'react';
import { UserContext } from './UserContext';

const UserProfile = (props) => {
  const userName = useContext(UserContext);
    return (
      <div>
        <h2>{props.name}</h2>
        <p>Age: {props.age}</p>
        <p>Bio: {props.bio}</p>
        <h4>User Details</h4>
      <p>Name: {userName}</p>
      </div>
    );
  };

  export default UserProfile;