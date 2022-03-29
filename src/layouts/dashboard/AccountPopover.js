import { useRef, useState, useEffect } from 'react';
 
// material
import { alpha } from '@mui/material/styles';
import { Button, Box, Divider, MenuItem, Typography, Avatar, IconButton } from '@mui/material';
// components
import Iconify from '../../components/Iconify';
import MenuPopover from '../../components/MenuPopover';
//
import account from '../../_mocks_/account';
import firebase from './../../firebase'
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Home',
    icon: 'eva:home-fill',
    linkTo: '/'
  },
  {
    label: 'Profile',
    icon: 'eva:person-fill',
    linkTo: '#'
  },
  {
    label: 'Settings',
    icon: 'eva:settings-2-fill',
    linkTo: '#'
  }
];


// ----------------------------------------------------------------------

export default function AccountPopover() {
  const anchorRef = useRef(null);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
const [user, setuser] = useState(null)
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  
  useEffect(() => {
    firebase.firestore().collection("users").where("email", "==", firebase.auth().currentUser.email).get().then((snap)=>{
      const contacts_ = [];
      snap.docs.forEach(document => {
        const contact_ = {
          id: document.id,
          ...document.data()
        }
        contacts_.push(contact_)
      })
      setuser(contacts_)
      
    })
  }, [])
  
  console.log(user)

  const logout = () =>{
    firebase.auth().signOut().then(()=>{
      navigate('/');
    })
  }
  
  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72)
            }
          })
        }}
      >
        <Avatar src={account.photoURL} alt="photoURL" />
      </IconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 220 }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle1" noWrap>
            {user[0].username}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {user[0].email}
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

    

        <Box sx={{ p: 2, pt: 1.5 }}>
          <Button fullWidth color="inherit" onClick={()=>logout()} variant="outlined">
            Logout
          </Button>
        </Box>
      </MenuPopover>
    </>
  );
}
