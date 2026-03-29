import { useEffect, useState } from 'react'
import { Box, Text, Flex, useColorModeValue } from '@chakra-ui/react'
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts'

function relativeLabel(dateStr) {
  const date = new Date(dateStr)
  const now = new Date()
  const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24))
  const diffMonths = Math.floor(diffDays / 30)

  if (diffDays <= 7) return 'a day ago'
  if (diffMonths <= 1) return 'a month ago'
  if (diffMonths < 12) return `${diffMonths} months ago`
  return 'a year ago'
}

function CustomTooltip({ active, payload, tooltipBg, tooltipBorder }) {
  if (!active || !payload?.length) return null
  return (
    <Box
      bg={tooltipBg}
      border="1px solid"
      borderColor={tooltipBorder}
      px={2}
      py={1}
      borderRadius="md"
      fontSize="xs"
    >
      {payload[0].value} contributions
    </Box>
  )
}

export default function GithubChart() {
  const [data, setData] = useState([])
  const [total, setTotal] = useState(null)

  const fillColor = useColorModeValue('#88ccca', '#88ccca') // grassTeal from theme
  const textColor = useColorModeValue('gray.500', 'whiteAlpha.500')
  const tickColor = useColorModeValue('#999', '#666')
  const tooltipBg = useColorModeValue('#f0e7db', '#202023')
  const tooltipBorder = useColorModeValue('rgba(0,0,0,0.1)', 'rgba(255,255,255,0.1)')

  useEffect(() => {
    fetch('/api/github-stats')
      .then(r => r.json())
      .then(({ total, weeks }) => {
        if (!weeks?.length) return
        const step = Math.floor(weeks.length / 5)
        setData(weeks.map((w, i) => ({
          count: w.count,
          label: i % step === 0 ? relativeLabel(w.date) : ''
        })))
        setTotal(total)
      })
      .catch(() => {})
  }, [])

  if (!data.length) return null

  return (
    <Box mb={6}>
      <Flex justify="flex-end" align="center" gap={2} mb={2}>
        <Box w="14px" h="14px" bg={fillColor} borderRadius="2px" flexShrink={0} />
        <Text fontSize="xs" color={textColor}>
          Github contributions this year{total !== null ? `: ${total.toLocaleString()}` : ''}
        </Text>
      </Flex>

      <ResponsiveContainer width="100%" height={100}>
        <AreaChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="githubGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={fillColor} stopOpacity={0.5} />
              <stop offset="100%" stopColor={fillColor} stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="label"
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 11, fill: tickColor }}
            interval={0}
          />
          <Tooltip content={<CustomTooltip tooltipBg={tooltipBg} tooltipBorder={tooltipBorder} />} />
          <Area
            type="monotone"
            dataKey="count"
            stroke={fillColor}
            strokeWidth={1.5}
            fill="url(#githubGradient)"
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  )
}
