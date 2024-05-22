'use client';

import React from 'react';
import Head from 'next/head';

const HomePage: React.FC = () => {
  return (
    <div className="page">
      <Head>
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-W770C6CJ1J"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-W770C6CJ1J');
            `,
          }}
        />
        {/* Google Analytics */}

        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-touch-fullscreen" content="yes" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="robots" content="noindex, noarchive" />
        <meta name="format-detection" content="telephone=no" />

        {/* FB Card data */}
        <meta property="og:title" content="Sakana AI" />
        <meta property="og:type" content="article" />
        <meta property="og:description" content="We are creating a new kind of foundation model based on nature-inspired intelligence." />
        <meta property="og:image" content="https://sakana.ai/assets/home/sakana_rect.png" />
        <meta property="og:url" content="https://sakana.ai/" />
        {/* Twitter Card data */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@SakanaAILabs" />
        <meta name="twitter:title" content="Sakana AI" />
        <meta name="twitter:description" content="We are building a world class AI research lab in Tokyo, Japan. We are creating a new kind of foundation model based on nature-inspired intelligence." />
        <meta name="twitter:image" content="https://sakana.ai/assets/home/sakana_rect.png" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@200&display=swap" rel="stylesheet" />

        <title>Sakana AI</title>

        <style>{`
          html,
          body {
            overflow-x: hidden;
            overflow-y: hidden;
            overflow: hidden;
            height: 100%;
            width: 100%;
            font-family: 'Poppins', sans-serif;
            font-weight: 200;
            font-style: normal;
            color: #1e1e1e;
          }

          body {
            position: relative;
          }

          @font-face {
            font-family: 'Poppins', sans-serif;
            font-weight: 200;
            font-style: normal;
            font-display: swap;
          }

          .page {
            width: 850px;
            margin: 0 auto;
            padding: 20px 20px 0 20px;
            overflow: hidden;
          }

          .demo {
            text-align: center;
          }

          h1 {
            position: relative;
            font-size: 32px;
            color: #fff;
            padding: 10px 20px;
            margin: 0 -20px 12px -20px;
          }

          .font-container {
            overflow-x: auto;
            overflow-y: hidden;
            margin-bottom: 40px;
            line-height: 1.3;
            padding-bottom: 5px;
          }

          p {
            font-size: 28px;
          }

          a {
            color: #68f;
            text-decoration: none;
          }

          code {
            font-family: Monaco, Menlo, Consolas, "Courier New", monospace;
          }

          @media (max-width: 959px) {
            .page {
              width: auto;
              margin: 0;
            }
          }
        `}</style>
      </Head>

      <div className="demo">
        <h1>
          <br />
          <img src="/sakana.svg" width="43.5%" alt="Sakana AI" />
        </h1>
        <div className="font-container">
          <p>
            <br />
          </p>
          <p style={{ fontSize: '28px' }}>We are building a world class AI research lab in Tokyo, Japan.</p>
          <p>
            <br />
          </p>
          <p style={{ fontSize: '28px' }}>We are creating a new kind of foundation model based on nature-inspired intelligence.</p>
          <p>
            <br />
          </p>
          <p style={{ fontSize: '28px' }}>
            For more information, please visit our <a href="/blog/">blog</a> and <a href="/careers/">careers</a> page, or contact <code>info@sakana.ai</code>
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;