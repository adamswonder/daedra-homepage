const GITHUB_USERNAME = 'adamswonder'

const QUERY = `
  query($username: String!) {
    user(login: $username) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
            }
          }
        }
      }
    }
  }
`

export default async function handler(req, res) {
  const token = process.env.GITHUB_TOKEN

  if (!token) {
    return res.status(200).json({ total: 0, weeks: [] })
  }

  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query: QUERY, variables: { username: GITHUB_USERNAME } })
    })

    const { data } = await response.json()
    const calendar = data.user.contributionsCollection.contributionCalendar

    // Aggregate each week into a single count + relative label
    const weeks = calendar.weeks.map(week => {
      const count = week.contributionDays.reduce((sum, d) => sum + d.contributionCount, 0)
      const date = new Date(week.contributionDays[0].date)
      return { count, date: date.toISOString() }
    })

    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate')
    return res.status(200).json({ total: calendar.totalContributions, weeks })
  } catch (err) {
    return res.status(200).json({ total: 0, weeks: [] })
  }
}
