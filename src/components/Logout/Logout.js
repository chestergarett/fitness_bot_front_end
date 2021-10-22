//dependencies
import { useState, useContext } from 'react';
import { Link as BrowserLink } from 'react-router-dom';
import { v4 } from 'uuid';
//css
import classes from './Logout.module.css';
//components
import Subscriptions from '../Subscriptions/Subscriptions';
//material
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';


const options = [
    {key: v4(), text: 'Logout', icon: '', link: '/'},
]
const Logout = () => {
    // const { openModals, closeModals,  displayModal} = useContext(UserContext);
    const [displayModal, setDisplayModal] = useState(false)
    
    const openModalHandler = () => {
      setDisplayModal(true)
    }
    
    const closeModalHandler = () => {
      setDisplayModal(false)
    }

    return (
      <>
        <List>
          {options.map((option) => (
            option.text==='Subscriptions' ?
              <ListItem button key={option.key} onClick={openModalHandler}>
                <ListItemIcon>
                  {option.icon}
                </ListItemIcon>
                <ListItemText primary={option.text} />
              </ListItem> :
              <BrowserLink to={option.link}>
                <ListItem button key={option.text}>
                  <ListItemIcon>
                    {option.icon}
                  </ListItemIcon>
                  <ListItemText primary={option.text} />
                </ListItem>
            </BrowserLink>
          ))}
        </List>
        {displayModal ? <Subscriptions onClose={closeModalHandler} /> : ''}
      </>
    )
}

export default Logout;