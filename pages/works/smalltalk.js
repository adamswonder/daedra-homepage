import {
  Container,
  Badge,
  Link,
  List,
  ListItem
} from '@chakra-ui/react'
import Layout from '../../components/layouts/article'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Title, WorkImage, Meta } from '../../components/work'
import P from '../../components/paragraph'

const Work = () => (
  <Layout title="SmallTalk">
    <Container>
      <Title>
        SmallTalk <Badge>2024</Badge>
      </Title>
      <P>
        An AI-powered conversation companion built to make communication smooth, natural, and engaging.
      </P>
      <P>
        SmallTalk leverages advanced natural language processing to help users practice conversations, 
        improve their communication skills, and engage in meaningful dialogue with an intelligent AI companion.
      </P>

      <List ml={4} my={4}>
        <ListItem>
          <Meta>Website Link</Meta>
          <span>
            <Link href="https://small-talk.ai" target="_blank">
              https://small-talk.ai/ <ExternalLinkIcon mx="0.5px" />
            </Link>
          </span>
        </ListItem>
        <ListItem>
          <Meta>Platform</Meta>
          <span>Web Application</span>
        </ListItem>
        <ListItem>
          <Meta>Stack</Meta>
          <span>React / TypeScript / OpenAI API / Chakra UI</span>
        </ListItem>
        <ListItem>
          <Meta>Features</Meta>
          <span>Natural conversation, Multiple topics, Learning progress tracking</span>
        </ListItem>
        <ListItem>
          <Meta>Link</Meta>
          <span className='hover:underline'>SmallTalk Web App</span>
        </ListItem>
      </List>

      <WorkImage src="/images/works/small_talk_eyecatch.png" alt="SmallTalk" />
    </Container>
  </Layout>
)

export default Work
export { getServerSideProps } from '../../components/chakra'