---
title: "AI: It's About Knowing What to Do"
date: '2026-11-25'
description: As agents speed up engineering, the new bottleneck is knowing precisely what to do, and eliminating ambiguity in requests before anyone builds them.
tags: ['ai', 'product', 'software-engineering']
published: true
---

We all use agents to write code nowadays. Let's face it, not doing it should be considered negligent.

As technology rapidly evolves, we are delegating more and more steps of the engineering workflow to agents and tools.

There is a dual motivation: increasing speed and productivity, YES, but perhaps also a degree of "laziness" — avoiding the time and mental effort required to solve problems ourselves and focusing instead on crafting the right prompt.

The new bottleneck is knowing precisely what to do. Maybe it always was, but as speed increases, this becomes the cornerstone of a successful outcome.

In my case, I'm reviewing the feature, bug or configuration requests that arrive daily to the Product team, and I judge whether they are properly defined and ready to move forward or need further refinement.

The single goal is to eliminate ambiguity. I'm translating gibberish and wishful thinking into an unambiguous, actionable specification that my team, plus dozens of agents, can execute and test.

At SpaceX, engineers have also plugged agents into this step of the process. I'm working towards the same. I started by breaking down the fundamental principles that make this gatekeeper role a successful one for us:

* Is there enough information to justify the request and execute it? (Emails, attachments, documentation, charts, logs, evidence...)
* Is the underlying business process of our customer that justifies this request properly stated? (A bad example would be "They need a new screen to do X." A good example would be "Our user needs to pack goods into boxes and, upon sealing them, should be able to generate a document that contains Y.")
* Will this break an existing information flow, and has the author realised that and provided a rationale for why this change is necessary? I don't expect our customers to know how other users deal with our platform, but I certainly expect my team to consider, format and filter this in advance.
* Has there been any analysis of the resources required to address the request? Does it require the intervention of the commercial department?
* How can we measure whether the proposed solution is successful?

Today was the first day that an AI agent on my team started helping me do this. Together with other agents that have access to the codebase, some documentation and skills, as soon as I receive a new request at my doorstep, an agent spawns a swarm of virtual colleagues that tries to come up with a verdict: Yes, it meets the standards, or No, "Ask the author all these questions before moving forward."

At the end of the day, it's not about smarter AI models; it's about thinking and some good old engineering.
