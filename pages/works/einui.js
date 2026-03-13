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
  <Layout title="Ein UI">
    <Container>
      <Title>
        Ein UI <Badge>2024</Badge>
      </Title>
      <P>
        A collection of beautiful, ready-made Liquid Glass UI components you can preview, copy, 
        and drop into any web app. Ein UI offers a refined frosted-glass aesthetic with 
        accessible, responsive components built on modern web technologies.
      </P>
      <P>
        Built on Tailwind CSS, shadcn/ui, and Radix UI primitives, Ein UI provides developers 
        with a comprehensive library of liquid glass components including interactive widgets, 
        admin panels, and various UI elements that bring elegance and functionality to modern 
        web applications.
      </P>

      <List ml={4} my={4}>
        <ListItem>
          <Meta>Website</Meta>
          <span>
            <Link href="https://ui.eindev.ir/" target="_blank">
              https://ui.eindev.ir/ <ExternalLinkIcon mx="2px" />
            </Link>
          </span>
        </ListItem>
        <ListItem>
          <Meta>Platform</Meta>
          <span>Component Library & Documentation</span>
        </ListItem>
        <ListItem>
          <Meta>Stack</Meta>
          <span>React / TypeScript / Tailwind CSS / shadcn/ui / Radix UI</span>
        </ListItem>
        <ListItem>
          <Meta>Features</Meta>
          <span>Liquid glass components, Interactive widgets, Admin panels, Copy-paste ready</span>
        </ListItem>
        <ListItem>
          <Meta>Design</Meta>
          <span>Frosted glass aesthetic, Accessible, Responsive, Modern UI patterns</span>
        </ListItem>
      </List>

      <WorkImage src="/images/works/enui_eyecatch.png" alt="Ein UI" />
      <WorkImage src="/images/works/enui_01.png" alt="Ein UI Admin Panel" />
    </Container>
  </Layout>
)

export default Work
export { getServerSideProps } from '../../components/chakra'