---
title: 'From Coding Paradise to Code Review Hell'
date: '2026-11-22'
description: Explore how AI coding agents are transforming software engineering by accelerating code generation while creating new bottlenecks in code review.
tags: ['ai', 'code-review', 'software-engineering']
published: true
---

Our role as software engineers is rapidly mutating. We are being thrown off from the green pastures of developing software to a deep rocky pit of code review.

I like to think that the craft of software development was always about translating ambiguous requirements into deterministic solutions using code and infrastructure as the basic tools on our belt.

What started as a funny autocomplete by AI just two years ago, rapidly evolved to agent swarms that directly pull the requirements from the internal project management software, draft a plan, write the code, create the tests, and submit a PR.

The speed is tempting. Much of the generated code looks plausible at first glance, but the mistakes that slip through can affect production and service quality.

Lately, it seems that thinking comes in short supply and even reading in depth what the agents are understanding, planning and testing seems a titanic venture. 

So now the bottleneck moved from the developer to the code review, receiving tons of pull requests per week and having to do the whole process again:

* understand the requirement
* figure out the intent behind what my team tried to do
* review the code quality
* surf through all the testing results submitted to validate the coverage
* crossmatch all of this with the business logic and make sure nothing breaks the current contracts

I battle constantly against the time invested on this process against doing the whole thing from scratch on my own, because it became slower to prove what another colleague with AI did, than just building it right from scratch.

Of course that I also use agents to augment my capacity on these steps, but when agents write the diff, code review stops being where quality gets decided: if no one writes down a change's cross-component contracts before the agent starts, neither a human nor an AI reviewer can catch what breaks, because that bug isn't in the diff.

So the challenge gets twice as hard, because it's not only reviewing what's arrived on the PR, it's tracing the whole chain of thought and building enough confidence that shipping this will achieve what's intended.

And it does not stop there, the goal is to fully automate this whole cycle, removing the humans from the loop, having agents reviewing PRs and rejecting or merging automatically, to achieve competitive advantages against the market.

The challenge is enormous, and will require some deep changes in our teams, engineering culture, and codebases. We need to make business rules and cross-component contracts explicit, accessible, and verifiable by both humans and AI agents. Our codebases should evolve to support this, with clearer architectural boundaries, better-defined interfaces, and programming languages and practices that reduce ambiguity, such as strong typing.

An agent can explain every line it wrote. Can it tell you which service might break when that line changes?
