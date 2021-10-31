//dependencies
import { useContext } from 'react';
import { v4 } from 'uuid';
//context
import UserContext from '../../context/user-context.js';
//material
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';


const options = [
    {key: v4(), text: 'Logout', icon: '', link: '/'},
]

const Logout = () => {

  const { logoutUser } = useContext(UserContext);

    return (
      <>
        <List>
          {options.map((option) => (
            <ListItem button key={option.text} onClick={logoutUser}>
              <ListItemIcon>
                {option.icon}
              </ListItemIcon>
              <ListItemText primary={option.text} />
            </ListItem>
          ))}
        </List>
      </>
    )
}

export default Logout;