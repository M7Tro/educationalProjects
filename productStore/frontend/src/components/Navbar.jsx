import {Container, Flex, Text, HStack, Button, useColorMode} from "@chakra-ui/react";
import {Link} from 'react-router-dom';
import { FaRegSquarePlus } from "react-icons/fa6";
import { FaRegSun } from "react-icons/fa";
import { FaMoon } from "react-icons/fa";

export default function Navbar () {
    const {colorMode, toggleColorMode} = useColorMode();
    return (
        <Container maxW={"1440px"} px={"4px"}>
            <Flex 
                h={16} 
                alignItems="center" 
                justifyContent="space-between" 
                flexDir={{
                    base: "column",
                    sm:"row"
                }}
            >
                <Text
                    fontSize={{base: 22, sm: 28}}
                    fontWeight={"bold"}
                    textTransform={"uppercase"}
                    textAlign="center"
                    bgGradient={"linear(to-r, cyan.400, blue.500)"}
                    bgClip="text"
                >
                    <Link to={"/"}>Product Store 🛒</Link>
                </Text>
                <HStack spacing={2} alignItems={"center"}>
                    <Link to={"/create"}>
                        <Button>
                            <FaRegSquarePlus style={{fontSize: "2rem"}}/>
                        </Button>
                    </Link>
                    <Button onClick={toggleColorMode} style={{fontSize:"2rem"}}>
                        {colorMode === "light" ? <FaMoon/> : <FaRegSun/>}
                    </Button>
                </HStack>
            </Flex>
        </Container>
    )
}