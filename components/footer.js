import { Box, Link, useColorModeValue } from '@chakra-ui/react'

const Footer = () => {
  return (
    <Box align="center" my={4} p={3} borderRadius="md" bg={useColorModeValue('whiteAlpha.200', 'whiteAlpha.100')} fontSize="sm" opacity={0.8}>
      <Box mb={2}>
        &copy; {new Date().getFullYear()} Adams Wonderboy. All Rights Reserved.
      </Box>
      <Box>
        Inspired by{' '}
        <Link href="https://www.craftz.dog/" target="_blank" style={{ textDecoration: 'underline' }}>
          Takuya Matsuyama
        </Link>
      </Box>
    </Box>
  )
}

export default Footer
