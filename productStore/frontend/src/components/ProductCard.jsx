import {Box, Image, Heading, HStack, IconButton, Text, useColorModeValue, useToast} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useProductStore } from "../store/product";

export default function ProductCard ({product}) {
    const textColor = useColorModeValue("gray.600", "gray.200");
    const bg = useColorModeValue("white", "gray.800");

    const toast = useToast();

    const {deleteProduct} = useProductStore();
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
                    <IconButton icon={<EditIcon/>} colorScheme="blue"/>
                    <IconButton icon={<DeleteIcon/>} onClick={()=>{handleDelete(product._id)}} colorScheme="red"/>
                </HStack>
            </Box>
        </Box>
    )
}