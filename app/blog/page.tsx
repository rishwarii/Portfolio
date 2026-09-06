import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { siteContent } from "@/lib/siteContent";

export default function BlogPage() {
  const posts = siteContent.blog.posts.filter(
    (post) => post.title.trim().length > 0 || post.summary.trim().length > 0
  );

  return (
    <>
      <Section reveal={false} spacing="compact" containerSize="reading">
        <SectionHeading
          eyebrow="Blog"
          title={siteContent.blog.title}
          description={siteContent.blog.description}
        />
      </Section>

      <Section className="py-8 pb-16" containerSize="reading">
        <div className="space-y-0">
          {posts.map((post, index) => (
            <article
              key={post.slug}
              className={
                index === posts.length - 1
                  ? "pt-8 first:pt-0"
                  : "border-b border-border py-8 first:pt-0"
              }
            >
              {post.date.trim().length > 0 ? (
                <p className="font-editorial text-sm italic text-mutedFg">
                  {post.date}
                </p>
              ) : null}
              <h2 className="mt-2 font-novel text-2xl font-normal tracking-[-0.02em] text-fg">
                {post.title}
              </h2>
              <p className="mt-3 font-editorial text-base leading-relaxed text-mutedFg">
                {post.summary}
              </p>
            </article>
          ))}
          {posts.length === 0 ? (
            <p className="font-editorial text-base text-mutedFg">
              Posts will be added here.
            </p>
          ) : null}
        </div>
      </Section>
    </>
  );
}
