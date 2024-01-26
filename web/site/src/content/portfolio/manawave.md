---
title: "MANAWAVE"
description: "An open-source controllable, configurable, omnidirectional marquee, and design experiment."
role: "Designer / Engineer"
heroImage: ""
startDate: 2022-11-00
endDate: present
link:
  displayText: "Website"
  url: "https://manawave.art"
---

[MANAWAVE](https://manawave.art/) is a project where I show to myself what I'm capable as a creative and engineer. I had always wanted to solve some front-end problems like testing animations, designing something I wished to see on the web, optimizing that experience, and deploying them to production.

## Accomplishments

I effectively created a strict and structured DOM particle system that renders the DOM as interactive elements. It retains its semantic information, coded just like HTML, and performs well despite having 100s of elements rendered on screen.

I even designed a tailored web experience to showcase it artistically. I used a bunch of technical art techniques to composite a media experience on top of an accessible website. I'm particularly proud of utilizing compositing blending modes to optimize effects on videos, text, and images. I experimented with ways to deliver a creative experience with minimal costs to bandwidth and performance.

The result is MANAWAVE, a bespoke marquee that can be extended to animate anything inside its bounds infinitely and omnidirectionally.

The v0.12.0 is tested with webdriverIO on multiple browsers with 80% code coverage. This is my first time unit testing purely UI. Also, it's my first time piecing together code that needed to be architectured to scale it. I exploited many performance tricks to render 100s of elements effectively. This includes using:

- absolute positioning to reduce the cost of a reflow
- CSS transforms to use GPU compute off the main thread to "create" and "delete" elements
- ResizeObserver to calculate and update sizes without causing a reflow off the main thread
- DocumentFragments to batch DOM manipulations without layout thrashing when rendering new DOM elements
- a single, shared requestAnimationFrame for all marquees since multiple results in worse performance

## Challenges and next steps

I had to rewrite the project multiple times because the architecture sucked. I used design patterns without context and created spaghetti code. The first time, I used too much inheritance which caused the code to be extremely brittle to any changes. Even the latest iteration needs rewriting because I applied too strict of an abstraction; the code couldn't adapt well to changing requirements.

Also, my tests were extremely flaky and impure. WebdriverIO requires live browser installations which introduced bugs and unintended integrations into my tests. I plan on rewriting my tests in vitest with more mocking, isolated, and decoupled modules.

Trying to determine sources of layout thrash and performance was very difficult. I learnt how to use the performance profiler more deeply. I even ran into strange rendering artifacts that's out of my control because it's a browser level bug.

Also, optimizing and updating the DOM is very complicated. It made me understand why there exists frameworks and virtual DOMs which calculate and consolidate stateful data into one render transaction.

Lastly, the code isn't modular so it cannot be applied to frameworks, which many web developers are comfortable using.
