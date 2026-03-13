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
  <Layout title="MySalary">
    <Container>
      <Title>
        MySalary <Badge>2025</Badge>
      </Title>
      <P>
        A smart, secure platform that allows employees to access a portion of their earned salary before payday. 
        It's instant, easy, and interest-free.
      </P>
      <P>
        MySalary bridges the gap between paydays by providing employees with financial flexibility and peace of mind. 
        The platform integrates seamlessly with existing HR systems and provides real-time salary tracking.
      </P>

      <List ml={4} my={4}>
        <ListItem>
          <Meta>Website Link</Meta>
          <span>
            <Link href="https://mysalary.africa" target="_blank">
              https://mysalary.africa/ <ExternalLinkIcon mx="0.5px" />
            </Link>
          </span>
        </ListItem>
        <ListItem>
          <Meta>Platform</Meta>
          <span>Web & Mobile Application</span>
        </ListItem>
        <ListItem>
          <Meta>Stack</Meta>
          <span>React / Flutter / MSSQL / Little Pay</span>
        </ListItem>
        <ListItem>
          <Meta>Features</Meta>
          <span>Salary advance, HR integration, Financial tracking, Security compliance</span>
        </ListItem>
      </List>

      <WorkImage src="/images/works/my_salary_eyecatch.png" alt="MySalary" />
    </Container>
  </Layout>
)

export default Work
export { getServerSideProps } from '../../components/chakra'