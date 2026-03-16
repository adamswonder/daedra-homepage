import { Container, Heading, SimpleGrid, Divider } from '@chakra-ui/react'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import { WorkGridItem } from '../components/grid-item'

import thumbSmalltalk from '../public/images/works/small_talk_eyecatch.png'
import thumbTouristtap from '../public/images/works/tourist_tap_eyecatch.png'
import thumbMySalary from '../public/images/works/my_salary_eyecatch.png'
import thumbNovatouch from '../public/images/works/novatouch_eyecatch.png'
import thumbArc from '../public/images/works/arc_eyecatch.png'
import thumbEinUI from '../public/images/works/enui_eyecatch.png'

const Works = () => (
  <Layout title="Works">
    <Container>
      <Heading as="h3" fontSize={20} mb={4}>
        Works
      </Heading>

      <SimpleGrid columns={[1, 1, 2]} gap={6}>
        <Section>
          <WorkGridItem
            id="tourist-tap"
            title="Tourist Tap"
            thumbnail={thumbTouristtap}
          >
            NFC-powered wallet that lets you tap any contactless debit or credit card on the back of your device and instantly send money to local merchants.
          </WorkGridItem>
        </Section>

        <Section>
          <WorkGridItem id="smalltalk" title="SmallTalk" thumbnail={thumbSmalltalk}>
            An AI-powered conversation companion built to make communication smooth, natural, and engaging. 
          </WorkGridItem>
        </Section>
        <Section delay={0.1}>
          <WorkGridItem
            id="mysalary"
            title="MySalary"
            thumbnail={thumbMySalary}
          >
            A smart, secure platform that allows employees to access a portion of their earned salary before payday. It&apos;s instant, easy, and interest-free.
          </WorkGridItem>
        </Section>
        <Section delay={0.1}>
          <WorkGridItem
            id="novatouch"
            title="Novatouch"
            thumbnail={thumbNovatouch}
          >
            Professional cleaning service platform offering comprehensive home and business cleaning solutions with transparent pricing and easy booking.
          </WorkGridItem>
        </Section>
      </SimpleGrid>

      <Section delay={0.2}>
        <Divider my={6} />

        <Heading as="h3" fontSize={20} mb={4}>
          Open Source
        </Heading>
      </Section>

      <SimpleGrid columns={[1, 1, 2]} gap={6}>
        <Section delay={0.3}>
          <WorkGridItem
            id="einui"
            thumbnail={thumbEinUI}
            title="Ein UI"
          >
            Beautiful liquid glass UI components with frosted-glass aesthetic built on Tailwind CSS and modern React primitives.
          </WorkGridItem>
        </Section>
        <Section delay={0.3}>
          <WorkGridItem id="arc" thumbnail={thumbArc} title="African Ruby Community">
            A platform for Ruby language enthusiasts in Africa, facilitating connection, knowledge sharing, and collaboration across the continent.
          </WorkGridItem>
        </Section>
      </SimpleGrid>
    </Container>
  </Layout>
)

export default Works
export { getServerSideProps } from '../components/chakra'
