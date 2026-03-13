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
  <Layout title="Tourist Tap">
    <Container>
      <Title>
        Tourist Tap <Badge>2025</Badge>
      </Title>
      <P>
        NFC-powered wallet that lets you tap any contactless debit or credit card on the back of your device and instantly send money to local merchants.
      </P>
      <P>
        A revolutionary payment solution designed for tourists and travelers, making it easier to support local businesses without the need for cash or complex payment apps.
      </P>

      <List ml={4} my={4}>
        <ListItem>
          <Meta>Website Link</Meta>
          <span>
            <Link href="https://tourist-tap.app" target="_blank">
              https://tourist-tap.app/ <ExternalLinkIcon mx="0.5px" />
            </Link>
          </span>
        </ListItem>
        <ListItem>
          <Meta>Platform</Meta>
          <span>Mobile App (iOS/Android) & Web App</span>
        </ListItem>
        <ListItem>
          <Meta>Stack</Meta>
          <span>React / NFC Technology</span>
        </ListItem>
        <ListItem>
          <Meta>Features</Meta>
          <span>NFC payments, Multi-currency support, Local merchant directory</span>
        </ListItem>
      </List>

      <WorkImage src="/images/works/tourist_tap_eyecatch.png" alt="Tourist Tap" />
    </Container>
  </Layout>
)

export default Work
export { getServerSideProps } from '../../components/chakra'