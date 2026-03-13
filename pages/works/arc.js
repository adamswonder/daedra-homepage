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
  <Layout title="African Ruby Community">
    <Container>
      <Title>
        African Ruby Community <Badge>2024</Badge>
      </Title>
      <P>
        The Africa Ruby Community (ARC) Platform is a project aimed at creating a hub for Ruby language 
        enthusiasts in Africa. This platform facilitates connection, knowledge sharing, collaboration on 
        projects, and staying updated with the latest Ruby community developments.
      </P>
      <P>
        Whether you're a seasoned developer or a beginner, this platform offers tailored resources for 
        different countries and cities, merchandise, meetup information, and details about online workshops 
        and webinars. The platform serves as a central point for the growing Ruby community across Africa, 
        fostering collaboration and learning opportunities.
      </P>

      <List ml={4} my={4}>
        <ListItem>
          <Meta>Website</Meta>
          <span>
            <Link href="https://africanruby.org" target="_blank">
              https://africanruby.org <ExternalLinkIcon mx="2px" />
            </Link>
          </span>
        </ListItem>
        <ListItem>
          <Meta>Platform</Meta>
          <span>Web Application & Community Hub</span>
        </ListItem>
        <ListItem>
          <Meta>Stack</Meta>
          <span>Ruby on Rails / PostgreSQL / Tailwind CSS</span>
        </ListItem>
        <ListItem>
          <Meta>Features</Meta>
          <span>Community chapters, Event management, Resource sharing, Mentorship programs</span>
        </ListItem>
        <ListItem>
          <Meta>Coverage</Meta>
          <span>Kenya, Rwanda, Tanzania, Uganda, and expanding across Africa</span>
        </ListItem>
      </List>

      <WorkImage src="/images/works/arc_eyecatch.png" alt="African Ruby Community" />
      <WorkImage src="/images/works/arc_01.png" alt="African Ruby Community Activities" />
    </Container>
  </Layout>
)

export default Work
export { getServerSideProps } from '../../components/chakra'