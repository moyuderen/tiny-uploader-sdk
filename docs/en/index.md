---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: '@tinyuploader/sdk'
  text: ''
  tagline: 'A simple uploader'
  actions:
    - theme: brand
      text: 'Quick Start'
      link: /en/quick-start

features:
  - title: Chunked Upload
    details: Support to upload large file by chunk, and support custom chunk size

  - title: Auto Retry
    details: If some chunk upload failed, we will retry it automatically, and you can config retry times and retry interval

  - title: Manual Retry
    details: If auto retry failed, you can trigger retry manually

  - title: Concurrent Request
    details: Support config concurrent request count

  - title: Custom Request
    details: Support custom request, such as custom headers, custom query params, enable hash calculation, etc.

  - title: Pre-check
    details: Support to pre-check file status, such as uploaded, partial uploaded, not uploaded, seconds upload etc.
---
