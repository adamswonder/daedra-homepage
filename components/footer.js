import { Box, Link, useColorModeValue } from '@chakra-ui/react'
import dynamic from 'next/dynamic'

const GithubChart = dynamic(() => import('./github-chart'), { ssr: false })

const Footer = () => {
  return (
    <Box my={4}>
      <GithubChart />
      <Box
        align="center"
        p={3}
        borderRadius="md"
        bg={useColorModeValue('whiteAlpha.200', 'whiteAlpha.100')}
        fontSize="sm"
        opacity={0.8}
      >
        <Box mb={2}>
          &copy; {new Date().getFullYear()} Adams Wonderboy. All Rights Reserved.{' '}
          <Link href="https://www.craftz.dog/" target="_blank" style={{ textDecoration: 'underline' }}>
            Takuya Matsuyama
          </Link>
        </Box>
      </Box>
    </Box>
  )
}

export default Footer
