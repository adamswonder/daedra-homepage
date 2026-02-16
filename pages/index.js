import NextLink from 'next/link'
import {
  Link,
  Container,
  Heading,
  Box,
  Button,
  List,
  ListItem,
  useColorModeValue
} from '@chakra-ui/react'
import { ChevronRightIcon, EmailIcon } from '@chakra-ui/icons'
import Paragraph from '../components/paragraph'
import { BioSection, BioYear, BioContent } from '../components/bio'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import { IoLogoGithub } from 'react-icons/io5'
import Image from 'next/image'

const Home = () => (
  <Layout>
    <Container>
      <Box
        borderRadius="lg"
        mb={6}
        p={3}
        textAlign="center"
        bg={useColorModeValue('whiteAlpha.500', 'whiteAlpha.200')}
        css={{ backdropFilter: 'blur(10px)' }}
      >
        Hello, I&apos;m a software engineer based in Nairobi, Kenya!
      </Box>

      <Box display={{ md: 'flex' }}>
        <Box flexGrow={1}>
          <Heading as="h2" variant="page-title">
            Adams Wonderboy
          </Heading>
          <p>Agile Practitioner | Software Engineer</p>
        </Box>
        <Box
          flexShrink={0}
          mt={{ base: 4, md: 0 }}
          ml={{ md: 6 }}
          textAlign="center"
        >
          <Box
            borderColor="whiteAlpha.800"
            borderWidth={2}
            borderStyle="solid"
            w="100px"
            h="100px"
            display="inline-block"
            borderRadius="full"
            overflow="hidden"
          >
            <Image
              src="/images/adams.jpg"
              alt="Profile image"
              width="100"
              height="100"
            />
          </Box>
        </Box>
      </Box>

      <Section delay={0.1}>
        <Heading as="h3" variant="section-title">
          Work
        </Heading>
        <Paragraph>
          Adams is a self-motivated and innovative software engineer based in Nairobi, Kenya, with a
          passion for building intuitive digital solutions. He has a knack
          for all things software development, from planning and designing all the
          way to solving real-life problems with code. With expertise in full-stack development,
          AI/LLM integration, and DevOps, he's built everything from responsive user interfaces
          to AI-powered document intelligence systems. Currently, he works at{' '}
          <Link
            href="https://craftsilicon.com"
            target="_blank"
          >
            Craft Silicon
          </Link>
          , where he develops enterprise solutions and project management platforms.
          His technical toolkit spans C Programmimg, Ruby, JavaScript, Python, , and cloud infrastructure.
        </Paragraph>
        <Box align="center" my={4}>
          <Button
            as={NextLink}
            href="/works"
            scroll={false}
            rightIcon={<ChevronRightIcon />}
            colorScheme="teal"
          >
            Works of Art
          </Button>
        </Box>
      </Section>

      <Section delay={0.2}>
        <Heading as="h3" variant="section-title">
          Bio
        </Heading>
        <BioSection>
          <BioYear>2024 to present</BioYear>
          <BioContent>Software Engineer at Craft Silicon | Little Limited</BioContent>
        </BioSection>
        <BioSection>
          <BioYear>2023-2024</BioYear>
          <BioContent>Software Engineer at Omna Solutions (Remote, Australia)</BioContent>
        </BioSection>
        <BioSection>
          <BioYear>2023</BioYear>
          <BioContent>Software Developer at iTalanta</BioContent>
        </BioSection>
        <BioSection>
          <BioYear>2022-2023</BioYear>
          <BioContent>Completed Software Engineering Bootcamp - Moringa School</BioContent>
        </BioSection>
        <BioSection>
          <BioYear>2021-2022</BioYear>
          <BioContent>Networking Engineer & Solutions Integrator - Next Technologies Limited</BioContent>
        </BioSection>
        <BioSection>
          <BioYear>2020-2021</BioYear>
          <BioContent>Software Developer at Skylux Tech (Remote)</BioContent>
        </BioSection>
        <BioSection>
          <BioYear>2020</BioYear>
          <BioContent>Completed Bachelor&apos;s in Graduate School of Computer Science</BioContent>
        </BioSection>
      </Section>

      <Section delay={0.3}>
        <Heading as="h3" variant="section-title">
          I ♥
        </Heading>
        <Paragraph>
          Open Source,{' '}
          <Link href="https://karibunairobi.co.ke/" target="_blank">
            Art
          </Link>
          , Problem Solving,{' '}
          <Link href="https://www.instagram.com/krbnrb.apparel?igsh=bW1wbGM3c2JucWky" target="_blank">
            Photography
          </Link>
          , Robotics, Machine Learning
        </Paragraph>
      </Section>

      <Section delay={0.3}>
        <Heading as="h3" variant="section-title">
          On the web
        </Heading>
        <List>
          <ListItem>
            <Link href="https://github.com/adamswonder" target="_blank">
              <Button
                variant="ghost"
                colorScheme="teal"
                leftIcon={<IoLogoGithub />}
              >
                GitHub
              </Button>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="https://linkedin.com/in/adamswonder" target="_blank">
              <Button
                variant="ghost"
                colorScheme="teal"
                leftIcon={<IoLogoGithub />}
              >
                LinkedIn
              </Button>
            </Link>
          </ListItem>
        </List>

        <Heading as="h3" variant="section-title">
          Get in touch
        </Heading>
        <p>
          Interested in collaborating or have a project in mind?
          Feel free to reach out!
        </p>

        <Box align="center" my={4}>
          <Button
            as={Link}
            href="mailto:adamswill.i.am71002@gmail.com"
            leftIcon={<EmailIcon />}
            colorScheme="teal"
          >
            Contact me
          </Button>
        </Box>
      </Section>
    </Container>
  </Layout>
)

export default Home
export { getServerSideProps } from '../components/chakra'
