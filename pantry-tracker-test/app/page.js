'use client'
import Image from "next/image";
//import styles from "./page.module.css";
import { Box, Stack, Typography, Button, Modal, TextField, CircularProgress, Backdrop } from "@mui/material";
import { firestore } from "@/firebase";
import { collection, getDocs, query, setDoc, doc, deleteDoc, getDoc  } from "firebase/firestore";
import { useState, useEffect } from "react";
import { update } from "firebase/database";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Home() {
  const [pantry, setPantry] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [itemName, setItemName] = useState('')

  const updatePantry = async () => {
    const snapshot = query(collection(firestore, 'pantry'));
    const docs = await getDocs(snapshot);
    const pantryList = [];
    docs.forEach((doc) => {
      pantryList.push({name: doc.id, ...doc.data()});
    });
    console.log(pantryList);
    setPantry(pantryList);
  };

  useEffect(() => {
    updatePantry();
  }, []);

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'pantry'), item)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const {count} = docSnap.data()
      await setDoc(docRef, {count: count + 1})
      await updatePantry()
      return
    }
    else{
      await setDoc(docRef, {count:1})
      await updatePantry()
    }
  }

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'pantry'), item)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const {count} = docSnap.data()
      if (count === 1){
        await deleteDoc(docRef, {})
      }
      else{
        await setDoc(docRef, {count: count - 1})
      }
    }
    await updatePantry()
  }
  return (
    <Box
      width="100vw"
      height={"100vh"}
      display={'flex'}
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"column"}
      gap={"5px"}
      //bgcolor={""}
    >
      <Box border={"solid"} borderColor={"black"}>
        <Box
          borderBottom={"solid"}
          width={"800px"}
          marginBottom={"10px"}
          height={"77px"}
          bgcolor={"lightblue"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Typography
            variant="h2"
            color={"black"}
            textAlign={"center"}
            fontFamily={"serif"}
          >
            Pantry Items
          </Typography>
        </Box>
        <Stack
          width="800px"
          height="300px"
          spacing={2}
          overflow={"auto"}
          marginBottom={"10px"}
        >
          {pantry.map(({name, count}) => (
            <Box
              key={name}
              color={"black"}
              width={"95%"}
              height="100%"
              minHeight={"100px"}
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
              paddingX={5}
              bgcolor={"lightgrey"}
              border="solid"
              alignSelf={"center"}
              
              //borderLeft={"none"}
              //borderRight={"none"}
            >
              <Typography
                variant="h4"
                color={"#333"}
                textAlign={"center"}
                justifyItems={"center"}

                //fontWeight={"bold"}
              >
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </Typography>
              <Typography
                variant="h4"
                color={"#333"}
                textAlign={"center"}
                //justifyItems={"center"}

                //fontWeight={"bold"}
              >
                Count: {count} 
              </Typography>
              <Button variant="contained" color="error" onClick={() => removeItem(name)}> Remove </Button>
            </Box>
          ))}
        </Stack>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add items
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Box display={"flex"} gap="40px">
            <TextField id="outlined-basic" label="Item" variant="outlined" 
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            />
            <Button variant="contained" width="100px" 
            onClick={() => {
              addItem(itemName)
              setItemName('')
              handleClose()
            }
          }
            >Add</Button>
            </Box>
          </Typography>
        </Box>
      </Modal>
      <Button variant="contained" color="warning" onClick={handleOpen}>
        Add items
      </Button>
    </Box>
  );
}
