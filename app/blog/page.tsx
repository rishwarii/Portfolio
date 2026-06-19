import { Card } from "@/components/Card";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { siteContent } from "@/lib/siteContent";

export default function BlogPage() {
  const posts = siteContent.blog.posts.filter(
    (post) => post.title.trim().length > 0 || post.summary.trim().length > 0
  );

  return (
    <>
      <Section reveal={false} spacing="compact">
        <SectionHeading
          eyebrow="Blog"
          title={siteContent.blog.title}
          description={siteContent.blog.description}
        />
      </Section>

      <Section className="py-8 pb-16">
        <div className="mx-auto max-w-4xl space-y-4">
          {posts.map((post) => (
            <Card key={post.slug} variant="default">
              {post.date.trim().length > 0 ? (
                <p className="text-[0.68rem] uppercase tracking-[0.14em] text-mutedFg">
                  {post.date}
                </p>
              ) : null}
              <h2 className="mt-2 text-2xl text-fg">{post.title}</h2>
              <p className="mt-3 text-sm text-mutedFg sm:text-base">{post.summary}</p>
            </Card>
          ))}
          {posts.length === 0 ? (
            <p className="text-sm text-mutedFg">Posts will be added here.</p>
          ) : null}
        </div>
      </Section>
    </>
  );
}
