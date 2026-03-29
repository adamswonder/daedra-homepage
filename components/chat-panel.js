import { useState, useRef, useEffect } from 'react'
import { useChat } from '@ai-sdk/react'
import { HttpChatTransport } from 'ai'
import {
  Box,
  Flex,
  Text,
  Input,
  IconButton,
  Button,
  VStack,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  useDisclosure,
  useColorModeValue,
  useColorMode,
  useBreakpointValue
} from '@chakra-ui/react'
import { IoSend, IoClose, IoSparkles, IoMoon, IoSunny } from 'react-icons/io5'
import Image from 'next/image'

const SUGGESTED_QUESTIONS = [
  'What expertise can you bring to help my company grow or solve specific challenges?',
  'Are you open to consulting or contract work for businesses like mine?',
  'Can you provide examples of past projects where you helped companies achieve their goals?'
]

const transport = new HttpChatTransport({ api: '/api/chat' })

function TypingDots() {
  return (
    <Flex gap="4px" align="center" h="20px">
      {[0, 1, 2].map(i => (
        <Box
          key={i}
          w="7px"
          h="7px"
          borderRadius="full"
          bg="currentColor"
          opacity={0.5}
          style={{
            animation: 'bounce 1.2s infinite ease-in-out',
            animationDelay: `${i * 0.2}s`
          }}
        />
      ))}
      <style>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-6px); }
        }
      `}</style>
    </Flex>
  )
}

export default function ChatDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { colorMode, toggleColorMode } = useColorMode()
  const { messages, sendMessage, status } = useChat({ transport })
  const [input, setInput] = useState('')
  const [visitor, setVisitor] = useState(null)
  const [nameVal, setNameVal] = useState('')
  const messagesEndRef = useRef(null)

  const isLoading = status === 'submitted' || status === 'streaming'

  // Responsive: bottom drawer on mobile, right drawer on desktop
  const placement = useBreakpointValue({ base: 'bottom', md: 'right' })
  const drawerSize = useBreakpointValue({ base: 'full', md: 'sm' })

  // Theme — uses app's own color tokens
  const bg = useColorModeValue('#f0e7db', '#202023')
  const borderColor = useColorModeValue('blackAlpha.200', 'whiteAlpha.200')
  const bubbleBg = useColorModeValue('white', 'whiteAlpha.100')
  const userBubbleBg = useColorModeValue('orange.100', 'orange.900')
  const inputBg = useColorModeValue('white', 'whiteAlpha.100')
  const mutedColor = useColorModeValue('gray.500', 'whiteAlpha.500')
  const pillBg = useColorModeValue('#2C7A7B', '#202023')
  const pillColor = useColorModeValue('white', 'white')
  const suggestedBorderColor = useColorModeValue('blackAlpha.200', 'whiteAlpha.200')

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    try {
      const stored = localStorage.getItem('janet-visitor')
      if (stored) setVisitor(JSON.parse(stored))
    } catch (_) {}
  }, [])

  const handleVisitorSubmit = e => {
    e.preventDefault()
    const v = { name: nameVal.trim() }
    setVisitor(v)
    try {
      localStorage.setItem('janet-visitor', JSON.stringify(v))
    } catch (_) {}
  }

  const handleSend = () => {
    const text = input.trim()
    if (!text || isLoading) return
    sendMessage({ text })
    setInput('')
  }

  const handleKeyDown = e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const getMessageText = msg =>
    msg.parts?.find(p => p.type === 'text')?.text ?? ''

  const hasChat = messages.length > 0

  // Bottom drawer on mobile needs max-height constraint
  const bottomDrawerStyle =
    placement === 'bottom'
      ? { maxH: '75vh', borderTopRadius: '2xl', borderBottomRadius: 0 }
      : { maxW: '400px', h: '100vh' }

  return (
    <>
      {/* Floating pill */}
      <Box position="fixed" bottom={6} right={6} zIndex={10}>
        <Button
          onClick={onOpen}
          bg={pillBg}
          color={pillColor}
          borderRadius="full"
          px={5}
          py={3}
          h="auto"
          leftIcon={<IoSparkles />}
          _hover={{ opacity: 0.85 }}
          boxShadow="lg"
          fontSize="sm"
          fontWeight="semibold"
        >
          Chat with Janet
        </Button>
      </Box>

      <Drawer isOpen={isOpen} placement={placement} onClose={onClose} size={drawerSize}>
        <DrawerOverlay />
        <DrawerContent bg={bg} {...bottomDrawerStyle}>
          <DrawerBody p={0} display="flex" flexDirection="column" h="100%">

            {/* Header */}
            <Flex
              px={4}
              py={3}
              align="center"
              justify="space-between"
              borderBottom="1px solid"
              borderColor={borderColor}
              flexShrink={0}
            >
              <Flex align="center" gap={3}>
                <Box
                  w="36px"
                  h="36px"
                  borderRadius="full"
                  overflow="hidden"
                  flexShrink={0}
                >
                  <Image
                    src="/images/adams.jpg"
                    alt="Adams Wonderboy"
                    width={36}
                    height={36}
                    style={{ objectFit: 'cover', borderRadius: '50%' }}
                  />
                </Box>
                <Box>
                  <Text fontWeight="semibold" fontSize="sm" lineHeight="tight">
                    Adams Wonderboy
                  </Text>
                  <Text fontSize="xs" color={mutedColor}>
                    Agile Practitioner | Software Engineer
                  </Text>
                </Box>
              </Flex>
              <Flex gap={1}>
                <IconButton
                  icon={colorMode === 'light' ? <IoMoon /> : <IoSunny />}
                  size="sm"
                  variant="ghost"
                  onClick={toggleColorMode}
                  aria-label="Toggle theme"
                />
                <IconButton
                  icon={<IoClose />}
                  size="sm"
                  variant="ghost"
                  onClick={onClose}
                  aria-label="Close"
                />
              </Flex>
            </Flex>

            {/* Scrollable body */}
            <Box flex={1} overflowY="auto" px={4} py={4}>
              {!visitor ? (
                <VStack align="stretch" spacing={4}>
                  <Box
                    bg={bubbleBg}
                    px={4}
                    py={3}
                    borderRadius="xl"
                    fontSize="sm"
                    lineHeight="tall"
                    border="1px solid"
                    borderColor={borderColor}
                  >
                    Hi, how can I help you today? Since this is the first time I&apos;ve seen you,
                    I&apos;ll need your name to personalise our conversation.
                  </Box>

                  <Box
                    as="form"
                    onSubmit={handleVisitorSubmit}
                    bg={bubbleBg}
                    border="1px solid"
                    borderColor={borderColor}
                    borderRadius="xl"
                    overflow="hidden"
                  >
                    <Input
                      value={nameVal}
                      onChange={e => setNameVal(e.target.value)}
                      placeholder="Name"
                      size="sm"
                      fontSize="16px"
                      border="none"
                      borderRadius={0}
                      bg="transparent"
                      px={4}
                      py={5}
                      _focus={{ boxShadow: 'none' }}
                    />
                    <Box px={3} pb={3}>
                      <Button
                        type="submit"
                        size="sm"
                        variant="outline"
                        rightIcon={<IoSend size={12} />}
                        borderRadius="lg"
                        isDisabled={!nameVal.trim()}
                      >
                        Submit
                      </Button>
                    </Box>
                  </Box>
                </VStack>
              ) : !hasChat ? (
                <VStack align="stretch" spacing={3}>
                  {SUGGESTED_QUESTIONS.map(q => (
                    <Box
                      key={q}
                      px={4}
                      py={3}
                      border="1px dashed"
                      borderColor={suggestedBorderColor}
                      borderRadius="xl"
                      cursor="pointer"
                      fontSize="sm"
                      color={mutedColor}
                      _hover={{ borderColor: 'orange.300', color: 'orange.400' }}
                      transition="all 0.15s"
                      onClick={() => sendMessage({ text: q })}
                    >
                      {q}
                    </Box>
                  ))}
                </VStack>
              ) : (
                <VStack spacing={3} align="stretch">
                  {messages.map(m => {
                    const text = getMessageText(m)
                    if (!text) return null
                    return (
                      <Box
                        key={m.id}
                        alignSelf={m.role === 'user' ? 'flex-end' : 'flex-start'}
                        maxW="85%"
                      >
                        <Box
                          bg={m.role === 'user' ? userBubbleBg : bubbleBg}
                          border="1px solid"
                          borderColor={borderColor}
                          px={3}
                          py={2}
                          borderRadius="xl"
                          fontSize="sm"
                          lineHeight="tall"
                        >
                          {text}
                        </Box>
                      </Box>
                    )
                  })}
                  {isLoading && (
                    <Box alignSelf="flex-start" maxW="85%">
                      <Box
                        bg={bubbleBg}
                        border="1px solid"
                        borderColor={borderColor}
                        px={3}
                        py={3}
                        borderRadius="xl"
                      >
                        <TypingDots />
                      </Box>
                    </Box>
                  )}
                  <div ref={messagesEndRef} />
                </VStack>
              )}
            </Box>

            {/* Input footer */}
            <Box px={4} py={3} borderTop="1px solid" borderColor={borderColor} flexShrink={0}>
              <Flex gap={2} align="center">
                <Input
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Your enquiry.."
                  size="sm"
                  fontSize="16px"
                  bg={inputBg}
                  border="1px solid"
                  borderColor={borderColor}
                  borderRadius="xl"
                  isDisabled={!visitor}
                  _focus={{ borderColor: 'orange.300', boxShadow: 'none' }}
                />
                <Button
                  onClick={handleSend}
                  isLoading={isLoading}
                  isDisabled={!visitor || !input.trim()}
                  bg={pillBg}
                  color={pillColor}
                  size="sm"
                  borderRadius="xl"
                  rightIcon={<IoSend size={12} />}
                  _hover={{ opacity: 0.85 }}
                  flexShrink={0}
                >
                  Send
                </Button>
              </Flex>
              <Text fontSize="10px" color={mutedColor} mt={2} textAlign="center">
                Please note that these are AI generated messages with my resume as context.
              </Text>
            </Box>

          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}
