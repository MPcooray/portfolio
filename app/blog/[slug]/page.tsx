import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { blogArticles } from '../articles'
import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

type Params = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return blogArticles.map((article) => ({ slug: article.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const article = blogArticles.find((item) => item.slug === slug)

  if (!article) {
    return {}
  }

  const url = `https://manulacooray.com/blog/${article.slug}`

  return {
    title: `${article.title} | Manula Cooray`,
    description: article.excerpt,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url,
      type: 'article',
    },
  }
}

export default async function BlogArticlePage({ params }: Params) {
  const { slug } = await params
  const article = blogArticles.find((item) => item.slug === slug)

  if (!article) {
    return null
  }

  return (
    <main className="section-shell min-h-screen px-4 pb-24 pt-32 sm:px-6 lg:px-8">
      <div className="relative mx-auto max-w-5xl">
        <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(340px,0.76fr)] lg:items-start">
          <div>
            <span className="eyebrow">{article.type}</span>
            <h1 className="section-title mt-6 max-w-[13ch] text-5xl font-semibold leading-[0.94] text-[color:var(--text)] sm:text-6xl">
              {article.title}
            </h1>
            <p className="mt-6 text-sm uppercase tracking-[0.22em] text-[color:var(--muted)]">
              {article.readTime}
            </p>
            <p className="mt-8 max-w-3xl text-lg leading-8 text-[color:var(--muted)]">
              {article.excerpt}
            </p>
          </div>

          {article.imageSrc ? (
            <Card className="overflow-hidden rounded-[2rem] border-[color:var(--border-strong)]">
              <CardContent className="p-4">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[1.4rem]">
                  <Image
                    src={article.imageSrc}
                    alt={article.imageAlt ?? article.title}
                    fill
                    className="object-cover object-center"
                  />
                </div>
              </CardContent>
            </Card>
          ) : null}
        </section>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <Card className="rounded-[2rem]">
            <CardContent className="p-8">
            <p className="text-sm uppercase tracking-[0.24em] text-[color:var(--accent)]">
              Summary
            </p>
            <p className="mt-5 text-base leading-8 text-[color:var(--text)]">{article.note}</p>
            <p className="mt-6 text-base leading-8 text-[color:var(--muted)]">
              This page gives the article a permanent home on your own domain, while the full
              original piece remains available on Medium.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href={article.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants())}
              >
                Read on Medium
              </a>
              <Link
                href="/blog"
                className={cn(buttonVariants({ variant: 'outline' }))}
              >
                Back to Journal
              </Link>
            </div>
            </CardContent>
          </Card>

          <Card className="rounded-[2rem]">
            <CardContent className="p-8">
            <p className="text-sm uppercase tracking-[0.24em] text-[color:var(--accent)]">
              Key takeaways
            </p>
            <div className="mt-6 space-y-4">
              {article.takeaways.map((takeaway) => (
                <Card
                  key={takeaway}
                  className="rounded-[1.4rem] border-white/10 bg-black/20 shadow-none"
                >
                  <CardContent className="px-5 py-4">
                  <p className="text-sm leading-7 text-[color:var(--text)]">{takeaway}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
