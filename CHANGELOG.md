# Change Log

All notable changes to this project will be documented in this file.

# [1.4.3](2018-09-20)

**Changes**

- Set single article module portion of embed URL to an environmental variable

# [1.4.2](2018-09-12)

**Bug Fixes**

- Languages will only be displayed in the video language dropdown if a source exists in the language unit

# [1.4.1](2018-09-10)

**Bug Fixes**

- Fixed difficulty selecting icon links in popups

# [1.4.0](2018-09-08)

**Features**

- Enhanced footer to inlude additional links and information
- Added embed code generation to enable sharing off posts
- Updated direct link for posts to point to original source

**Bug Fixes**

- Fixed tabbed underline on video popups

# [1.3.0](2018-08-08)

**Features**

- Embed code to display to embed both youtube and vimeo videos now active
- Share windows now are either a popup for desktop or a new page for mobile

**Bug Fixes**

- Caption toggle now operates correctly and loads correct video based on caption selection
- Fixed direct link UI display

# [1.2.0](2018-07-18)

**Features**

- Added Vimeo support
- Provided a Vimeo/CloudFlare fallback option when YouTube is not available
- Provided a sharable, direct link to the video page
- Updated UI to provide "web" and "broadcast" video quality display
- Updated various UI styles

**Bug Fixes**

- Sources dropdown now sorted alphabetically

# [1.1.0](2018-06-15)

**Features**

- Added Contact Us page
- Added Browse all [type] link above each recents section on Landing page
- Updated help text for video downloads
- Source action creator now accepts an array of owners and not a string as it's search key
- Created owners mappings in source action to (1) support inconsistent owner names and (2) assign a custom name

# [1.0.0](2018-05-29)

**Features**

- Global search bar
- Feedback form
- About, Help, Privacy Policy pages
- Filter search by Date, Forat, Source, Language and Category
- Display search results in either gallery or list formats
- Closable filter selections bubbles
- Contextual number of results
- Video and Article content types search
- Modal window that houses selected item
- Video modal:
  - YouTube or CloudFlare video player
  - Language dropdown to view video in other languages
  - Download icon opens popup to download selected video in various sizes, SRT, Transcript and Help
  - Video meta data
- Article modal:
  - Source content
  - Source Logo
  - Link to original source
  - Article meta data
- Result pagination
