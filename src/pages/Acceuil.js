import { HStack, VStack ,Image,Text, Box,Button, Stack, useDisclosure,Drawer,DrawerBody,DrawerFooter, DrawerHeader, DrawerOverlay,DrawerContent, DrawerCloseButton,Input} from '@chakra-ui/react';
import {  AddIcon } from '@chakra-ui/icons'
import {AiOutlineAlignLeft} from "react-icons/ai"
import React, { useRef } from 'react';
import RequestForm from '../components/RequestForm';
import NavMenu from '../components/NavMenu';

const Acceuil = () => {
    const breakpoints = {
        sm: '30em',
        md: '48em',
        lg: '62em',
        xl: '80em',
        '2xl': '96em',
    }

    const {isOpen, onOpen, onClose}=useDisclosure()
    const btnRef=useRef()
    
    return (
            <VStack bgColor="#F7F8FA" w="100%"  >
                <Button float="left" display={["flex","flex","flex","flex","none"]} ref={btnRef} onClick={onOpen}><AiOutlineAlignLeft/></Button>
                <HStack h="100%" w='100%' >
                    <VStack >
                        <Drawer
                            isOpen={isOpen}
                            placement='left'
                            onClose={onClose}
                            finalFocusRef={btnRef}
                        >
                            <DrawerOverlay />
                            <DrawerContent>

                                <DrawerCloseButton />
                             
                                <DrawerBody>
                                    <NavMenu/>
                                </DrawerBody>

                            </DrawerContent>
                        </Drawer>
                    </VStack>
                    
                    <VStack display={["none","none","none","none","flex"]} flexDirection="column"  w="350px" h="100vh" justifyContent="center" spacing="40" >
                        <NavMenu/>
                    </VStack>
                    <VStack w='100%' h="100vh" justifyContent="flex-start"   >
                        <Box display={["flex"]} flexDirection={["column","column","column","column","row"]}  w='100%' justifyContent={["center","center","center","center","space-around"]} alignItems="flex-start">
                            <VStack w="500px">
                                <Text fontSize="3xl">MINI PROJET REACT POUR TEST DMD SARL</Text>
                            </VStack>
                            
                            <RequestForm />
                        </Box>
                    </VStack>
                </HStack>
            </VStack>
    );
};

export default Acceuil;