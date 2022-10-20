import { Button, FormControl, FormLabel, Input, Select, Text, Textarea, VStack } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState,useEffect } from 'react';

const Register = () => {
    const [user,SetUser]=useState({
        Nom:"",
        Prenoms:"",
        Email:"",
        Datenais:"",
        sexe:"",
        categorie:"",
        objet:"",
        description:""
    })

    const [cats,setCats]=useState([])
    const [objs,setObjs]=useState([])
    const [token,setToken]=useState("")
    var config={
        headers:{Authorization:token} 
    }
    
    useEffect(()=>{
            axios.post("https://exam.dmdsatis.com/public/api/auth/login",{
                email:'agent@agent.fr',
                password:'agentpwd'
            }).then((res)=>{
               
            setToken(`Bearer `+res.data.access_token)
                axios.get("https://exam.dmdsatis.com/public/api/cats",config)
                    .then((res)=>{
                        setCats(res.data.items)
                        console.log(cats) 
            }) 

               
        }) 

    },[])
    
    const handleChange =(evt)=>{
        const {name ,value} =evt.target
        SetUser({...user,[name]:value})
        if(name=="Datenais"){
            console.log(value)
            const date= new Date(value).toLocaleDateString("en-US")
            SetUser({...user,Datenais:date})
        }

        if(name=="categorie"){
            axios.get("https://exam.dmdsatis.com/public/api/cats/"+value+"/objs",config)
            .then((res)=>{ 
                setObjs(res.data.items)
                 console.log(res.data.items)
            }) 
        }
        console.log(user)
    }

    

    return (
      <VStack justifyContent='center' h='100vh' border='1px solid black' spacing="20" >
            <VStack w='40%' bgColor='blue.50' p='10'>
                <FormControl>
                    <FormLabel>Nom</FormLabel>
                    <Input bgColor="#ffffff" onChange={(evt)=> handleChange(evt)} name='Nom'  />
                </FormControl>
                <FormControl> 
                    <FormLabel>Prenoms</FormLabel>
                    <Input bgColor="#ffffff" onChange={(evt)=> handleChange(evt)} name='Prenoms'   />
                </FormControl>
                <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input bgColor="#ffffff" onChange={(evt)=> handleChange(evt)} name='Email'  type='email' />
                </FormControl>
                <FormControl>
                    <FormLabel>Date de naissance</FormLabel>
                    <Input bgColor="#ffffff" onChange={(evt)=> handleChange(evt)} name='Datenais'  type='date'  />
                </FormControl>
                <FormControl>
                    <FormLabel>Sexe</FormLabel>
                    
                    <Select name='sexe' onChange={(evt)=> handleChange(evt)} bgColor="#ffffff"  placeholder='Sexe' >
                        <option value='Masculin'>Masculin</option>
                        <option value='Feminin'>Feminin</option>
                        <option value='Autre'>Autre</option>
                    </Select>
                </FormControl>
                <FormControl>
                    <FormLabel>Categorie de requete</FormLabel>
                    <Select name='categorie' onChange={(evt)=> handleChange(evt)} bgColor="#ffffff"  >
                     { cats.map((cat,i)=>{
                            return <option key={i} value={cat.slug} > {cat.name} </option>
                       })
                      }
                    </Select>
                </FormControl>
                <FormControl>
                    <FormLabel>Objet de requete</FormLabel>
                      <Select name='objet' bgColor="#ffffff" onChange={(evt)=> handleChange(evt)} >
                        {
                            objs.map((obj,i)=>{
                                return <option  key={i} value={obj.slug}> {obj.name} </option>
                            })
                        }
                      </Select>
                </FormControl>
                <FormControl>
                    <FormLabel>Description</FormLabel>
                    <Textarea 
                    onChange={(evt)=> handleChange(evt)}
                    bgColor="#ffffff" 
                     size='sm'
                     name='description'
                     
                    />
                </FormControl>
                <FormControl>
                    <Button w='100%' bgColor='blue.900' color='#ffffff'><Text>Enregistrer</Text></Button>
                </FormControl>
            </VStack>
      </VStack>
    );
};

export default Register;