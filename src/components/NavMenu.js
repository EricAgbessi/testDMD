import { Box, HStack, Text, VStack,Button, useToast } from '@chakra-ui/react';

import axios from 'axios';
import React from 'react';
import { AiOutlineUserSwitch,AiFillCaretRight } from "react-icons/ai";
import { BsBoxArrowRight } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';



const NavMenu = () => {
    const navigate=useNavigate();
    const agentMenu=["Acceuil","Traitement","archives"]
    const piloteMenu=["Acceuil","Collecte","Suivi des traitements","validation","reporting","archives"]
    var config={
        headers:{Authorization:localStorage.getItem("token")} 
    }
    const toast=useToast()
    const logOut= async()=>{
        
        await axios.post("https://exam.dmdsatis.com/public/api/auth/logout",localStorage.getItem("email"),config)
        .then((res)=>{
            console.log(res.statusText)
            if(res.statusText=="OK"){
                localStorage.clear()
                navigate("/")
            }
        }).catch((error)=>{
            console.log("ERROR: ", error.message)
            toast({
                title: 'ERROR.',
                description:  error.message,
                status: 'error',
                duration: 9000,
                isClosable: true,
              })
            
        })
    }

   
    const breakpoints = {
        sm: '30em',
        md: '48em',
        lg: '62em',
        xl: '80em',
        '2xl': '96em',
    }


    return (
        <VStack w="100%" borderRadius="25px" boxShadow="xl"  h="100%" justifyContent="space-between" pt="10px"  pb="20" pl="15px" bgColor="white">
          
            <Text as="b">MINI PROJET REACT</Text>
            <VStack w="100%" spacing="10" as='b'>
                <HStack bgColor="#0A5EFC" borderRadius="20" w='80%' h="40px" pl="10">
                   <AiOutlineUserSwitch fontSize="25"  color="#ffffff"/> 
                   <Text as="b" color="#ffffff">{ localStorage.getItem("email")=="agent@agent.fr"?"Agent":"Pilote" }</Text>
                </HStack>
                {
                    localStorage.getItem("email")=="agent@agent.fr"?
                    agentMenu.map((item)=>{
                        return <HStack w="60%"> <AiFillCaretRight/> <Text>{item}</Text></HStack>
                    }):piloteMenu.map((item)=>{
                        return <HStack w="60%"> <AiFillCaretRight/> <Text>{item}</Text></HStack>
                    })

                }
            </VStack>
            <HStack><Button onClick={logOut}><BsBoxArrowRight /><Text as="b">Logout</Text></Button></HStack>
        </VStack>
    );
};

export default NavMenu;