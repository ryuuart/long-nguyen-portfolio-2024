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

I supported animating in any situation possible by creating abstractions for a `Simulation`. I developed `step` function that would advance the `Simulation` state. The main drawback is now I have to handle the complexities of the browser render pipeline and main thread.

## Solving Performance

Browsers are limited by their reliance on a single main thread to calculate and render the state of the DOM. Repeated updates to the DOM is a major performance risk caused by layout thrashing. Marquees have the potential to update 100s of DOM elements on any given page. I realized optimizing the DOM and minimizing layout thrashing would be key for MANAWAVE.

To wield absolute control for animations on the web, including animation or physics loops, I use `requestAnimationFrame`. It holds a serious risk of overloading the browser (being called 60 times per second). This made MANAWAVE a ticking time bomb. There were several cases that would consistently crash the browser.

I spent many iterations and rewrites attempting to discern where performance was failing. I relied deeply on the browser performance profiler. It indicated that the browser paint and render operations would go on infinitely. I knew that anything relating the browser's render pipeline was a bottleneck. I had to minimize any opportunities where the browser's render pipeline would affect performance and rendering.

For MANAWAVE's latest iteration, I exploited a series of performance optimizations.

First, the architecture of the library would use a game development principle: separate render and system logic. Render logic refers to the code that animates and paints the marquee elements on the screen. System logic refers to any calculations required for the state of each marquee. For example, calculating the position of each marquee item is under system logic. I treat system logic calculations similar to a physics simulation update in game development. This would create a hard separation of concerns prevent system logic from unnecessarily triggering DOM updates. It simplified and isolated performance pain points when it came to optimizing them.

Second, I applied the following after a lot of experimentation and back-and-forth debugging:

- `absolute` positioning to reduce the cost of a reflow
- CSS transforms to use GPU compute off the main thread to "create" and "delete" elements
- `ResizeObserver` to calculate and update sizes without causing a reflow off the main thread
- `DocumentFragment` to batch DOM manipulations without layout thrashing when rendering new DOM elements
- a single, shared `requestAnimationFrame` for all marquees since multiple results in worse performance
- minimizing the amount DOM `Element` cloned

Each of these points could include an entire article for each. The browser is complex. A lot of web frameworks actually optimize on each of these points because they follow a similar principle of managing state and rendering it (React). Essentially, getting logic and state to render on the browser means computing it separately then making optimized render transactions on the browser. The points I listed solve most performance bottlenecks by moving any blocking operations off the main thread. When I need to interact with the main thread, it's concentrated and optimized for that single transaction.

This resulted in a major performance boost from 100s of elements breaking or stuttering any website to near instantaneous animation and renders (<5 ms to calculate, layout, paint styles).
