import { Alert, Button, FormControl, FormLabel, HStack, Input, VStack,Text,AlertIcon,AlertTitle,AlertDescription} from '@chakra-ui/react';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Connexion = () => {

    const navigate=useNavigate();

    const [user,setUser]=useState({
        email:"",
        password:""
    })
    const [isLogin,setIsLogin]=useState(false)
    const [formIsLoad,setFormIsLoad]=useState(false)
    const [loginError,setLoginError]=useState(false)
    const [loginErrorMessage,setLoginErrorMessage]=useState("")
    var token=""

    


    const handleSubmit= async ()=>{
        setFormIsLoad(true)
        //console.log(user)
        await axios.post("https://exam.dmdsatis.com/public/api/auth/login",user).then((res)=>{  
                    console.log(res.data)
                   if(res.statusText=="OK"){
                        token=`Bearer `+res.data.access_token
                        localStorage.setItem("token",token)
                        localStorage.setItem("email",res.data.email)
                        setIsLogin(true)
                        setLoginError(true)
                        navigate("/home")   
                    }
                   setFormIsLoad(false)
        }).catch((error)=>{
            setFormIsLoad(false)
            setLoginError(true)
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
    
        <VStack border='1px solid red' borderR alignItems="center" justifyContent={"center"} h='100vh'>
            {
                isLogin? <HStack w={["80%","70%" ,"30%","30%","30%"]} >
                            <Alert status='success' w='100%'>
                                <AlertIcon/>
                                <Text>Connexion R&eacute;ussie</Text>
                            </Alert>
                        </HStack>:<HStack w="30%"></HStack>
            }

            {
              loginError?<HStack w={["80%","70%" ,"30%","30%","30%"]} >
                            <Alert status='error'>
                                <AlertIcon />
                                <AlertTitle>Erreur !</AlertTitle>
                                <AlertDescription><Text>Email ou mot de passe incorrect</Text></AlertDescription>
                            </Alert>
                        </HStack>:<HStack></HStack>
            }
            
            <VStack w={["80%","70%" ,"60%","30%","30%"]} p={8} spacing={4}  rounded={"lg"} bg="blue.50">
               <FormControl>
                <FormLabel>Email</FormLabel>
                <Input name='email'  bg="#fff" p={4} type="email" onChange={(ev)=>setUser({...user,email:ev.target.value})} />
               </FormControl>
               <FormControl>
                <FormLabel>Mot de passe</FormLabel>
                <Input name="password" type="password" bg="#fff" p={4}  onChange={(ev)=>setUser({...user,password:ev.target.value})}/>
               </FormControl>
               <HStack w='full' justifyContent={"center"}>
                    {formIsLoad ? <Button isLoading onClick={handleSubmit} bgColor='#0A5EFC' color="#fff" w='full' p={4}>Se connecter</Button> : <Button onClick={handleSubmit} bgColor='#0A5EFC' color="#fff" w='full' p={4}>Se connecter</Button>}
               </HStack>
            </VStack>
        </VStack>
    );
};

export default Connexion;