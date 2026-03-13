import {
  Container,
  Badge,
  Link,
  List,
  ListItem,
  SimpleGrid
} from '@chakra-ui/react'
import Layout from '../../components/layouts/article'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Title, WorkImage, Meta } from '../../components/work'
import P from '../../components/paragraph'

const Work = () => (
  <Layout title="Novatouch">
    <Container>
      <Title>
        Novatouch <Badge>2026</Badge>
      </Title>
      <P>
        Novatouch Cleaning & Care Ltd is a professional cleaning service company that provides 
        comprehensive cleaning solutions for homes and businesses. The platform offers specialized 
        services tailored to meet diverse cleaning needs with a focus on quality and customer satisfaction.
      </P>
      <P>
        The Novatouch platform features an intuitive service catalog system that allows customers to 
        easily browse and book cleaning services including general cleaning, deep cleaning, carpet cleaning, 
        furniture cleaning, and specialized care services. The platform streamlines the booking process 
        and provides transparent pricing for all services.
      </P>

      <List ml={4} my={4}>
        <ListItem>
          <Meta>Website</Meta>
          <span>
            <Link href="https://novatouch.vercel.app" target="_blank">
              https://novatouch.vercel.app <ExternalLinkIcon mx="2px" />
            </Link>
          </span>
        </ListItem>
        <ListItem>
          <Meta>Platform</Meta>
          <span>Web Application</span>
        </ListItem>
        <ListItem>
          <Meta>Stack</Meta>
          <span>React / Next.js / Node.js / Booking System</span>
        </ListItem>
        <ListItem>
          <Meta>Services</Meta>
          <span>Home cleaning, Deep cleaning, Carpet care, Furniture cleaning</span>
        </ListItem>
      </List>

      <WorkImage src="/images/works/novatouch_eyecatch.png" alt="Novatouch" style="h-10"/>
      <SimpleGrid columns={2} gap={2}>
        <WorkImage src="/images/works/novatouch_01.png" alt="Novatouch Services" />
        <WorkImage src="/images/works/novatouch_02.png" alt="Novatouch Catalog" />
      </SimpleGrid>
    </Container>
  </Layout>
)

export default Work
export { getServerSideProps } from '../../components/chakra'