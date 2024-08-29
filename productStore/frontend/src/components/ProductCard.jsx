import {Box, Image, Heading, HStack, IconButton, Text, useColorModeValue, useToast, Modal, useDisclosure, ModalOverlay, ModalContent,
    ModalHeader, ModalCloseButton, ModalBody, VStack, Input, ModalFooter, Button} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useProductStore } from "../store/product";
import {useState} from 'react';

export default function ProductCard ({product}) {
    const textColor = useColorModeValue("gray.600", "gray.200");
    const bg = useColorModeValue("white", "gray.800");

    //State for the updating modal:
    const [updatedProduct, setUpdatedProduct] = useState({
        name: product.name,
        price: product.price,
        image: product.image
    })

    const toast = useToast();
    const {isOpen, onOpen, onClose} = useDisclosure();

    const {deleteProduct, updateProduct} = useProductStore();
    const handleDelete = async (id) => {
        const {success} = await deleteProduct(id);
        if(success){
            toast({
                title: 'Deleted',
                description: "Product was deleted successfully from the database.",
                status: 'success',
                duration: 2000,
                isClosable: true,
            })
        }
        if(!success){
            toast({
                title: 'Deletion failed',
                description: "Could not delete the product from the database.",
                status: 'error',
                duration: 2000,
                isClosable: true,
            })
        }
    }

    const handleUpdate = async (updatedProduct)=>{
        const updating = await updateProduct(product._id, updatedProduct);
        onClose();
        if(updating.success){
            toast({
                title: 'Updated',
                description: "Product details were updated successfully.",
                status: 'success',
                duration: 2000,
                isClosable: true,  
            })
        }else{
            toast({
                title: 'Error',
                description: "Error occured while updating the product details.",
                status: 'error',
                duration: 2000,
                isClosable: true,  
            })
        }
    }

    return (
        <Box
            shadow="lg"
            rounded="lg"
            overflow="hidden"
            transition="all 0.3s"
            _hover={{transform:"translateY(-5px)", shadow:"xl"}}
        >
            <Image src={product.image} alt={product.name} h={48} w="full" objectFit="cover"/>
            <Box
                p={4}
            >
                <Heading as={"h3"} size={"md"} mb={2}>
                    {product.name}
                </Heading>
                <Text fontWeight="bold" fontSize="xl" color={textColor} bg={bg} mb={4}>
                    ${product.price}
                </Text>
                <HStack spacing={2}>
                    <IconButton icon={<EditIcon/>} colorScheme="blue" onClick={onOpen}/>
                    <IconButton icon={<DeleteIcon/>} onClick={()=>{handleDelete(product._id)}} colorScheme="red"/>
                </HStack>
            </Box>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                <ModalContent>

                    <ModalHeader>Update Product</ModalHeader>
                    <ModalCloseButton/>

                    <ModalBody>
                        <VStack spacing={4}>
                            <Input
                                placeholder="Product Name"
                                name="name"
                                value={updatedProduct.name}
                                onChange={(e)=>{setUpdatedProduct({...updatedProduct, name: e.target.value})}}
                            />
                            <Input
                                placeholder="Product Price"
                                name="price"
                                type="Number"
                                value={updatedProduct.price}
                                onChange={(e)=>{setUpdatedProduct({...updatedProduct, price: e.target.value})}}
                            />
                            <Input
                                placeholder="Image url"
                                name="image"
                                value={updatedProduct.image}
                                onChange={(e)=>{setUpdatedProduct({...updatedProduct, image: e.target.value})}}
                            />
                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button mr={3} colorScheme="blue" onClick={()=>{handleUpdate(updatedProduct)}}>Update</Button>
                        <Button variant={"ghost"} onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    )
}