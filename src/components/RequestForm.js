import { Button, FormControl,useToast, FormLabel, Input, Select, Text, Textarea, VStack,AlertIcon,Alert,AlertTitle,AlertDescription,CircularProgress } from '@chakra-ui/react';
import {} from "react-icons/md"
import axios from 'axios';
import React, { useState,useEffect } from 'react';
import { Spinner } from '@chakra-ui/react'

import "./css/request.css"
const RequestForm = () => {
    const [request,setRequest]=useState({
        lastname:"",
        firstname:"",
        email:"",
        birthday:"",
        sex:"",
        cat:"",
        obj:"",
        description:"",
        file:null,
    })

   
    const [rlastname,setRlastname]=useState(null)
    const [rfirstname,setRfirstname]=useState(null)
    const [remail,setRemail]=useState(null)
    const [rbirthday, setRbirthday]= useState(null)
    const [rsex,setRsex]=useState(null)
    const [rcat,setRcat]=useState(null)
    const [robj,setRobj]=useState(null)
    const [rdescription,setRdescription]=useState(null)
    const [rfile,setRfile]=useState(null)

    var config={
        headers:{Authorization:localStorage.getItem("token")} 
    }

    const [cats,setCats]=useState([])
    const [objs,setObjs]=useState([])
    const [token,setToken]=useState("")
    const [showSexeInput,setshowSexeInput] =useState(false)
    const [isValid,setIsvalid]=useState(false)
    const [errorMessage,setErrorMessage]=useState("")
    const [formIsLoad,setFormIsLoad]=useState(false)
    const toast=useToast()
    useEffect(()=>{     
            console.log("EMAIL  "+localStorage.getItem("email") )        
            axios.get("https://exam.dmdsatis.com/public/api/cats",config)
                .then((res)=>{
                    setCats(res.data.items)
                    console.log(cats) 
            }) 
    },[])
    
    const handleChange =(evt)=>{
        const {name ,value} =evt.target
        setRequest({...request,[name]:value})
        if(name=="birthday"){
            console.log(value)
            const date= new Date(value).toLocaleDateString("en-US")
            setRequest({...request,birthday:date})
        }

        if(name=="cat"){
            axios.get("https://exam.dmdsatis.com/public/api/cats/"+value+"/objs",config)
            .then((res)=>{ 
                setObjs(res.data.items)
                 console.log(res.data.items)
            }) 
        }

        if(name=="sex"){
            if(evt.target.value=="Autre"){
                setshowSexeInput(true)
            }
            else{
                setshowSexeInput(false)
            }
        }
        console.log(request)
    }


    const onChangeFile=(file)=>{
        const formData= new FormData()
        formData.append("file",file)
        console.log(file)
        setRequest({...request,file})
       // console.log("State ",formdata)
    }
 
   

    const onSubmit= async ()=>{
            setFormIsLoad(true)
        // Check LastName field
            if(request.lastname===""){
               setRlastname(true)
                setIsvalid(true)
            }else{
                setRlastname(false)
                setIsvalid(false)
            }

        // Check FirstName field
            if(request.firstname===''){
                console.log(rlastname)

                setRfirstname(true)
                setIsvalid(true)
            }else{
                setRfirstname(false)
                setIsvalid(false)
            }

        // Check Email field
            if(request.email===""){
               setRemail(true)
                setIsvalid(true)
            }else{
                setRemail(false)
                setIsvalid(false)
            }

        // Check Birthday field
            if(request.birthday===""){
                setRbirthday(true)
                setIsvalid(true)
            }else{
                setRemail(false)
                setIsvalid(false)
            }  

         // Check sex field
            if(request.sex===""){
                setRsex(true)
                setIsvalid(true)
            }else{
                setRsex(false)
                setIsvalid(false)
            }  

        // Check Categorie field
             if(request.cat===""){
                setRcat(true)
                setIsvalid(true)
            }else{
                setRcat(false)
                setIsvalid(false)
            } 

        // Check Objet field
            if(request.obj===""){
                setRobj(true)
                setIsvalid(true)
            }else{
                setRobj(false)
                setIsvalid(false)
            } 

         // Check Description field
            if(request.description===""){
                setRdescription(true)
                setIsvalid(true)
            }else{
                setRdescription(false)
                setIsvalid(false)
            }

        // Check file field
            if(request.file===""){
                setRfile(true)
                setIsvalid(true)
            }else{
                setIsvalid(false)
                setRfile(false)
            } 

            
            await axios.post("https://exam.dmdsatis.com/public/api/requete",request,config)
                .then((res)=>{
                    console.log(res)
                    setFormIsLoad(false)
                }).catch((error)=>{
                    console.log(error.message)
                    console.log(error)

                    if(error.message=="Network Error"){
                        toast({
                            title: 'ERROR.',
                            description:  error.message,
                            status: 'error',
                            duration: 9000,
                            isClosable: true,
                          })
                          setIsvalid(true)
                    }else{
                        setErrorMessage(error.response.data)
                        setIsvalid(true)
                    }
                    setFormIsLoad(false)
                })

            
       /* if(request.Nom=="" || request.Prenoms=="" || request.Email=="" || request.Datenais=="" || request.sexe=="" || request.categorie=="" || request.objet=="" || request.description=="" || request.file=="" ){
            setIsvalid(true)
        }
        else{
            setIsvalid(false)
            console.log(request)
            axios.post("https://exam.dmdsatis.com/public/api/requete",request,config)
            .then((res)=>{
                console.log(res)
            })
        } */  
        
    }

    return (
      <VStack  h='80vh' w="400px"  spacing="20" >
            <VStack w='100%' bgColor='white' p='10' borderRadius="25px" boxShadow="2xl">
                {
                    isValid ? <Alert status='error'>
                        <AlertIcon />
                        <AlertTitle>Champs vide!</AlertTitle>
                        <AlertDescription></AlertDescription>
                    </Alert>:<Text></Text>
                }
                
                <FormControl>
                    <FormLabel fontSize="12px">Nom</FormLabel>
                    <Input  className={rlastname==true?"emptyFiel":""} errorBorderColor='red.300' bgColor="#ffffff" onChange={(evt)=> handleChange(evt)} name='lastname'  />
                </FormControl>
                <FormControl> 
                    <FormLabel fontSize="12px">Prenoms</FormLabel>
                    <Input className={rfirstname==true?"emptyFiel":""} errorBorderColor='red.300' bgColor="#ffffff" onChange={(evt)=> handleChange(evt)} name='firstname'   />
                </FormControl>
                <FormControl>
                    <FormLabel fontSize="12px">Email</FormLabel>
                    <Input  className={remail==true?"emptyFiel":""} errorBorderColor='red.300' bgColor="#ffffff" onChange={(evt)=> handleChange(evt)} name='email'  type='email' />
                </FormControl>
                <FormControl>
                    <FormLabel fontSize="12px">Date de naissance</FormLabel>
                    <Input className={rbirthday==true?"emptyFiel":""} errorBorderColor='red.300' bgColor="#ffffff" onChange={(evt)=> handleChange(evt)} name='birthday'  type='date'  />
                </FormControl>
                <FormControl>
                    <FormLabel fontSize="12px">Sexe</FormLabel>
                    
                    <Select className={rsex==true?"emptyFiel":""} errorBorderColor='red.300' name='sex' onChange={(evt)=> setRequest({...request,sex:evt.target.value})} bgColor="#ffffff"  placeholder='Sexe' >
                        <option value='Masculin'>Masculin</option>
                        <option value='Feminin'>Feminin</option>
                        <option value='Autre'>Autre</option>
                    </Select>
                </FormControl>
                    {
                        showSexeInput==true? <FormControl> <FormLabel>Precisez le quel</FormLabel><Input className={request.sex==""?"emptyFiel":""}  errorBorderColor='red.300' bgColor="#ffffff" onChange={(evt)=> setRequest({...request,sex:evt.target.value})} name='sexeInput'   /></FormControl> : <Text></Text>
                    }
                <FormControl>
                    <FormLabel fontSize="12px">Categorie de requete</FormLabel>
                    <Select className={rcat==true?"emptyFiel":""} errorBorderColor='red.300' name='cat' onChange={(evt)=> handleChange(evt)} bgColor="#ffffff"  >
                     { 
                     cats.map((cat,i)=>{
                            return <option key={i} value={cat.slug} > {cat.name} </option>
                       })
                      }
                    </Select>
                </FormControl>
                <FormControl>
                    <FormLabel fontSize="12px">Objet de requete</FormLabel>
                      <Select className={robj==true?"emptyFiel":""} errorBorderColor='red.300' name='obj' bgColor="#ffffff" onChange={(evt)=>setRequest({...request,obj:evt.target.value})} >
                        {
                            objs.map((obj,i)=>{
                                return <option  key={i} value={obj.slug}> {obj.name} </option>
                            })
                        }
                      </Select>
                </FormControl>
                <FormControl>
                    <FormLabel fontSize="12px">Description</FormLabel>
                    <Textarea 
                        className={rdescription==true?"emptyFiel":""}
                        errorBorderColor='red.300'
                        onChange={(evt)=> handleChange(evt)}
                        bgColor="#ffffff" 
                        size='sm'
                        name='description'
                     
                    />
                </FormControl>
                <FormControl>
                    <Input className={rfile==true?"emptyFiel":""}  errorBorderColor='red.300' type="file" onChange={(e)=> onChangeFile(e.target.files[0]) }/>
                </FormControl>
                <FormControl>
                    
                    {formIsLoad ? <Button isLoading  onClick={onSubmit} w='100%' bgColor='#0A5EFC' color='#ffffff'><Text>Enregistrer</Text></Button> : <Button  onClick={onSubmit} w='100%' bgColor='#0A5EFC' color='#ffffff'><Text>Enregistrer</Text></Button>}
                </FormControl>
            </VStack>
      </VStack>
    );
};

export default  RequestForm;