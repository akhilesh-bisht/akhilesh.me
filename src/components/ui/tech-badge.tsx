'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { FaReact, FaNodeJs, FaVuejs, FaRust, FaPython, FaAws, FaGithub, FaDiscord, FaNpm, FaEthereum } from 'react-icons/fa'
import {
    SiTypescript,
    SiJavascript,
    SiNextdotjs,
    SiTailwindcss,
    SiGraphql,
    SiSolidity,
    SiPostgresql,
    SiPrisma,
    SiMongodb,
    SiRedis,
    SiVercel,
    SiFramer
} from 'react-icons/si'
import { TbBrandOpenai } from 'react-icons/tb'
import { HiSparkles } from 'react-icons/hi2'

export type TechType =
    | 'typescript' | 'javascript' | 'react' | 'next' | 'node' | 'vue' | 'rust'
    | 'python' | 'aws' | 'graphql' | 'solidity' | 'web3' | 'ai' | 'llm'
    | 'tailwind' | 'framer' | 'vercel' | 'postgres' | 'prisma' | 'mongodb' | 'redis'
    | 'discord' | 'npm' | 'github' | 'ethereum' | 'defi'

const techIcons: Record<TechType, React.ReactNode> = {
    typescript: <SiTypescript />,
    javascript: <SiJavascript />,
    react: <FaReact />,
    next: <SiNextdotjs />,
    node: <FaNodeJs />,
    vue: <FaVuejs />,
    rust: <FaRust />,
    python: <FaPython />,
    aws: <FaAws />,
    graphql: <SiGraphql />,
    solidity: <SiSolidity />,
    web3: <FaEthereum />,
    ai: <HiSparkles />,
    llm: <TbBrandOpenai />,
    tailwind: <SiTailwindcss />,
    framer: <SiFramer />,
    vercel: <SiVercel />,
    postgres: <SiPostgresql />,
    prisma: <SiPrisma />,
    mongodb: <SiMongodb />,
    redis: <SiRedis />,
    discord: <FaDiscord />,
    npm: <FaNpm />,
    github: <FaGithub />,
    ethereum: <FaEthereum />,
    defi: <FaEthereum />
}

const techNames: Record<TechType, string> = {
    typescript: 'TypeScript',
    javascript: 'JavaScript',
    react: 'React',
    next: 'Next.js',
    node: 'Node.js',
    vue: 'Vue',
    rust: 'Rust',
    python: 'Python',
    aws: 'AWS',
    graphql: 'GraphQL',
    solidity: 'Solidity',
    web3: 'Web3',
    ai: 'AI',
    llm: 'LLM',
    tailwind: 'Tailwind',
    framer: 'Framer Motion',
    vercel: 'Vercel',
    postgres: 'PostgreSQL',
    prisma: 'Prisma',
    mongodb: 'MongoDB',
    redis: 'Redis',
    discord: 'Discord',
    npm: 'NPM',
    github: 'GitHub',
    ethereum: 'Ethereum',
    defi: 'DeFi'
}

// Group-hover colors (for parent card hover activation)
const techGroupHoverColors: Record<TechType, string> = {
    typescript: 'group-hover:text-blue-500',
    javascript: 'group-hover:text-yellow-500',
    react: 'group-hover:text-cyan-400',
    next: 'group-hover:text-foreground',
    node: 'group-hover:text-green-500',
    vue: 'group-hover:text-emerald-500',
    rust: 'group-hover:text-orange-500',
    python: 'group-hover:text-blue-400',
    aws: 'group-hover:text-amber-500',
    graphql: 'group-hover:text-pink-500',
    solidity: 'group-hover:text-gray-500',
    web3: 'group-hover:text-purple-500',
    ai: 'group-hover:text-violet-500',
    llm: 'group-hover:text-emerald-400',
    tailwind: 'group-hover:text-cyan-400',
    framer: 'group-hover:text-pink-500',
    vercel: 'group-hover:text-foreground',
    postgres: 'group-hover:text-blue-500',
    prisma: 'group-hover:text-teal-500',
    mongodb: 'group-hover:text-green-500',
    redis: 'group-hover:text-red-500',
    discord: 'group-hover:text-indigo-500',
    npm: 'group-hover:text-red-500',
    github: 'group-hover:text-foreground',
    ethereum: 'group-hover:text-purple-500',
    defi: 'group-hover:text-purple-500'
}

interface TechBadgeProps {
    tech: TechType
    showName?: boolean
    className?: string
    colorOnGroupHover?: boolean
}

export function TechBadge({ tech, showName = false, className, colorOnGroupHover = false }: TechBadgeProps) {
    return (
        <span
            className={cn(
                'inline-flex items-center gap-1.5 text-muted-foreground transition-colors duration-200',
                colorOnGroupHover ? techGroupHoverColors[tech] : '',
                showName && 'px-2 py-1 rounded-md bg-muted/50 text-xs font-medium',
                className
            )}
            title={techNames[tech]}
        >
            <span className="text-sm">{techIcons[tech]}</span>
            {showName && <span>{techNames[tech]}</span>}
        </span>
    )
}

interface TechStackProps {
    technologies: string[]
    showNames?: boolean
    className?: string
    colorOnGroupHover?: boolean
}

export function TechStack({ technologies, showNames = false, className, colorOnGroupHover = false }: TechStackProps) {
    return (
        <div className={cn('flex flex-wrap gap-2', className)}>
            {technologies.map((tech) => (
                <TechBadge key={tech} tech={tech as TechType} showName={showNames} colorOnGroupHover={colorOnGroupHover} />
            ))}
        </div>
    )
}
