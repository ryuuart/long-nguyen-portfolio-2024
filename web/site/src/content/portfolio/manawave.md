---
title: "MANAWAVE"
description: "An open-source controllable, configurable, omnidirectional marquee, and design experiment."
role: "Designer / Engineer"
heroImage: "/portfolio/manawave/cover.webp"
startDate: 2022-11-00
endDate: present
link:
  displayText: "Website"
  url: "https://manawave.art"
---

[MANAWAVE](https://manawave.art) is my customized and open-source JavaScript marquee library coded entirely from scratch. It represents a vision of something I wished on the web: an omnidirectional (able to move in 360 degrees) marquee component. I treated it as both an engineering and creative challenge to demonstrate what 8 years of accumulated coding and creative experience produces.

## Technologies & Stack

- TypeScript
- HTML Custom Elements
- WebDriverIO
- Vite
- NX
- Astro
- Sandpack
- Github Actions

## Brief

I built MANAWAVE to realize a vision I had for the web. I built it with what I would love as a developer exploring a new library. I know the current developer landscape has so many layers of abstraction and complexities. I wanted to work with fundamental web foundations and idioms while enabling a wide breath of expression. This would mean developers would need to adjust or learn too many new concepts. They would use their existing knowledge and quickly create results.

I distilled 6 major principles to achieve this. It needs to be:

1. web-native
2. performant
3. accessible
4. familiar
5. customizable
6. isolated

Web-native and familiarity mean that MANAWAVE behaves similar to a native HTML element like `marquee`. It comes with the same expectations. You can style everything in it with regular HTML & CSS without any workaround. It works out-of-the-box with zero configuration. It's isolated from other web elements, and doesn't affect anything beyond itself. It can integrate with most web technologies with little friction, namely accessibility and event handling. And if you want to customize, MANAWAVE offers different escape hatches beyond the defaults.

There's another layer of complexity: the library must be developer-friendly. It must be documented clearly with step-by-step guides and examples. The code and file layout must be organized so that developers can easily parse through the codebase. Lastly, the code must be unit tested to provide a layer of guarantee and sanity.

## Approach

Developing this project took multiple stages of iterations and rewrites as explore the tradeoffs of software engineering decisions. It was my first time ever building something at this scale with multiple modules and concerns at different layers of abstraction and complexity.

## Iterations and rewrites

I followed through multiple attempts to figure out and discern problems as they arose. I was working blind and discovering how to fulfill these requirements along the way. Inexperience was my biggest time sink. A great deal of time was spent on basically research and prototyping. I would implement a key feature not realizing the next one wouldn't work well with my given architecture. I would go on to repeat this until I started to develop an intuition for dealing with interweaving concerns.

The biggest tech debt and architectural cost came from low cohesion and highly coupled code. Responsibilities and concerns for modules were often spread all over the place and I spent a lot of time refactoring. The worst part of my old code was overusing inheritance. Also, refactoring was a major time sink. I refactored before knowing what I was refactoring for. I applied design patterns to solve problems that didn't exist. The result was insane confusion. I wanted to spend time learning about design patterns and architectures which ironically made me too obsessed with them. I spent more time refactoring and fitting in unnecessary design patterns rather than solving actual problems relating to the codebase.

I decided several times to rewrite everything. It was a great lesson in software engineering practices. I got more productive each time applying principles like separation of concerns and composition over inheritance. I isolated my code to single-responsibility modules and created abstractions that composed each other. It wasn't perfect, but I was able to focus on solving problems in my codebase and more importantly, writing code that didn't break each other.

## Solving Animation

Some choices I made were based on guesses and assumptions for the underlying technology. For example, I could create a marquee easily with CSS that could animate in the 8 basic directions. I couldn't animate in any other direction though (like 24.578 degrees).

This is because I was relying on the WebAnimations API and CSS to handle looping animations. It turned out that this API relied on using keyframes and CSS animations under the hood. This made _continual and infinite_ animations very difficult. The truth is, I viewed the problem incorrectly. CSS animations and keyframes solve a subset of animation problems that begin and end. Another name for _continual and infinite_ animations are actually physics simulations. They run under a render loop that updates its animation state over time in the simulation. No matter what I did, the WebAnimations API wouldn't be able to support this use case. I chose the WebAnimations API because the animation and render logic would happen _off the main thread_ and leverage hardware acceleration using the GPU.

I supported animating in any situation possible by creating abstractions for a "physics" `Simulation`. I developed `step` function that would advance the `Simulation` state. The main drawback is now I have to handle the complexities of the browser render pipeline and main thread.

## Solving Performance

Browsers are limited by their reliance on a single main thread to calculate and render the state of the DOM. Repeated updates to the DOM is a major performance risk caused by layout thrashing. Marquees have the potential to update 100s of DOM elements on any given page. I realized optimizing the DOM and minimizing layout thrashing would be key for MANAWAVE.

To wield absolute control for animations on the web, including animation or physics loops, I use `requestAnimationFrame`. It holds a serious risk of overloading the browser (being called 60 times per second). This made MANAWAVE a ticking time bomb. There were several cases that would consistently crash the browser.

I spent many iterations and rewrites attempting to discern where performance was failing. I relied deeply on the browser performance profiler. It indicated that the browser paint and render operations would go on infinitely. I knew that anything relating the browser's render pipeline was a bottleneck. I had to minimize any opportunities where the browser's render pipeline would affect performance and rendering.

For MANAWAVE's latest iteration, I exploited a series of performance optimizations.

The architecture of the library would use a game development principle: separate render and system logic. I treat system logic calculations similar to a physics simulation update in game development. This would create a hard separation of concerns prevent system logic from unnecessarily triggering DOM updates. It simplified and isolated performance pain points when it came to optimizing them.

Then, I applied the following after a lot of experimentation and back-and-forth debugging:

- `absolute` positioning to reduce the cost of a reflow
- CSS transforms to use GPU compute off the main thread to "create" and "delete" elements
- `ResizeObserver` to calculate and update sizes without causing a reflow off the main thread
- `DocumentFragment` to batch DOM manipulations without layout thrashing when rendering new DOM elements
- a single, shared `requestAnimationFrame` for all marquees since multiple results in worse performance
- minimizing the amount DOM `Element` cloned

Essentially, getting logic and state to render on the browser means computing it separately then making optimized render transactions on the browser. The points I listed solve most performance bottlenecks by moving any blocking operations off the main thread. When I need to interact with the main thread, it's concentrated and optimized for that single transaction.

This resulted in a major performance boost from 100s of elements breaking or stuttering any website to near instantaneous animation and renders (<5 ms to calculate, layout, paint styles).

## Solving testing

On top of MANAWAVE as a library, I had to make sure that it's a developer-friendly project. After all, I'm open sourcing this project. I believe open source is a commitment and responsibility if other developers derive from MANAWAVE. Documented and readable open source is a mark of care and craftsmanship. The experience has to be more than good enough.

I tackle unit testing front-end code for the first time. I struggled determining how to even get started. Usually, unit testing frameworks could test raw JavaScript code in a separate runtime context. It's awkward for browsers: the `window` and `document` object are usually not available outside of browsers, but are needed to test the behavior of the DOM. There are multiple approaches that work depending on how testing is viewed on the browser.

- testing on a simulated browser engine (Playwright)
- testing on the browser itself, but need manual configuration with bundler (mocha, Jasmine)
- testing UIs are in the realm of e2e tests (Cypress, Selenium, webdriver)
- testing in Node.js context with mocked browser (Jest + jsdom or happy-dom)

To me, I believed that it's pointless to test on simulated environments when I could test on the browser itself. Browsers are all implemented differently by engine, and testing with that assumption would catch bugs early. It turns out that webdriverIO has a feature for browser testing on the browser mixed with e2e features. I could test across Safari, Firefox, and Chrome with one command and configuration file. It was compatible with my codebase and bundler and required very little configuration to test. I tested my code across all major browsers simultatenously. This provided me safety and sanity as I was developing new features for MANAWAVE.

Testing with webdriverIO wasn't a perfect approach, however. I realized that trying to match browser environments and account the for tests made the unit tests more integrated and flaky if anything. I realized that testing things within control would be better, and browser contexts are usually outside of that. I'm actually hoping to migrate towards testing on a mocked browser for more stability and isolation.

## Solving the demo website

Building websites is my forte. I used Astro to build up components and implement the website as any other static site generator. Because I had absolute freedom with the websites, I decided to use this opportunity to push boundaries and experiment.

I used CSS grid to enforce a modular grid across the [demo site](https://manawave.art). I made an assumption that it would model the same as a graphics design modular grid. In graphics design, all graphic elements share the same modular grid. In current CSS, all DOM elements follow the grid of its parent node. This is is fundamentally different and couldn't be applied trivially. A child node couldn't be aligned to the grid of an ancestor or sibling node; it isn't even aware of the external grids. I had to simulate the proposed subgrid feature by imitating and replicating parent grids that the children nodes would be aware of. This is a very flaky workaround. The subgrid proposal is the real solution to this problem.

While learning Blender to make a light simulation, I learned more deeply about compositing blend modes. I used this opportunistically with CSS to determine if I could make experimental effects and optimizations. I used blend modes with video to create a novel glowing text effect on the front page to wow my audience. I'm proud that it uses a relatively cheap webm video and overlay blend mode text. It's something I would expect in more complex webgl or canvas solutions, but I used pure HTML and CSS. I'm even more proud of using blend modes to apply colors to a single animated image. Instead of having 3 images for different colors, I used blend modes to apply color to only one. This saves a significant amount of bandwidth since the images are animated.

## Solving the documentation website

I used the Starlight template for Astro to focus on writing documentation content. Writing documentation and step-by-step guides turned out to be way harder than I ever imagined. Trying to communicate my features comprehensively turned out to be exhausting. It's like writing a book unknowingly; it's a serious investment. I was able to get close, but I wish wrote documentation alongside developing features for my code. Not only does it clarify what my code actually does, it can identify pain points in developer experience. I was exhausted because I spent so much effort recalling my choices, decisions, and intuition. In the future, I'm hoping to automate reference documentation from code comments. Then, I want to rely on a better process to document code while developing features.

I wrote my documentation inspired by Astro's documentation. It focused less on developers having to dig and form connections themselves. Instead, they teach and guide by example. They additionally offer a backdoor for reference for more advanced users. It's an approach that's accomodating for all levels of experience. By using step-by-step guides and leading users problem-by-problem and example-by-example, it gets users up to speed for the features they need. I copy this exact pattern of slowing easing users into MANAWAVE by example and guide.

One experiment I tried was by implementing a customized playground for developers. I used Sandpack, a developer playground that'll allow users to code and see their results live from the browser. It was worth it because not only can I explain the code in the documentation guides, it's very easy to _show_ users rather than spend ages _telling_.

## Reflection

MANAWAVE is truly my own project and endeavor. I couldn't Google "how to make MANAWAVE". I realized that discovering how to make things work my own way was thrilling. It comes from my heart, imagination, and problem-solving — with my own two hands. MANAWAVE took way longer than I ever imagined. Even though I have released it to the public, and you can use it on a website now, I consider MANAWAVE incomplete. I'm not sure if any open-source project is ever truly done. I want to make it even better because I obssessed with what it could be.
