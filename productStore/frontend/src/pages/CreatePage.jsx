import {useState} from 'react';
import {Container, VStack, Heading, Box, useColorModeValue, Input, Button, useToast} from "@chakra-ui/react";
import { useProductStore } from '../store/product';

export default function CreatePage () { 
    const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
        image: ""
    })

    const toast = useToast();

    const {createProduct, products} = useProductStore();

    const handleAddProduct = async () => {
        const {success, message} = await createProduct(newProduct);
        if(!success){
            toast({
                title: "Error",
                description: message,
                status: "error",
                duration: 2000,
                isClosable: true
            })
        }else{
            toast({
                title: "Successfully added",
                description: message,
                status: "success",
                duration: 2000,
                isClosable: true
            })
        }
        setNewProduct({price: "", name: "", image:""})
    }

    return (
        <Container maxW={"container.sm"}>
            <VStack spacing={8}>
                <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>Create New Product</Heading>
                <Box 
                    w={"full"} bg={useColorModeValue("white", "gray.800")} p={6} 
                    rounder="lg" shadow="mg">
                    <VStack spacing={4}>
                        <Input
                            name='name'
                            value={newProduct.name}
                            onChange={(e)=>{setNewProduct({...newProduct, name: e.target.value})}}
                        >
                        </Input>
                        <Input
                            name='price'
                            value={newProduct.price}
                            type="number"
                            onChange={(e)=>{setNewProduct({...newProduct, price: e.target.value})}}
                        >
                        </Input>
                        <Input
                            name="image"
                            value={newProduct.image}
                            onChange={(e)=>{setNewProduct({...newProduct, image: e.target.value})}}
                        >
                        </Input>
                        <Button colorScheme="blue" onClick={handleAddProduct}>Add Product</Button>
                    </VStack>
                </Box>
            </VStack>
        </Container>
    )
}