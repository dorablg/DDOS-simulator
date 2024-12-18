'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

interface CaseStudy {
  id: number
  title: string
  date: string
  company: string
  duration: string
  impact: {
    financial: string
    users: string
    downtime: string
  }
  description: string
  technique: string
  lessons: string[]
  references: {
    title: string
    url: string
  }[]
}

const caseStudies: CaseStudy[] = [
  {
    id: 1,
    title: "GitHub's Largest DDoS Attack",
    date: "February 28, 2018",
    company: "GitHub",
    duration: "20 minutes",
    impact: {
      financial: "Estimated $250,000 in mitigation costs",
      users: "Affected over 1.35 million GitHub users",
      downtime: "8-9 minutes of intermittent outages"
    },
    description: "GitHub experienced the largest DDoS attack ever recorded at that time, peaking at 1.35 Tbps. The attack used memcached servers to amplify the attack traffic by a factor of 51,000.",
    technique: "Memcached amplification attack using UDP packets",
    lessons: [
      "Importance of having DDoS mitigation services in place",
      "Need for proper configuration of memcached servers",
      "Value of quick incident response and transparent communication"
    ],
    references: [
      {
        title: "GitHub Engineering Blog - DDoS Incident Report",
        url: "https://githubengineering.com/ddos-incident-report/"
      },
      {
        title: "Cloudflare Analysis",
        url: "https://blog.cloudflare.com/memcrashed-major-amplification-attacks-from-port-11211/"
      }
    ]
  },
  {
    id: 2,
    title: "Dyn DNS DDoS Attack",
    date: "October 21, 2016",
    company: "Dyn (now Oracle DYN)",
    duration: "Several hours",
    impact: {
      financial: "Estimated $110 million in damages across affected companies",
      users: "Impacted millions of users across major platforms",
      downtime: "Two major outages lasting 2-3 hours each"
    },
    description: "A massive DDoS attack against Dyn's DNS infrastructure affected major services including Twitter, Netflix, Reddit, and CNN. The attack was orchestrated using the Mirai botnet, which consisted of IoT devices.",
    technique: "Mirai botnet utilizing compromised IoT devices",
    lessons: [
      "Vulnerability of DNS infrastructure",
      "Risks of unsecured IoT devices",
      "Need for redundant DNS providers",
      "Importance of IoT device security"
    ],
    references: [
      {
        title: "Dyn's Analysis of the Attack",
        url: "https://dyn.com/blog/dyn-analysis-summary-of-friday-october-21-attack/"
      },
      {
        title: "WIRED Coverage",
        url: "https://www.wired.com/2016/10/internet-outage-ddos-dns-dyn/"
      }
    ]
  },
  {
    id: 3,
    title: "AWS Shield's Record DDoS Attack",
    date: "February 2020",
    company: "Amazon Web Services",
    duration: "3 days",
    impact: {
      financial: "Protected customer from potential losses of $150+ million",
      users: "Attempted to impact millions of AWS customers",
      downtime: "No significant downtime reported"
    },
    description: "AWS Shield successfully defended against a 2.3 Tbps DDoS attack, the largest ever recorded at the time. The attack targeted an AWS customer using CLDAP reflection.",
    technique: "CLDAP (Connection-less Lightweight Directory Access Protocol) reflection attack",
    lessons: [
      "Effectiveness of cloud-based DDoS protection",
      "Importance of continuous monitoring",
      "Value of scalable defense infrastructure",
      "Need for protocol-specific mitigation strategies"
    ],
    references: [
      {
        title: "AWS Shield Threat Landscape Report",
        url: "https://aws.amazon.com/blogs/security/aws-shield-threat-landscape-report-now-available/"
      },
      {
        title: "ZDNet Analysis",
        url: "https://www.zdnet.com/article/aws-said-it-mitigated-a-2-3-tbps-ddos-attack-the-largest-ever/"
      }
    ]
  },
  {
    id: 4,
    title: "PlayStation Network Christmas Attack",
    date: "December 25, 2014",
    company: "Sony PlayStation Network",
    duration: "3 days",
    impact: {
      financial: "Estimated losses of $35 million+ in revenue",
      users: "Affected over 110 million PSN users",
      downtime: "72 hours of service disruption"
    },
    description: "The PlayStation Network was taken down during Christmas by a DDoS attack, preventing users from playing online games during the holiday season. The attack was claimed by the Lizard Squad hacker group.",
    technique: "Network-layer DDoS attack combined with application-layer attacks",
    lessons: [
      "Impact of timing on attack severity",
      "Need for holiday contingency planning",
      "Importance of customer communication during outages",
      "Value of gaming-specific DDoS protection"
    ],
    references: [
      {
        title: "Sony's Official Response",
        url: "https://blog.playstation.com/2014/12/27/psn-update-2/"
      },
      {
        title: "BBC News Coverage",
        url: "https://www.bbc.com/news/technology-30623166"
      }
    ]
  },
  {
    id: 5,
    title: "Cloudflare's HTTP/2 Zero-Day Attack",
    date: "June-August 2023",
    company: "Cloudflare",
    duration: "Multiple incidents over 2 months",
    impact: {
      financial: "Mitigation costs estimated at $20+ million",
      users: "Protected over 30 million websites",
      downtime: "Brief periods of increased latency"
    },
    description: "Cloudflare faced a series of sophisticated HTTP/2-based DDoS attacks, including a massive 71 million request-per-second attack exploiting a zero-day vulnerability.",
    technique: "HTTP/2 rapid reset attack exploiting protocol vulnerability",
    lessons: [
      "Importance of protocol-level security",
      "Need for rapid patch deployment",
      "Value of transparent incident communication",
      "Benefits of global threat detection"
    ],
    references: [
      {
        title: "Cloudflare's Technical Analysis",
        url: "https://blog.cloudflare.com/zero-day-rapid-reset-http2-vulnerability/"
      },
      {
        title: "HTTP/2 Rapid Reset Research",
        url: "https://blog.cloudflare.com/technical-breakdown-http2-rapid-reset-ddos-attack/"
      }
    ]
  }
];

const CaseStudiesPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">DDoS Attack Case Studies</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Learn from real-world DDoS attacks, their impact, and the lessons learned to better protect your infrastructure.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800 rounded-xl overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-semibold">{study.title}</h2>
                  <span className="text-sm text-gray-400">{study.date}</span>
                </div>
                
                <div className="mb-4">
                  <h3 className="text-blue-400 font-semibold mb-2">Impact</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <span className="text-red-400 mr-2">💰</span>
                      {study.impact.financial}
                    </li>
                    <li className="flex items-center">
                      <span className="text-blue-400 mr-2">👥</span>
                      {study.impact.users}
                    </li>
                    <li className="flex items-center">
                      <span className="text-yellow-400 mr-2">⏱️</span>
                      {study.impact.downtime}
                    </li>
                  </ul>
                </div>

                <p className="text-gray-300 mb-4 text-sm">
                  {study.description}
                </p>

                <div className="mb-4">
                  <h3 className="text-blue-400 font-semibold mb-2">Attack Technique</h3>
                  <p className="text-sm text-gray-300">{study.technique}</p>
                </div>

                <div className="mb-4">
                  <h3 className="text-blue-400 font-semibold mb-2">Key Lessons</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {study.lessons.map((lesson, i) => (
                      <li key={i} className="text-sm text-gray-300">{lesson}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-blue-400 font-semibold mb-2">Learn More</h3>
                  <div className="space-y-2">
                    {study.references.map((ref, i) => (
                      <Link
                        key={i}
                        href={ref.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-sm text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        {ref.title} →
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-400">
            Want to test your knowledge about DDoS attacks?
          </p>
          <Link href="/quiz">
            <span className="inline-block mt-4 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              Take the Quiz
            </span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default CaseStudiesPage;
