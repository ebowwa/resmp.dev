// src/app/(landing)/blog/page.tsx

import Container from "@/components/landing/sections/blog/sections/container";
import HeroPost from "@/components/landing/sections/blog/sections/hero-post";
import { Intro } from "@/components/landing/sections/blog/sections/intro";
import MoreStories from "@/components/landing/sections/blog/sections/more-stories";
import { getAllPosts } from "@/components/landing/sections/blog/lib/api";
import Head from 'next/head';
import Image from 'next/image';
import { CMS_NAME } from '@/lib/constants';

import styles from '@/components/landing/sections/blog/styles/Tags.module.css'; // Import the CSS module for tags

export default function Index() {
  const allPosts = getAllPosts();

  const heroPost = allPosts[0];

  const morePosts = allPosts.slice(1);

  return (
    <main>
      <Head>
        <title>{CMS_NAME}</title>
      </Head>
      <header
        style={{
          position: 'relative',
          height: '300px', // Adjust the height as needed
          overflow: 'hidden',
        }}
      >
        <Image
          src="/RESMP-DEV-5-23-2024 (1).png"
          alt="Header Image"
          fill
          style={{
            objectPosition: 'center',
          }}
        />
        {/* Add any content you want to display in the header */}
      </header>
      <Container>
        <Intro />
        {heroPost && (
          <HeroPost
            title={heroPost.title}
            coverImage={heroPost.coverImage}
            date={heroPost.date}
            tags={heroPost.tags} // Pass tags to HeroPost
            slug={heroPost.slug}
            excerpt={heroPost.excerpt}
            tagStyles={styles} // Pass the CSS module for tag styling
          />
        )}
        {morePosts.length > 0 && <MoreStories posts={morePosts} />}
      </Container>
    </main>
  );
}